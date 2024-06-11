"use client";

import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LandingPage {
  id: number;
  title: string;
  description: string;
}


const UpdatePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [pageNotFound, setPageNotFound] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("landingPages");
    if (storedData) {
      const pages: LandingPage[] = JSON.parse(storedData);
      const page = pages.find((p) => p.id === Number(id));
      if (page) {
        setTitle(page.title);
        setDescription(page.description);
        setPageNotFound(false);
      } else {
        setPageNotFound(true);
      }
      setLandingPages(pages);
    }
  }, [id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedPages = landingPages.map((page) =>
      page.id === Number(id) ? { ...page, title, description } : page
    );
    setLandingPages(updatedPages);
    localStorage.setItem("landingPages", JSON.stringify(updatedPages));
    router.push("/");
  };

  if (pageNotFound) {
    return (
      <>
        <main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-purple-600">Hey!</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              It looks like this ID {`${id} doesn't exist.`}
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Please try with a valid one.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={"/"}
                className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
    <PageHeader title="Update"  rightContent={
          <button
            type="button"
            className="block rounded-md bg-purple-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            onClick={()=> router.push(`/view/${id}`)}
          >
            Preview
          </button>
        } />
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Instant Info Update
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Easily update your details with just a single click. Enjoy the
            convenience of keeping your information current without any hassle.
          </p>
        </div>
        <form
          className="mx-auto mt-16 max-w-xl sm:mt-20"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2.5">
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdatePage;
