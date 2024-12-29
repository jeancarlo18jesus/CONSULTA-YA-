import { PageLogin } from "@/app/components";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "LOGIN",
};

export default async function PageLoginEstudiante({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  if (slug !== "estudiante" && slug !== "trabajador") {
    redirect("/role"); // Redirige al usuario a /role si el slug no es válido
  }

  return <PageLogin slug={slug} />;
  
}


