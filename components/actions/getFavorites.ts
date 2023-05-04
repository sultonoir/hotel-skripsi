import prisma from "@/lib/prisma";
import getCurrentUser from "./getCurrentUser";

export default async function getFavorites() {
  try {
    const currentUser = await getCurrentUser();

    const favorite = currentUser?.favorite?.[0]
      ? {
          id: currentUser.favorite[0].id,
          userId: currentUser.favorite[0].userId,
          listingId: currentUser.favorite[0].listingId,
        }
      : {};

    const favorites = await prisma.listing.findMany({
      where: {
        id: favorite.listingId,
      },
      include: {
        imageSrc: true,
        fasilitas: true,
        favorite: true,
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
