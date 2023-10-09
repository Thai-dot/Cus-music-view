"use client";

import axiosAuthInstance from "@/lib/axios/auth-instance";
import { fetchMe } from "@/lib/axios/fetch/user/get-me";
import { fetchUpdateUser } from "@/lib/axios/fetch/user/update-user";
import {
  UpdateUserValidatorType,
  UpdateValidator,
} from "@/lib/validator/update-user";
import { IError, IQueryError } from "@/types/interface/IError";
import IUser from "@/types/interface/IUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Input, Skeleton } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";

function LocalLayout({
  child1,
  child2,
}: {
  child1?: React.ReactNode;
  child2?: React.ReactNode;
}) {
  return (
    <div>
      {" "}
      <h3>Public Profile</h3>
      <Divider className="my-3" />
      <div className="lg:grid flex flex-col grid-cols-12 lg:gap-20 gap-5">
        {child1}
      </div>
      <h3 className="mt-5">Update Information</h3>
      <Divider className="my-3" />
      <div>{child2}</div>
    </div>
  );
}

export default function InformationPage() {
  const { data, isLoading, refetch } = useQuery<IUser, IQueryError>({
    queryKey: "fetchMe",
    queryFn: () => {
      return fetchMe();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserValidatorType>({
    resolver: zodResolver(UpdateValidator),
  });

  const { isLoading: isLoadingMutation, mutate: updateUser } = useMutation<
    null,
    IError,
    UpdateUserValidatorType
  >({
    mutationFn: async (reqData) => {
      const {data} = await fetchUpdateUser(reqData);

      return data;
    },
    onError: () => {
      toast.error("Something is wrong. Couldn't update!");
    },
    onSuccess: () => {
      toast.success("Updated successfully!");

      refetch();
    },
  });

  const onSubmit = (data: UpdateUserValidatorType) => {
    updateUser(data);
  };

  if (isLoading) {
    return (
      <LocalLayout
        child1={
          <>
            <Skeleton className="w-full col-span-6 rounded-lg">
              <div className="h-10 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-full col-span-6 rounded-lg">
              <div className="h-10 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
          </>
        }
        child2={
          <div className="lg:grid flex flex-col grid-cols-12 lg:gap-20 gap-5 w-full">
            <Skeleton className="w-full col-span-6 rounded-lg">
              <div className="h-10 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-full col-span-6 rounded-lg">
              <div className="h-10 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
        }
      />
    );
  }

  return (
    <LocalLayout
      child1={
        <>
          <Input
            className="col-span-6"
            label="Email"
            value={data?.email}
            readOnly
            disabled
          />
          <Input
            className="col-span-6"
            label="Name"
            value={`${data?.firstname} ${data?.lastName}`}
            readOnly
            disabled
          />
        </>
      }
      child2={
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <div className="lg:grid flex flex-col grid-cols-12 lg:gap-20 gap-5 w-full">
            <Input
              {...register("firstname")}
              className="col-span-6"
              label="First Name"
              defaultValue={data?.firstname}
              variant="underlined"
              errorMessage={errors.firstname?.message}
            />
            <Input
              {...register("lastName")}
              className="col-span-6"
              defaultValue={data?.lastName}
              label="Last Name"
              variant="underlined"
              errorMessage={errors.lastName?.message}
            />
          </div>
          <div className="flex w-full justify-end mt-4">
            <Button isLoading={isLoading} type="submit" color="primary">
              {" "}
              Update
            </Button>
          </div>
        </form>
      }
    />
  );
}
