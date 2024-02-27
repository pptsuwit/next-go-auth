"use client";
import { useGlobalContext } from "@/contexts/store";

import Loading from "@/components/Loading";
import Modal from "@/components/Modal";

import { Bounce, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Providers({ children }: { children: React.ReactNode }) {
  const { modal, loading } = useGlobalContext();

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      {/* <Modal></Modal> */}
      {/* <Loading></Loading> */}
      {modal && <Modal></Modal>}
      {/* {loading && <Loading></Loading>} */}
      {children}
    </>
  );
}
