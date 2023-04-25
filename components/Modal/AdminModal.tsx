"use client";

import { useState } from "react";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminModal = () => {
  const router = useRouter();
  const [login, setLogin] = useState(true);
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
    signIn("admin", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          toast.success("Login");
        }
        if (callback?.error) {
          toast.error(callback.error);
          setIsloading(false);
        }
      })
      .finally(() => {
        router.refresh();
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
      isOpen={login}
      onClose={() => setLogin(false)}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default AdminModal;
