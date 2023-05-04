import EmptyState from "@/components/EmptyState";
import getCurrentUser from "@/components/actions/getCurrentUser";
import getFavorites from "@/components/actions/getFavorites";
import FavoritesClient from "./FavoriteClient";

const page = async () => {
  const listings = await getFavorites();
  const currentUser = await getCurrentUser();

  const [SafeListing] = listings.map((listing) => ({
    ...listing,
  }));

  if (SafeListing.favorite.length === 0) {
    return (
      <EmptyState
        title="No favorite found"
        subtitle="Look like you have no favorite listings"
      />
    );
  }

  return (
    <FavoritesClient
      currentUser={currentUser}
      listings={listings}
    />
  );
};

export default page;
