"use client";

import UserForm from "@/components/backoffice/users/UserForm";
import { useGlobalContext } from "@/contexts/store";
import { useEffect, useState } from "react";

import { schemaEdit } from "@/zodSchema/userSchema";
import { toast } from "react-toastify";

import { service } from "@/services/user.service";
export default function page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<IUserData>();
  const { setTitle } = useGlobalContext();
  useEffect(() => {
    setTitle("Edit User");
    getUser(params.id);
  }, []);
  async function getUser(id: string) {
    try {
      service.getById(id).then(async (response: IResponse<IUserResponse>) => {
        const { data } = response;
        const userData: IUserData = {
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          avatar: data.assetFile,
        };
        setUser(userData);
      });
    } catch (error) {
      toast.error(error as string, {
        autoClose: 3000,
      });
    }
  }
  async function onSubmit(data: IUserData) {
    try {
      await toast.promise(service.update(params.id, data), {
        pending: "Loading...",
        success: "Update user successful",
      });
    } catch (error) {
      toast.error(error as string, {
        autoClose: 3000,
      });
    }
  }
  return (
    <UserForm
      schema={schemaEdit}
      onSubmit={onSubmit}
      data={user}
      type="edit"
    ></UserForm>
  );
}
