"use client";

import { signIn } from "next-auth/react";
import React from "react";
import VerificationInput from "react-verification-input";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useSessionStorage from "@/custom-hooks/use-session-storage";

export default function VerifyPage() {
  const email = useSessionStorage("loginEmail");
  const router = useRouter();
  const onSubmit = async (value: string) => {
    const result = await signIn("credentials", {
      email: email,
      code: value,
      redirect: true,
      callbackUrl: "/",
    });
  };

  if (email === undefined || email === null) {
    router.push("/");
    router.refresh();
  }

  return (
    <div className=" w-full h-[80vh] flex-center justify-center">
      <motion.div
        animate={{ x: 0 }}
        initial={{ x: "-100vw" }}
        transition={{ duration: 0.2 }}
        className=" md:w-[500px] w-[350px]  bg-slate-50 dark:bg-slate-800 p-10 pt-7 rounded-2xl shadow-lg flex-center justify-center flex-col  "
      >
        <div className="mt-5 text-center ">
          Verifying <b>{email} </b>logged in:
        </div>
        <div className="mb-8 mt-3 text-center">
          We&apos;ve sent a code to your email
        </div>
        <div className="pb-8 ">
          <VerificationInput
            onComplete={(value) => {
              onSubmit(value);
            }}
            classNames={{
              character:
                "font-bold text-5xl dark:text-black text-center align-middle pt-[12px] md:h-20 h-16 rounded-lg border-slate-400	",
              container: " md:w-[400px] w-[300px]",
              characterInactive: " bg-slate-200 dark:bg-slate-800",
            }}
            placeholder=""
            length={5}
            validChars="0-9"
            inputProps={{ inputMode: "numeric" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
