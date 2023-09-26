import Image from "next/image";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authConfig);

  if (!session) {
    return redirect("/signin");
  } else {
    return redirect("/home");
  }
}
