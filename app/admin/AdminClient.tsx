"use client";
import ListingCard from "@/components/listings/ListingCard";
import { SafeListing, SafeUser, safeAdmin } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

interface AdminClientProps {
  currentAdmin: safeAdmin | null;
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

const AdminClient: React.FC<AdminClientProps> = ({
  currentAdmin,
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Properties deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          data={listing}
          actionId={listing.id}
          onAction={onCancel}
          disabled={deletingId === listing.id}
          actionLabel="Delete Property"
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default AdminClient;
