"use client";

import { Button, Input } from "@nextui-org/react";
import { KeyRoundIcon, MailIcon } from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidatorType, LoginValidator } from "@/lib/validator/login";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import axiosAuthInstance from "@/lib/axios/auth-instance";
import { IError } from "@/types/interface/IError";
import { signIn } from "next-auth/react";


export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidatorType>({
    resolver: zodResolver(LoginValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isLoading, mutate: login } = useMutation<
    null,
    IError,
    LoginValidatorType
  >({
    mutationFn: async (reqData) => {
      const { data } = await axiosAuthInstance
        .post("/auth/signin", {
          password: reqData.password,
          email: reqData.email, //unique
        })
        .then((res) => {
          if (res.data?.status === 404 || res.data?.status === 403) {
            throw new Error("Not found user");
          }

          sessionStorage.setItem("loginEmail", reqData.email);

          return res.data;
        });

      return data;
    },
    onError: () => {
      toast.error("Email or password is incorrect");
    },
    onSuccess: () => {
      toast.success("Logged in successfully!!!");

      signIn();
    },
  });

  async function onSubmit(data: LoginValidatorType) {
    try {
      login(data);
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
          className="mx-auto md:w-[450px] w-[350px] md:mt-40 mt-28 bg-slate-50 p-10 pt-7 rounded-2xl shadow-lg  "
        >
          <h2 className="mb-6">Login</h2>
          <Input
            {...register("email")}
            errorMessage={errors?.email?.message}
            label="Email"
            labelPlacement="outside"
            type="email"
            placeholder="Enter your email"
            className=" w-full  "
            startContent={<MailIcon />}
            isClearable
            required
            isRequired
            maxLength={180}
          />
          <Input
            {...register("password")}
            errorMessage={errors?.password?.message}
            label="Password"
            type="password"
            labelPlacement="outside"
            placeholder="Enter your password"
            className=" w-full mt-8  "
            startContent={<KeyRoundIcon />}
            isClearable
            maxLength={32}
            required
            isRequired
          />
          <div className="flex justify-end mt-6">
            <Button isLoading={isLoading} type="submit" color="primary">
              Sign In
            </Button>
          </div>
        </motion.div>
      </form>
    </AnimatePresence>
  );
}
