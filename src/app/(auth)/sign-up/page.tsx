"use client";

import { Button, Input } from "@nextui-org/react";
import { KeyRoundIcon, MailIcon, Smile } from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import axiosAuthInstance from "@/lib/axios/auth-instance";
import { IError } from "@/types/interface/IError";
import { useRouter } from "next/navigation";
import { SignUpValidator, SignUpValidatorType } from "@/lib/validator/sign-up";

export default function SignUpPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValidatorType>({
    resolver: zodResolver(SignUpValidator),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastName: "",
    },
  });

  const { isLoading, mutate: signUp } = useMutation<
    null,
    IError,
    SignUpValidatorType
  >({
    mutationFn: async (reqData) => {
      const { data } = await axiosAuthInstance.post("/auth/signup", {
        password: reqData.password,
        email: reqData.email, //unique
        firstname: reqData.firstname,
        lastName: reqData.lastName,
      });
      return data;
    },
    onError: (data) => {
      toast.error("Duplicate email, pls choose another");
    },
    onSuccess: () => {
      toast.success("Signed up user successfully!!!");
      router.push("/sign-in");
      router.refresh();
    },
  });

  async function onSubmit(data: SignUpValidatorType) {
    try {
      signUp(data);
    } catch (error) {
      toast.error("Something is wrong, can't logged in");
    }
  }

  return (
    <AnimatePresence>
      <form onSubmit={handleSubmit(onSubmit)}>
        <motion.div
          animate={{ x: 0 }}
          initial={{ x: "-100vw" }}
          transition={{ duration: 0.2 }}
          exit={{ x: "100vw", opacity: 0, transition: { duration: 0.5 } }}
          className="mx-auto md:w-[450px] w-[350px] md:mt-20 mt-16 bg-slate-50 p-10 pt-7 rounded-2xl shadow-lg  "
        >
          <h2 className="mb-6">Register</h2>
          <Input
            {...register("email")}
            errorMessage={errors?.email?.message}
            
            labelPlacement="outside"
            type="email"
            placeholder="Enter your email"
            className=" w-full  "
            startContent={<MailIcon />}
            required
            isRequired
            maxLength={140}
          />
          <Input
            {...register("password")}
            errorMessage={errors?.password?.message}
          
            type="password"
            labelPlacement="outside"
            placeholder="Enter your password"
            className=" w-full mt-8  "
            startContent={<KeyRoundIcon />}
            maxLength={140}
            required
            isRequired
          />
          <Input
            {...register("firstname")}
            errorMessage={errors?.firstname?.message}
           
            type="text"
            labelPlacement="outside"
            placeholder="Enter your first name"
            className=" w-full mt-8  "
            startContent={<Smile />}
            maxLength={20}
            required
            isRequired
          />
          <Input
            {...register("lastName")}
            errorMessage={errors?.lastName?.message}
           
            type="text"
            labelPlacement="outside"
            placeholder="Enter your last name"
            className=" w-full mt-8  "
            startContent={<Smile />}
            maxLength={20}
            required
            isRequired
          />
          <div className="flex justify-end mt-6">
            <Button isLoading={isLoading} type="submit" color="primary">
              Register
            </Button>
          </div>
        </motion.div>
      </form>
    </AnimatePresence>
  );
}
