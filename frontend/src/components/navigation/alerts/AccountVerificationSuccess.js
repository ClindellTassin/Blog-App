import { AiOutlineCheckCircle } from "react-icons/ai";

export default function AccountVerificationSuccess() {
  return (
    <div className="rounded-md bg-green-50 p-1">
      <div className="flex">
        <div className="flex-shrink-0">
          <AiOutlineCheckCircle
            className="h-5 w-5 text-green-500"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-500">
            Email is successfully sent to your Email
          </p>
        </div>
      </div>
    </div>
  );
}
