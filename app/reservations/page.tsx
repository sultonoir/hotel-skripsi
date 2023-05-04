import EmptyState from "@/components/EmptyState";
import getAdmin from "@/components/actions/getAdmin";
import getReservations from "@/components/actions/getReservations";
import ReservationsClient from "./ReservationsClient";
import getCurrentUser from "@/components/actions/getCurrentUser";

const ReservationsPage = async () => {
  const currentAdmin = await getAdmin();
  const currentUser = await getCurrentUser();
  const reservation = await getReservations({ authorId: currentAdmin?.id });

  console.log(reservation);

  if (!currentAdmin) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please Login"
      />
    );
  }
  if (reservation.length === 0) {
    return (
      <EmptyState
        title="No Reservation found"
        subtitle="Looks like you have no reservation on your profile"
      />
    );
  }
  return (
    <ReservationsClient
      currentAdmin={currentAdmin}
      reservations={reservation}
      currentUser={currentUser}
    />
  );
};

export default ReservationsPage;
