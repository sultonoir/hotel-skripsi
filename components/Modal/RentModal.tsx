"use client";

import { useRouter } from "next/navigation";
import useRentModal from "../hooks/useRentModal";
import Modal from "./Modal";
import { useState, useMemo } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { categories } from "../Category";
import Heading from "../Heading";
import CategoryInput from "../Inputs/CategoryInput";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";
import Fasilitas, { facility } from "../Fasilitas";
import Input from "../Inputs/Input";

enum STEPS {
  CATEGORY = 0,
  INFO = 1,
  IMAGES = 2,
  FASILITAS = 3,
  PRICE = 4,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      categories: "",
      guestCount: 1,
      fullSize: 0,
      kingSize: 0,
      img: [],
      price: 1,
      rooms: 0,
      fasilitas: [],
    },
  });

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "create";
    }
    return "next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "back";
  }, [step]);

  const category = watch("category");
  const guestCount = watch("guestCount");
  const fullSize = watch("fullSize");
  const kingSize = watch("kingSize");
  const rooms = watch("rooms");
  const img = watch("img");
  const fasilitas = watch("fasilitas");

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which the best describes your place ? "
        subtitle="pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share your basics about your place"
          subtitle="What amenities do you have ? "
        />
        <Counter
          title="Guest"
          subtitle="Berapa banyak tamu ?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          title="Rooms"
          subtitle="Berapa banyak ruangan ?"
          value={rooms}
          onChange={(value) => setCustomValue("rooms", value)}
        />
        <Counter
          title="King size"
          subtitle="Berapa banyak ranjang kingsize ? "
          value={kingSize}
          onChange={(value) => setCustomValue("kingSize", value)}
        />
        <Counter
          title="Full size"
          subtitle="Berapa banyak ranjang full size ? "
          value={fullSize}
          onChange={(value) => setCustomValue("fullSize", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add Photo of your Place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={img}
          onChange={(value) => setCustomValue("img", value)}
        />
      </div>
    );
  }

  if (step === STEPS.FASILITAS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add Photo of your Place"
          subtitle="Show guests what your place looks like!"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {facility.map((item) => (
            <div key={item.label} className="col-span-1 ">
              <Fasilitas
                icon={item.icon}
                label={item.label}
                onClick={(fasilitas) => setCustomValue("fasilitas", fasilitas)}
                selected={fasilitas}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night ? "
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      body={bodyContent}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Properti"
      disabled={isLoading}
    />
  );
};

export default RentModal;
