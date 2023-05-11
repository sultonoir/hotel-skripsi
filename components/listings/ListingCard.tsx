"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import HearthButton from "./HearthButton";
import Button from "../shared/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { Autoplay, Pagination, Navigation } from "swiper";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { SafeListing, SafeReservation, SafeUser, safeAdmin } from "@/types";
import Link from "next/link";
import BluredImage from "../shared/BluredImage";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  currentAdmin?: safeAdmin | null;
  name?: string | null | undefined;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
  name,
}) => {
  const router = useRouter();
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div className="relative">
      <Link
        href={`/listings/${data.id}`}
        className="col-span-1 cursor-pointer group"
      >
        <div className="flex flex-col gap-2 w-full">
          <div
            className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
          >
            <Swiper
              spaceBetween={30}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {data.imageSrc.map((img) => {
                return (
                  <SwiperSlide key={img.id}>
                    <BluredImage
                      src={img.img}
                      alt={data.title}
                    />
                  </SwiperSlide>
                );
              })}
              <div className="swiper-button-prev hover:bg-secondary/75 absolute top-1/2 -translate-y-1/2 left-2 rounded-full  z-10 cursor-pointer">
                <BiChevronLeft size={20} />
              </div>
              <div className="swiper-button-next hover:bg-secondary/75 absolute top-1/2 right-2  -translate-y-1/2 rounded-full z-10 cursor-pointer">
                <BiChevronRight size={20} />
              </div>
            </Swiper>
          </div>

          <div className="font-semibold text-foreground">{data.title}</div>

          <div className="font-light text-neutral-500">
            {reservationDate || data.category}
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">idr {price}</div>
            {!reservation && <div className="font-light">night</div>}
          </div>
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </Link>
      <div
        className="
            absolute
            top-3
            right-3
            z-20
          "
      >
        <HearthButton
          listingId={data.id}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default ListingCard;
