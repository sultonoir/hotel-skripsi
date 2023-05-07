import prisma from "@/lib/prisma";
import getCurrentUser from "./getCurrentUser";

export default async function getTrips() {
  try {
    const currentUser = await getCurrentUser();
    const trips = await prisma.reservation.findMany({
      where: {
        userId: currentUser?.id,
      },
      include: {
        listing: {
          include: {
            imageSrc: true,
            fasilitas: true,
          },
        },
        admin: true,
        user: true,
      },
    });
    const safeTrips = trips.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeTrips;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
