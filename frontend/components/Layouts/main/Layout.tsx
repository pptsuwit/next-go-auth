"use client";
import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Drawer from "./Drawer";
import { useGlobalContext } from "@/contexts/store";
import Dialog from "@/components/Dialog";
const MainLayout = ({ children }: PropsWithChildren) => {
  const { dialog } = useGlobalContext();
  return (
    <>
      <Dialog {...dialog} />
      <Navbar />
      <div className="flex absolute z-0 pt-16 w-full">
        <Drawer />
        <div className="xs:py-4 sm:p-4 z-0 w-full">{children}</div>
      </div>
    </>
  );
};
export default MainLayout;
