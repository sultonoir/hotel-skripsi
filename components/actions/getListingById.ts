import prisma from "@/lib/prisma";

interface Iparams {
  listingId?: string;
}

export default async function getLIstingById(params: Iparams) {
  try {
    const { listingId } = params;
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        admin: true,
        imageSrc: true,
        fasilitas: true,
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      admin: listing.admin
        ? {
            ...listing.admin,
            createdAt: listing.admin.createdAt.toISOString(),
            updatedAt: listing.admin.updatedAt.toISOString(),
            emailVerified: listing.admin.emailVerified?.toISOString() || null,
          }
        : null,
    };
  } catch (error: any) {
    throw new error(error);
  }
}
