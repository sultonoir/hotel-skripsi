"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import { SafeReservation, SafeUser, safeAdmin } from "@/types";

interface ReservationsClientProps {
  currentAdmin: safeAdmin | null;
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  currentAdmin,
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Shometing went wrong");
          console.error(error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Booking on your properties"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            actionId={reservation.id}
            reservation={reservation}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            name={reservation.user?.name}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;