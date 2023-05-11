import prisma from "@/lib/prisma";
import getAdmin from "./getAdmin";

export default async function getNotification() {
  try {
    const currentAdmin = await getAdmin();

    if (!currentAdmin) {
      return null;
    }

    await prisma.admin.update({
      where: {
        id: currentAdmin.id,
      },
      data: {
        hasNotification: false,
      },
    });

    const notifications = await prisma.notification.findMany({
      where: {
        adminId: currentAdmin.id,
      },
      include: {
        listing: {
          include: {
            imageSrc: true,
            fasilitas: true,
            user: true,
          },
        },
      },
    });

    const SafeNotification = notifications.map((notif) => ({
      ...notif,
      createdAt: notif.createdAt.toISOString(),
      listing: {
        ...notif.listing,
        createdAt: notif.listing.createdAt.toISOString(),
      },
    }));

    return SafeNotification;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
