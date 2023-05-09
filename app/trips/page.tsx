import EmptyState from "@/components/shared/EmptyState";
import getCurrentUser from "@/components/actions/getCurrentUser";
import React from "react";
import TripsClient from "./TripsClient";
import getReservations from "@/components/actions/getReservations";
import getTrips from "@/components/actions/getTrips";

const page = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getTrips();
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="Tidak ada daftar booking"
        subtitle="Tolong boking terlebih dahulu"
      />
    );
  }
  return (
    <TripsClient
      currentUser={currentUser}
      reservations={reservations}
    />
  );
};

export default page;
