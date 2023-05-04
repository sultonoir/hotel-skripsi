import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "./useLoginModal";
import { SafeUser } from "@/types";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const hasFavorited = currentUser?.favorite.some(
    (favorite: any) => favorite.listingId === listingId
  );

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;
        let toastMessage;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
          toastMessage = "Dihapus dari favorite";
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
          toastMessage = "Ditambahkan ke favorite";
        }

        await request();
        router.refresh();
        toast.success(toastMessage);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
