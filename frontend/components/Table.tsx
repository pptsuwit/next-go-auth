"use client";

import Link from "next/link";
import defaultImage from "@/assets/avatar.jpg";
import Image from "next/image";
import { useEffect } from "react";
import { useGlobalContext } from "@/contexts/store";

interface TableHeader {
  name: string;
  align: string;
  type?: string;
}
interface TableProps<T> {
  header: TableHeader[];
  data: T[];
  action: ActionButton;
  path: string;
  createBtn?: boolean;
  onDelete?: (id: number) => void;
}
interface ActionButton {
  status: boolean;
  edit?: boolean;
  delete?: boolean;
}
export default function Table<T extends object>(props: TableProps<T>) {
  const { setDialog, dialog } = useGlobalContext();

  const defaultDialog = {
    show: false,
    title: "Warning!",
    message: "Are you sure you want to delete?",
    iconType: "warning",
    confirm: deleteData,
    cancle: () => {
      setDialog((prev) => ({
        ...prev,
        show: false,
      }));
    },
  };
  useEffect(() => {
    setDialog(defaultDialog);
  }, []);

  let data: Object[] = [];
  props?.data?.map((item) => {
    data.push(Object.values(item));
  });
  function confirmDelete(id: number) {
    setDialog(() => ({
      ...defaultDialog,
      show: true,
      confirm() {
        deleteData(id);
      },
    }));
  }
  function deleteData(id: number) {
    dialog.cancle();
    if (props.onDelete) props.onDelete(id);
  }
  const tableCells = data.map((cells, index) => {
    let id = undefined;
    let cell;
    if (cells instanceof Array) {
      id = cells[0];
      cell = cells.map((item, cIndex) => {
        const type = props.header[cIndex].type;
        let input;
        if (type === "image" || type === "img") {
          input = (
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
              <Image
                unoptimized={true}
                priority={true}
                loader={() => item || defaultImage.src}
                src={item || defaultImage.src}
                fill={true}
                alt="avatar"
              />
            </div>
          );
        } else {
          input = <>{item}</>;
        }
        return (
          <td
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            key={cIndex}
          >
            {input}
          </td>
        );
      });
    }
    return (
      <tr className="bg-white border-b hover:bg-gray-50 " key={index}>
        {cell}
        {props.action.status !== false && (
          <td className="px-6 py-4 text-center">
            {props.action.edit !== false && (
              <Link
                href={`${props.path}/edit/${id}`}
                className="font-medium text-blue-600 hover:underline px-2"
              >
                Edit
              </Link>
            )}
            {props.action.delete !== false && (
              <button
                onClick={() => {
                  confirmDelete(id);
                }}
                className="font-medium text-red-600 hover:underline px-2"
              >
                Delete
              </button>
            )}
          </td>
        )}
      </tr>
    );
  });
  return (
    <>
      {props.createBtn && (
        <div className="flex justify-end mb-2">
          <Link
            href={`${props.path}/create`}
            className="px-8 py-2 shadow
              bg-emerald-500 hover:bg-emerald-400 focus:shadow-outline focus:outline-none text-white font-bold rounded-md"
          >
            Create
          </Link>
        </div>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              {props.header.map((header) => {
                return (
                  <th
                    scope="col"
                    className={`px-6 py-3 ${"text-" + header.align}`}
                    key={header.name}
                  >
                    {header.name}
                  </th>
                );
              })}
              {props.action.status !== false &&
                (props.action.edit !== false ||
                  props.action.delete !== false) && (
                  <th scope="col" className="px-6 py-3 text-center">
                    <span className="sr-only">Action</span>
                    Action
                  </th>
                )}
            </tr>
          </thead>
          <tbody>{tableCells}</tbody>
        </table>
      </div>
    </>
  );
}
