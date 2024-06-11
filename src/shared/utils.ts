import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

let classNames = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const sliceText = (text: any, maxCharacters: number) => {
  if (text.length > maxCharacters) {
    return `${text.slice(0, maxCharacters - 3)}...`
  }

  return text
}

const generatePageTitle = (title: string) => {
  return `${title} | Fibr.ai`;
};

export { classNames,sliceText, generatePageTitle};
