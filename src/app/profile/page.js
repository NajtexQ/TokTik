import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authConfig);

  if (!session) {
    return redirect("/signin");
  } else {
    return redirect("/profile/" + session.user.username);
  }
}
