import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import RentInput from "@/components/Inputs/RentInput";
import getAdmin from "@/components/actions/getAdmin";
import getCurrentUser from "@/components/actions/getCurrentUser";
import getListings from "@/components/actions/getListings";
import ListingCard from "@/components/listings/ListingCard";

const page = async () => {
  const currentAdmin = await getAdmin();
  const listings = await getListings();
  const currentUser = await getCurrentUser();
  if (!currentAdmin) {
    return <EmptyState />;
  }

  return (
    <div className="mt-2">
      <Container>
        <RentInput />
        <div className="grid pt-24 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: any) => {
            return (
              <ListingCard
                currentUser={currentUser}
                data={listing}
                key={listing.id}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default page;
