"use client";

import { useGlobalContext } from "@/contexts/store";
import Table from "@/components/Table";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { service as customerServices } from "@/services/customer.service";
import { toast } from "react-toastify";
interface ICustomerTable {
  id?: number;
  customerId: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

const header = [
  { name: "id", align: "left" },
  { name: "Customer ID", align: "left" },
  { name: "Full Name", align: "left" },
  { name: "Email", align: "left" },
  { name: "Telephone", align: "left" },
  { name: "Address", align: "left" },
];

export default function page() {
  const { setTitle } = useGlobalContext();
  const [dataTable, setDataTable] = useState<ICustomerTable[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    recordPerPage: 10,
    totalPage: 10,
    totalRecord: 0,
  });
  useEffect(() => {
    setTitle("Customer Management");
    getData();
  }, []);

  const getData = async (
    page: IPage = {
      currentPage: pagination.currentPage,
      recordPerPage: pagination.recordPerPage,
    }
  ) => {
    try {
      await customerServices.gets(page).then((entity) => {
        const { data, pagination } = entity;
        const item: ICustomerTable[] = data.map((item) => {
          const data: ICustomerTable = {
            id: item.id,
            customerId: item.customerId,
            fullName: item.firstName + " " + item.lastName,
            email: item.email,
            phone: item.phone,
            address: item.address,
          };
          return data;
        });
        setDataTable(item);
        setPagination(pagination);
      });
    } catch (error) {
      toast.error(error as string, {
        autoClose: 3000,
      });
    }
  };
  // const changePage = (page: IPagination) => {
  //   setPagination({
  //     ...pagination,
  //     currentPage: page.currentPage,
  //   });
  //   getData({
  //     currentPage: page.currentPage,
  //     recordPerPage: page.recordPerPage,
  //   });
  // };
  const deleteData = async (id: number) => {
    try {
      await toast.promise(customerServices.delete(id), {
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
        path="customers"
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
