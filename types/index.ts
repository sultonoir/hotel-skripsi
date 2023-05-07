import {
  Listing,
  Reservation,
  User,
  Admin,
  Fasilitas,
  Notification,
} from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
  imageSrc: SafeImage[];
  fasilitas: Fasilitas[];
};

export type SafeListingNotif = Omit<Listing, "createdAt"> & {
  createdAt: string;
  imageSrc: SafeImage[];
  fasilitas: Fasilitas[];
  user: Pick<User, "id" | "name" | "image"> | null;
};

export type SafeNotification = Pick<Notification, "id"> & {
  listing: SafeListingNotif;
};

export type SafeAdminNotif = Omit<
  Admin,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  notification: SafeNotification[] | null;
};

export type SafeImage = {
  id: string;
  img: string;
  listingId: string;
};

export type SafeFavorite = {
  id: string;
  userId: string;
  listingId: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
  user: User | null;
  admin: Admin | null;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  favorite: SafeFavorite[];
};

export type safeAdmin = Omit<
  Admin,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

export const adminNav = [
  {
    title: "Home",
    href: "/admin",
  },
  {
    title: "Reservation",
    href: "/admin/Reservation",
  },
];

export const NavItem = [
  {
    title: "Home",
    href: "/Home",
  },
  {
    title: "Admin",
    href: "/admin",
  },
  {
    title: "Reservations",
    href: "/reservations",
  },
];
