"use client";
import { categories } from "@/components/Category";
import Container from "@/components/Container";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import {
  SafeImage,
  SafeListing,
  SafeReservation,
  SafeUser,
  safeAdmin,
} from "@/types";
import React, { useMemo } from "react";

interface ListingClientProps {
  listing: SafeListing;
  currentUser: SafeUser | null;
  reservations?: SafeReservation;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations,
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, []);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.category}
            imageSrc={listing.imageSrc}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              rooms={listing.rooms}
              category={category}
              guestCount={listing.guestCount}
              kingSize={listing.kingSize}
              fullSize={listing.fullSize}
              title={listing.category}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
