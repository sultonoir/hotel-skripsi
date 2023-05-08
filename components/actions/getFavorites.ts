import prisma from "@/lib/prisma";
import getCurrentUser from "./getCurrentUser";

export default async function getFavorites() {
  try {
    const currentUser = await getCurrentUser();

    const favorites = await prisma.favorite.findMany({
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
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      id: favorite.id,
      userId: favorite.userId,
      listingId: favorite.listingId,
      listing: {
        ...favorite.listing,
        createdAt: favorite.listing.createdAt.toISOString(),
      },
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
