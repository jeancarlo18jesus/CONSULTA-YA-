import { PagePendientes } from "@/app/components";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "PENDIENTES",
    description: "Generated by create next app",
  };

export default function Page() {
    return (
        <>
         <PagePendientes/>
        </>
    )
}