import { FiAlertTriangle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { verificationTokenAction } from "../../../redux/slices/verification/verificationSlices";

export default function AccountVerificationAlert() {
  const dispatch = useDispatch();

  return (
    <div className="bg-green-500 border-l-4 border-yellow-400 p-1">
      <div className="flex">
        <div className="flex-shrink-0">
          <FiAlertTriangle
            className="h-5 w-5 text-yellow-500"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-200">
            Your account is not verified.{" "}
            <button
              onClick={() => dispatch(verificationTokenAction())}
              className="font-medium underline text-green-200 hover:text-yellow-600"
            >
              Click this link to verify
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
