"use client";

import UserForm from "@/components/backoffice/users/UserForm";
import { useGlobalContext } from "@/contexts/store";
import { useEffect } from "react";

import { schema } from "@/zodSchema/userSchema";
import { toast } from "react-toastify";

import { service } from "@/services/user.service";
export default function page() {
  const { setTitle } = useGlobalContext();
  useEffect(() => {
    setTitle("Create User");
  }, []);

  async function onSubmit(data: IUserData) {
    try {
      await toast.promise(service.create(data), {
        pending: "Loading...",
        success: {
          render() {
            toast.info(`Redirecting to users` as string, {
              autoClose: 3000,
              onClose: () => (window.location.href = "/backoffice/users"),
            });
            return "Create user successful";
          },
        },
      });
    } catch (error) {
      toast.error(error as string, {
        autoClose: 3000,
      });
    }
  }
  return <UserForm schema={schema} onSubmit={onSubmit}></UserForm>;
}
