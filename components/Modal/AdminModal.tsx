"use client";

import Heading from "../shared/Heading";
import Input from "../Inputs/Input";
import useAdminModal from "../hooks/useAdminModal";
import Modal from "./Modal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const AdminModal = () => {
  const router = useRouter();
  const adminModal = useAdminModal();
  const [isloading, setIsloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          router.refresh();
          toast.success("Login");
          adminModal.onClose();
        }
        if (callback?.error) {
          toast.error(callback.error);
          setIsloading(false);
        }
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="welcome to Kyouka"
        subtitle="Create an account"
      />
      <Input
        id="email"
        type="email"
        label="email"
        disabled={isloading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isloading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  return (
    <Modal
      disabled={isloading}
      body={bodyContent}
      actionLabel="Login"
      title="Admin"
      isOpen={adminModal.isOpen}
      onClose={adminModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default AdminModal;
