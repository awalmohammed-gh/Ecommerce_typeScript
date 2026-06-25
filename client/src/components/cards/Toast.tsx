import { X } from "lucide-react";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

export const Toast = ({ message, type, onClose }: ToastProps) => {
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white`}
    >
      <div className="flex items-center gap-4">
        <span>{message}</span>

        <button onClick={onClose}><X className="size-4"/></button>
      </div>
    </div>
  );
};
