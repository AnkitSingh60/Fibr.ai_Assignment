import React from "react"

type Props = {title: string; rightContent?: JSX.Element}

export default function PageHeader(props: Props) {
  return (
    <header className="shadow-md bg-whitw mb-[80px]">
      <div className="flex items-center justify-between mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-lg font-semibold leading-6 text-gray-900">
          {props.title}
        </h1>
        {props.rightContent && (
          <div className="flex md:mt-0 md:ml-4">{props.rightContent}</div>
        )}
      </div>
    </header>
  )
}
