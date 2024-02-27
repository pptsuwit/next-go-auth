"use client";

import { useGlobalContext } from "@/contexts/store";
import { useEffect, useState } from "react";

import { schema } from "@/zodSchema/customerSchema";
import { toast } from "react-toastify";

import { service } from "@/services/customer.service";
import CustomerForm from "@/components/backoffice/customers/CustomerForm";
export default function page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<ICustomer>();
  const { setTitle } = useGlobalContext();
  useEffect(() => {
    setTitle("Edit Customer");
    getUser(params.id);
  }, []);
  async function getUser(id: string) {
    try {
      service.getById(id).then(async (response: IResponse<ICustomer>) => {
        const { data } = response;
        setData({ ...data });
      });
    } catch (error) {
      toast.error(error as string, {
        autoClose: 3000,
      });
    }
  }
  async function onSubmit(data: ICustomer) {
    const updateData: ICustomer = {
      id: Number(params.id),
      ...data,
    };
    try {
      await toast.promise(service.update(updateData), {
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
    <CustomerForm
      path="customers"
      schema={schema}
      onSubmit={onSubmit}
      data={data}
      type="edit"
    ></CustomerForm>
  );
}
