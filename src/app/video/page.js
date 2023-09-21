import DisplayVideo from "./DisplayVideo";
import Nav from "@/app/components/Nav";

export default function page() {
  return (
    <>
      <Nav />
      <div className="w-screen h-screen flex items-center justify-center">
        <DisplayVideo />
      </div>
    </>
  );
}
