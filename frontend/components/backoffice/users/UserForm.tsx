"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Paper from "../../Paper";
import Input from "../../Input";
import Image from "next/image";
import defaultImage from "@/assets/avatar.jpg";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

interface UserFormProps {
  schema: Zod.Schema;
  type?: string;
  data?: IUserData;
  onSubmit: (data: IUserData) => void;
}
export default function UserForm(props: UserFormProps) {
  const [avatar, setAvatar] = useState(defaultImage.src);
  const [file, setFile] = useState<File>();
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
        username: props.data?.username,
        firstName: props.data?.firstName,
        lastName: props.data?.lastName,
      });
      setAvatar(props.data?.avatar || defaultImage.src);
    } else {
      reset({ username: "", password: "" });
    }
  }, [props]);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    if (files[0]) {
      setAvatar(URL.createObjectURL(files[0]));
      setFile(files[0]);
    } else {
      setAvatar(defaultImage.src);
      setFile(undefined);
    }
  };
  async function onSubmit(data: FormData) {
    const userData: IUserData = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: data.password,
      avatar: avatar,
      file: file,
    };
    props.onSubmit(userData);
  }
  return (
    <div className="flex justify-center">
      <Paper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-y-4">
            <div className="flex items-center">
              <div className="w-full flex justify-center">
                <div className="relative w-32 h-32 overflow-hidden bg-gray-100 rounded-full ring-2 ring-theme-500">
                  <label htmlFor="avatar" className="static">
                    <Image
                      unoptimized={true}
                      priority={true}
                      loader={() => avatar}
                      src={avatar}
                      fill={true}
                      alt="avatar"
                    />
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                  ></input>
                </div>
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
                  htmlFor="username"
                >
                  Username
                </label>
              </div>
              <div className="w-full">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  register={register("username", { required: true })}
                  errors={errors}
                ></Input>
              </div>
            </div>
            {props.type !== "edit" && (
              <>
                <div className="flex items-center">
                  <div className="w-60">
                    <label
                      className="block text-gray-700 text-md font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>
                  <div className="w-full">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      register={register("password", { required: true })}
                      errors={errors}
                    ></Input>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-60">
                    <label
                      className="block text-gray-700 text-md font-bold mb-2"
                      htmlFor="confirmPassword"
                    >
                      Confirm password
                    </label>
                  </div>
                  <div className="w-full">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      register={register("confirmPassword", { required: true })}
                      errors={errors}
                    ></Input>
                  </div>
                </div>
              </>
            )}
            <div className="flex justify-center gap-4 py-4">
              <button
                className="px-10 py-2 focus:border-theme-400 focus:border-2 shadow
              bg-theme-500 hover:bg-theme-400 focus:shadow-outline focus:outline-none text-white font-bold rounded"
                type="submit"
              >
                Submit
              </button>
              <Link
                href="/backoffice/users"
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
