"use client";

import "../style/globals.css";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/shared/utils";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import PageFooter from "@/components/PageFooter";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout(props: Props) {
  const router = useRouter();

  const [userData, setUserData] = useState();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const getUser = localStorage.getItem("user");

    if (getUser) {
      setUserData(JSON.parse(getUser));
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    router.push("/log-in");
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "#" },
    { name: "Career", href: "#" },
    { name: "Settings", href: "#" },
  ];

  return (
    <div className={classNames(`h-screen`)}>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4 z-50">
                  <div className="flex flex-shrink-0 items-center px-4">
                    <Image
                      onClick={() => {
                        router.push("/");
                      }}
                      className="w-10 h-auto cursor-pointer"
                      width={"16"}
                      height={"16"}
                      src={"/fibr_logo.jpg"}
                      alt="logo"
                    />
                  </div>
                  <nav className="mt-5 space-y-1 px-2">
                    {navigation.map((item) => {
                      if (item.href) {
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.href === pathname
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            )}
                          >
                            {item.name}
                          </Link>
                        );
                      }

                      return null;
                    })}
                  </nav>
                </div>
                <div className="flex flex-shrink-0 bg-gray-700 p-4">
                  <a
                    href="src/app/(dashboard)#"
                    className="group block w-full flex-shrink-0"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p
                          onClick={() => router.push("/settings?tab=0")}
                          className="text-sm font-medium text-white cursor-pointer"
                        >
                          {userData?.email}
                        </p>
                        <p
                          className="text-xs font-medium text-gray-300 group-hover:text-gray-200"
                          onClick={() => handleLogOut()}
                        >
                          Log out
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <Image
                onClick={() => {
                  router.push("/");
                }}
                className="w-10 h-auto cursor-pointer"
                width={"16"}
                height={"16"}
                src={"/fibr_logo.jpg"}
                alt="logo"
              />
              <h1 className="text-white ml-4 font-bold text-2xl">Fibr.ai</h1>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {navigation.map((item) => {
                if (item.href) {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.href === pathname
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                }
                return null;
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 bg-gray-700 p-4">
            <span className="group block w-full flex-shrink-0">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-white cursor-pointer">
                    {userData?.email}
                  </p>
                  <p
                    className="cursor-pointer text-xs font-medium text-gray-300 group-hover:text-gray-200"
                    onClick={() => handleLogOut()}
                  >
                    Log out
                  </p>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
      <div className="min-h-full flex flex-1 flex-col md:pl-64 ">
        <div className="sticky top-0 z-10 bg-gray-800 md:hidden">
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-md text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 flex flex-col">{props.children}</main>
        <PageFooter />
      </div>
    </div>
  );
}
