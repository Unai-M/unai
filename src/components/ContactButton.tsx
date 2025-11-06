import { Contact } from "lucide-react";

export default function ContactButton() {
  return (
    <div
      onClick={() => {
        alert("contact");
      }}
      className="cursor-pointer"
    >
      <Contact strokeWidth={1.5} />
    </div>
  );
}
