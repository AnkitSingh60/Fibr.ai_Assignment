"use client";

import CreateForm from "@/components/CreateForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sliceText } from "@/shared/utils";
import PageHeader from "@/components/PageHeader";

interface UserData {
  email: string;
  password: string;
  isAuthenticated: boolean;
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  // const updatedData = localStorage.getItem("landingPages");

  const [landingPages, setLandingPages] = useState<any[]>([]);
  const [userData, setUserData] = useState<UserData>();
  const [landingPagesUpdated, setLandingPagesUpdated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getUser = localStorage.getItem("user");

    if (getUser) {
      setUserData(JSON.parse(getUser));
    }
  }, []);

  useEffect(() => {
    if (!userData?.isAuthenticated) {
      router.push("/log-in");
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    const storedData = localStorage.getItem("landingPages");
    if (storedData) {
      setLandingPages(JSON.parse(storedData));
    }

  }, [landingPagesUpdated]);

  const openAddUserModal = () => {
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    const updatedPages = landingPages.filter((page) => page.id !== id);
    setLandingPages(updatedPages);
    localStorage.setItem("landingPages", JSON.stringify(updatedPages));
    setLandingPagesUpdated(!landingPagesUpdated);
  };

  const handleView = (id: number) => {
    router.push(`/view/${id}`);
  };

  const handleUpdate = (id: number) => {
    router.push(`/update/${id}`);
  };
  const handlePublish = (id: number) => {
    const updatedPages = landingPages.map((page) =>
      page.id === id ? { ...page, status: "Live" } : page
    );
    setLandingPages(updatedPages);
    localStorage.setItem("landingPages", JSON.stringify(updatedPages));
    setLandingPagesUpdated(!landingPagesUpdated);
  };

  const DataPreviewTable = () => {
    return (
      <>
        <PageHeader
          title="Home"
          rightContent={
            <button
              type="button"
              onClick={() => openAddUserModal()}
              className="block rounded-md bg-purple-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Create
            </button>
          }
        />
        <div className="max-w-9xl px-4 sm:px-6 lg:px-8">
          <h1 className="mt-2 max-w-lg text-4xl font-bold tracking-tight text-gray-900 mb-2">
            Landing pages
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            View all your landing pages along with their titles and
            descriptions.
          </p>
          <div className="mt-8 flow-root border rounded-xl">
            <div className="overflow-x-auto ">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 rounded-md">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {landingPages.map((page: any, index: number) => (
                      <tr key={index}>
                        <td
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          onClick={() => handleView(page.id)}
                        >
                          <span className="cursor-pointer">
                            {" "}
                            {sliceText(page.title, 22)}
                          </span>
                        </td>
                        <td
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          onClick={() => handleView(page.id)}
                        >
                          <span className="cursor-pointer">
                            {sliceText(page.description, 22)}{" "}
                          </span>
                        </td>

                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <span
                            className={`${
                              page.status === "Live"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            } inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize cursor-pointer`}
                            onClick={() => handlePublish(page.id)}
                          >
                            {page.status === "Live" ? "Live" : "Publish"}
                          </span>
                        </td>

                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <span
                            className="text-purple-600 hover:text-purple-900 cursor-pointer"
                            onClick={() => handleView(page.id)}
                          >
                            View <span className="sr-only">, {page.name}</span>
                          </span>
                        </td>

                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <span
                            className="text-purple-600 hover:text-purple-900 cursor-pointer"
                            onClick={() => handleUpdate(page.id)}
                          >
                            Edit<span className="sr-only">, {page.name}</span>
                          </span>
                        </td>

                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <span
                            className="text-red-600 hover:text-red-700 cursor-pointer"
                            onClick={() => handleDelete(page.id)}
                          >
                            Delete<span className="sr-only">, {page.name}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <main className="flex min-h-screen flex-col pt-4">
      <CreateForm onLandingPageCreated={() => setLandingPagesUpdated(!landingPagesUpdated)} isOpen={isOpen} setIsOpen={setIsOpen} />

      {landingPages.length > 0 ? (
        <>
          <DataPreviewTable />
        </>
      ) : (
        <>
          <main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-purple-600">Hey!</p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                You currently have no landing pages.
              </h1>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Dont worry! You can create new landing pages. Press the button
                below.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  onClick={() => openAddUserModal()}
                  className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                  Create landing page
                </button>
              </div>
            </div>
          </main>
        </>
      )}
    </main>
  );
}
