import Container from "@/components/shared/Container";
import getCurrentUser from "@/components/actions/getCurrentUser";
import getListings from "@/components/actions/getListings";
import ListingCard from "@/components/listings/ListingCard";
import { SafeListing } from "@/types";

const page = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getListings();
  return (
    <div className="mt-2">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: SafeListing) => {
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
