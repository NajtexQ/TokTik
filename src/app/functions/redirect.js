import { redirect as redirectServer } from "next/dist/server/api-utils";

export default function redirect(path) {
  return redirectServer(path);
}
