import EmptyState from "@/components/shared/EmptyState";
import getCurrentUser from "@/components/actions/getCurrentUser";
import getFavorites from "@/components/actions/getFavorites";
import FavoritesClient from "./FavoriteClient";

const page = async () => {
  const favorites = await getFavorites();
  const currentUser = await getCurrentUser();

  if (favorites.length === 0) {
    <EmptyState
      title="Tidak ada favorite"
      subtitle="Buat favorite terlebih dahulu"
    />;
  }

  const safelistings = favorites.map((fav) => fav.listing);

  return (
    <FavoritesClient
      currentUser={currentUser}
      listings={safelistings}
    />
  );
};

export default page;
