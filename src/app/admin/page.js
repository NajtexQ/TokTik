import AdminPage from "./AdminPage";

import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export default async function page() {
  const session = await getServerSession(authConfig);
  if (!session || !session.user.isAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return (
    <div>
      <AdminPage />
    </div>
  );
}
