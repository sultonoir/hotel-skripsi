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
import dynamic from "next/dynamic";
import CountrySelect from "../city/CountrySelect";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  FASILITAS = 4,
  DESCRIPTION = 5,
  PRICE = 6,
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
      adult: 1,
      kids: 0,
      children: 0,
      img: [],
      price: 1,
      fasilitas: [],
      title: "",
      description: "",
      location: null,
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
  const adult = watch("adult");
  const children = watch("children");
  const kids = watch("kids");
  const img = watch("img");
  const fasilitas = watch("fasilitas");
  const location = watch("location");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Pilih kategory "
        subtitle="category yang menggambarkan kamar anda"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div
            key={item.label}
            className="col-span-1"
          >
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located ? "
          subtitle="Help guest find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Detail Ruangan"
          subtitle="Fasilitas utama apa saja yang anda punya"
        />
        <Counter
          title="Orang dewasa"
          subtitle="Usia 13 tahun ke atas"
          value={adult}
          onChange={(value) => setCustomValue("adult", value)}
        />
        <Counter
          title="Anak-anak"
          subtitle="Umur 2 - 13 tahun"
          value={kids}
          onChange={(value) => setCustomValue("kids", value)}
        />
        <Counter
          title="Balita"
          subtitle="Umur 2 tahun ke bawah"
          value={children}
          onChange={(value) => setCustomValue("children", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Tambahkan foto"
          subtitle="Tunjukan pada tamu tentang tempat anda"
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
          title="Fasilitas"
          subtitle="Fasilitas apa saja yang dalam category ini"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {facility.map((item) => (
            <div
              key={item.label}
              className="col-span-1 "
            >
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

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Sekarang, tetapkan harga Anda"
          subtitle="Berapa biaya yang Anda kenakan per malam?"
        />
        <Input
          id="title"
          label="title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="description"
          label="description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Sekarang, tetapkan harga Anda"
          subtitle="Berapa biaya yang Anda kenakan per malam?"
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
