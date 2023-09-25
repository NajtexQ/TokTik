import AdminPage from "./AdminPage";

import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

import getReports from "../actions/reports/getReports";

import { redirect } from "next/navigation";

import getCurrentUser from "../actions/getCurrentUser";

export default async function page() {
  const session = await getServerSession(authConfig);
  if (!session) {
    return redirect("/signin");
  }

  const user = await getCurrentUser();

  if (!user.isAdmin) {
    console.log("Not admin");
    return redirect("/home");
  }

  console.log("Fetching reports");

  const reports = await getReports();

  console.log(reports);

  return (
    <div>
      <AdminPage reports={reports} />
    </div>
  );
}
