"use client";
import { useGlobalContext } from "@/contexts/store";
import { AiOutlineMenu, AiOutlinePicture } from "react-icons/ai";
import defaultImage from "@/assets/avatar.jpg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { authService } from "@/services/auth.service";
const Navbar = () => {
  const { title, drawer, setDrawer, setDialog, dialog } = useGlobalContext();
  const [menu, setMenu] = useState(false);

  const [user, setUser] = useState({
    email: "",
    name: "",
    image: defaultImage.src,
  });

  const ref = useRef<any>(null);
  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target)) {
      setMenu(false);
    }
  }
  const defaultDialog = {
    show: false,
    title: "Sign Out",
    message: "Are you sure you want to sign out?",
    iconType: "warning",
    confirm: signOut,
    cancle: () => {
      setDialog((prev) => ({
        ...prev,
        show: false,
      }));
    },
  };
  useEffect(() => {
    setDialog(defaultDialog);

    const userAcc = JSON.parse(localStorage.getItem("user") as string);
    if (userAcc) {
      const name = `${userAcc.firstName} `;
      const email = userAcc.username;
      const image = userAcc.assetFile || defaultImage.src;
      setUser({ name, email, image });
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuList = [{ name: "Home", link: "/" }];
  const liMenuList = menuList.map((item, index) => {
    return (
      <li key={index}>
        <Link
          onClick={() => setMenu(false)}
          href={item.link}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {item.name}
        </Link>
      </li>
    );
  });

  function signOut(status: boolean) {
    if (!status) return;
    dialog.cancle();
    authService.logout();
  }

  return (
    <>
      <nav className="bg-white border-gray-200 shadow-md fixed w-full h-16 z-40">
        <div className="flex items-center py-2">
          {/* Logo */}
          <div className="flex xs:w-16 sm:w-64 px-2">
            <div>
              <button
                onClick={() => setDrawer(!drawer)}
                type="button"
                className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none mr-5"
              >
                <span className="sr-only">Open main menu</span>
                <AiOutlineMenu fontSize={40} />
              </button>
            </div>
            <div className="xs:hidden sm:block">
              <Link
                href="#"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <AiOutlinePicture fontSize={40} className="text-theme-500" />
                <span className="self-center text-2xl text-theme-500 font-semibold whitespace-nowrap  ">
                  Logo
                </span>
              </Link>
            </div>
          </div>
          {/* Title */}
          <div className="flex xs:w-[calc(100%-8rem)] sm:w-[calc(100%-20rem)] px-8 xs:justify-center sm:justify-start">
            <span className="xs:text-xl md:text-3xl">{title}</span>
          </div>
          {/* Avatar Menu */}
          <div className="flex items-center">
            <button
              type="button"
              className="flex text-sm rounded-full ring-2 ring-theme-500"
              onClick={() => setMenu(!menu)}
            >
              <span className="sr-only">Open menu</span>
              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full ">
                <Image
                  unoptimized={true}
                  priority={true}
                  loader={() => user.image}
                  src={user.image}
                  // width={500}
                  // height={500}
                  fill={true}
                  alt="avatar"
                />
              </div>
            </button>
            {/* <!-- Dropdown menu --> */}
            {menu && (
              <div
                ref={ref}
                className="absolute top-11 right-5 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
              >
                <div className="px-4 py-3 ">
                  <span className="block text-sm text-theme-500 font-bold">
                    {user.name}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate font-bold">
                    {user.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  {liMenuList}
                  <li>
                    <a
                      onClick={() =>
                        setDialog(() => ({
                          ...defaultDialog,
                          show: true,
                        }))
                      }
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
