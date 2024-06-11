import {Toaster, resolveValue} from "react-hot-toast"
import React from "react"
import {CheckIcon, LifebuoyIcon, XMarkIcon} from "@heroicons/react/24/outline"
import {classNames} from "@/shared/utils"

export default function ToastContainer() {
  return (
    <Toaster position="top-right" reverseOrder={false}>
      {toast => {
        return (
          <>
            <div
              className={classNames(`${
                toast.visible ? "animate-enter" : "animate-leave"
              }  max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto
               ring-1 ring-black ring-opacity-5 overflow-hidden dark:border-gray-600 dark:bg-gray-700`)}>
              <div className="p-4">
                <div className="flex items-center">
                  {toast.type ? (
                    <div className="flex-shrink-0 mr-2">
                      {toast.type === "success" ? (
                        <CheckIcon
                          className="h-6 w-6 text-green-400"
                          aria-hidden="true"
                        />
                      ) : toast.type === "error" ? (
                        <LifebuoyIcon
                          className="h-6 w-6 text-red-400"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                  ) : null}
                  <div className="w-0 flex-1 flex justify-between">
                    <p className="w-0 flex-1 text-sm font-medium text-gray-900 dark:text-gray-200">
                      {resolveValue(toast.message, toast)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }}
    </Toaster>
  )
}

export {ToastContainer}
