"use client";
import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/zodSchema/registerSchema";
import * as z from "zod";
type FormData = z.infer<typeof registerSchema>;

import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

import Input from "@/components/Input";
import { toast } from "react-toastify";
export default function page() {
  const router = useRouter();

  useEffect(() => {
    console.log("use effect");
    reset({ email: "", password: "" });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });
  async function onSubmit(data: FormData) {
    const newUser: IRegister = {
      username: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    };
    try {
      await toast.promise(authService.register(newUser), {
        pending: "Loading...",
        success: "Register successful",
      });
    } catch (error) {
      toast.error(error as string, {
        autoClose: 3000,
      });
    }
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white border border-gray-200 shadow-lg p-8 rounded-lg w-full sm:w-96">
        <h1 className="text-5xl text-center text-theme-600 font-semibold mb-6">
          Register
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              register={register("firstName", { required: true })}
              errors={errors}
            ></Input>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              register={register("lastName", { required: true })}
              errors={errors}
            ></Input>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              register={register("email", { required: true })}
              errors={errors}
            ></Input>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              register={register("password", { required: true })}
              errors={errors}
            ></Input>
          </div>
          <div className="mb-8">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              register={register("confirmPassword", { required: true })}
              errors={errors}
            ></Input>
          </div>
          <div>
            <button
              className="w-full focus:border-theme-400 focus:border-2 shadow
              bg-theme-500 hover:bg-theme-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 rounded"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-8 text-center">
          <a
            className="w-full py-2 focus:border-gray-400 focus:border-2 shadow
              bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold rounded"
            type="submit"
            href="/login"
          >
            Back
          </a>
        </div>
      </div>
    </div>
  );
}
