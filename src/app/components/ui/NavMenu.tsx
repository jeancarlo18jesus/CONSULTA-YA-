"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { items_menu } from "@/seed";




export const NavMenu = ({items_1, items_2, items_3}:{items_1:items_menu, items_2:items_menu, items_3:items_menu}) => {
  const pathName = usePathname();
  return ( 
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <span className="text-xl font-bold">CERTUS</span>
      </div>
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          <Link
            href={items_1.href}
            className={` ${clsx`${
              pathName === items_1.href ? "text-[#f31260]" : "text-white"
            }`} hover:text-[#f31260]px-3 py-2 rounded-md text-sm font-semibold `}
          >
            {items_1.title}
          </Link>
          <Link
            href={items_2.href}
            className={` ${clsx`${
              pathName === items_2.href ? "text-[#f31260]" : "text-white"
            }`} hover:text-[#f31260] px-3 py-2 rounded-md text-sm font-semibold `}
          >
            {items_2.title}
          </Link>
          
          <Link
            href={items_3.href}
            className={` ${clsx`${
              pathName === items_3.href? "text-[#f31260]" : "text-white"
            }`} hover:text-[#f31260] px-3 py-2 rounded-md text-sm font-semibold `}
          >
            {items_3.title}
          </Link>
      
        </div>
      </div>
    </div>
  );
};
