import { Loader } from "lucide-react";

export default function Laoding() {
  return (
    <div className="bg-accent/10 fixed inset-0 flex h-screen w-full items-center justify-center">
      <div className="animate-spin">
        <Loader />
      </div>
    </div>
  );
}
