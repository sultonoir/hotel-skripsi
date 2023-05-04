import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import RentInput from "@/components/Inputs/RentInput";
import getAdmin from "@/components/actions/getAdmin";
import getCurrentUser from "@/components/actions/getCurrentUser";
import getListings from "@/components/actions/getListings";
import ListingCard from "@/components/listings/ListingCard";
import AdminClient from "./AdminClient";

const page = async () => {
  const currentAdmin = await getAdmin();
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (!currentAdmin) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
      />
    );
  }

  return (
    <div className="mt-2">
      <Container>
        <RentInput />
        <AdminClient
          currentAdmin={currentAdmin}
          listings={listings}
          currentUser={currentUser}
        />
      </Container>
    </div>
  );
};

export default page;
