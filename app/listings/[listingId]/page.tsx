import EmptyState from "@/components/EmptyState";
import getCurrentUser from "@/components/actions/getCurrentUser";
import getLIstingById from "@/components/actions/getListingById";
import getReservations from "@/components/actions/getReservations";
import ListingClient from "./ListingClient";

interface Iparams {
  listingId?: string;
}

const page = async ({ params }: { params: Iparams }) => {
  const listing = await getLIstingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);
  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
    />
  );
};

export default page;
