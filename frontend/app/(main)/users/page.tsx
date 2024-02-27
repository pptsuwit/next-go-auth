"use client";

import { useGlobalContext } from "@/contexts/store";
import Table from "@/components/Table";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { service as userServices } from "@/services/user.service";
import { toast } from "react-toastify";
interface IUserTable {
  id?: string;
  fullName: string;
  email: string;
  avatar: string;
}

const header = [
  { name: "id", align: "left" },
  { name: "Avatar", align: "left", type: "image" },
  { name: "Full Name", align: "left" },
  { name: "Email", align: "left" },
];

export default function page() {
  const { setTitle } = useGlobalContext();
  const [dataTable, setDataTable] = useState<IUserTable[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    recordPerPage: 10,
    totalPage: 10,
    totalRecord: 0,
  });
  useEffect(() => {
    setTitle("User Management");
    getData();
  }, []);

  const getData = async (
    page: IPage = {
      currentPage: pagination.currentPage,
      recordPerPage: pagination.recordPerPage,
    }
  ) => {
    try {
      await userServices.gets(page).then((entity) => {
        const { data, pagination } = entity;
        const user: IUserTable[] = data.map((item) => {
          const data: IUserTable = {
            id: item.id,
            avatar: item.assetFile,
            fullName: item.firstName + " " + item.lastName,
            email: item.username,
          };
          return data;
        });
        setDataTable(user);
        setPagination(pagination);
      });
    } catch (error) {
      toast.error(error as string, {
        autoClose: 3000,
      });
    }
  };
  const deleteData = async (id: number) => {
    try {
      await toast.promise(userServices.delete(id), {
        pending: "Waiting...",
        success: "Delete data successfully",
      });
      getData();
    } catch (error) {
      toast.error(error as string, {
        autoClose: 3000,
      });
    }
  };
  return (
    <>
      <Table
        createBtn={true}
        path="users"
        header={header}
        data={dataTable}
        action={{
          status: true,
          // edit: false,
          // delete: false,
        }}
        onDelete={deleteData}
      />
      <Pagination
        pagination={{
          currentPage: pagination.currentPage,
          // recordPerPage: 10,
          totalPage: pagination.totalPage,
          // totalRecord: 0,
        }}
        setCurrentPage={getData}
      />
    </>
  );
}
