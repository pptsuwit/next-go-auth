"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Paper from "../../Paper";
import Input from "../../Input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

interface CustomerFormProps {
  schema: Zod.Schema;
  type?: string;
  data?: ICustomer;
  onSubmit: (data: ICustomer) => void;
  path: string;
}
export default function CustomerForm(props: CustomerFormProps) {
  type FormData = z.infer<typeof props.schema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(props.schema),
  });

  useEffect(() => {
    if (props.type === "edit") {
      reset({
        customerId: props.data?.customerId,
        firstName: props.data?.firstName,
        lastName: props.data?.lastName,
        email: props.data?.email,
        phone: props.data?.phone,
        address: props.data?.address,
        birthdate: props.data?.birthdate,
      });
    } else {
      reset({ email: "" });
    }
  }, [props]);

  async function onSubmit(data: FormData) {
    const customerData: ICustomer = {
      customerId: data.customerId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      birthdate: data.birthdate,
    };
    props.onSubmit(customerData);
  }
  return (
    <div className="flex justify-center">
      <Paper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-y-4">
            <div className="flex items-center">
              <div className="w-60">
                <label
                  className="block text-gray-700 text-md font-bold mb-2"
                  htmlFor="First Name"
                >
                  CustomerID
                </label>
              </div>
              <div className="w-full">
                <Input
                  id="customerId"
                  name="customerId"
                  type="text"
                  placeholder="Customer ID"
                  register={register("customerId", { required: true })}
                  errors={errors}
                ></Input>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-60">
                <label
                  className="block text-gray-700 text-md font-bold mb-2"
                  htmlFor="First Name"
                >
                  First Name
                </label>
              </div>
              <div className="w-full">
                <Input
                  id="First Name"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  register={register("firstName", { required: true })}
                  errors={errors}
                ></Input>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-60">
                <label
                  className="block text-gray-700 text-md font-bold mb-2"
                  htmlFor="Last Name"
                >
                  Last Name
                </label>
              </div>
              <div className="w-full">
                <Input
                  id="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  register={register("lastName", { required: true })}
                  errors={errors}
                ></Input>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-60">
                <label
                  className="block text-gray-700 text-md font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
              </div>
              <div className="w-full">
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email"
                  register={register("email", { required: true })}
                  errors={errors}
                ></Input>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-60">
                <label
                  className="block text-gray-700 text-md font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
              </div>
              <div className="w-full">
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Phone"
                  register={register("phone", { required: true })}
                  errors={errors}
                ></Input>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-60">
                <label
                  className="block text-gray-700 text-md font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
              </div>
              <div className="w-full">
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Address"
                  register={register("address", { required: true })}
                  errors={errors}
                ></Input>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-60">
                <label
                  className="block text-gray-700 text-md font-bold mb-2"
                  htmlFor="birthdate"
                >
                  Birth Date
                </label>
              </div>
              <div className="w-full">
                <Input
                  id="birthdate"
                  name="birthdate"
                  type="text"
                  placeholder="Birth Date"
                  register={register("birthdate")}
                  errors={errors}
                ></Input>
              </div>
            </div>

            <div className="flex justify-center gap-4 py-4">
              <button
                className="px-10 py-2 focus:border-theme-400 focus:border-2 shadow
              bg-theme-500 hover:bg-theme-400 focus:shadow-outline focus:outline-none text-white font-bold rounded"
                type="submit"
              >
                Submit
              </button>
              <Link
                href={`/backoffice/${props.path}`}
                className="px-10 py-2 focus:border-back-400 focus:border-2 shadow
              bg-back-500 hover:bg-back-400 focus:shadow-outline focus:outline-none text-white font-bold rounded"
                type="submit"
              >
                Back
              </Link>
            </div>
          </div>
        </form>
      </Paper>
    </div>
  );
}
