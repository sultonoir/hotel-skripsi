import prisma from "@/lib/prisma";

export default async function getFaviriteListings() {
  try {
    const favorites = await prisma.favorite.findMany({});
    const [safeFavorites] = favorites.map((favorite) => ({
      id: favorite.id,
      userId: favorite.userId,
      listingId: favorite.listingId,
    }));

    return safeFavorites;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
