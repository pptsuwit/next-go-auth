import {
  AiOutlineClose,
  AiFillExclamationCircle,
  AiFillMinusCircle,
} from "react-icons/ai";

interface IDialogProps {
  show: boolean;
  title: string;
  message: string;
  iconType: "warning" | "error" | "info" | string;
  confirm: (status: boolean) => void;
  cancle: () => void;
}
export default function Dialog(props: IDialogProps) {
  return (
    <>
      {props.show && (
        <div className="z-50 w-full h-full flex justify-center items-center overflow-y-auto overflow-x-hidden fixed bottom-[calc(100%-80%)]">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-2xl shadow-slate-400">
              <button
                onClick={props.cancle}
                type="button"
                className="absolute top-2 end-2.5 text-gray-400 hover:bg-gray-100 hover:text-gray-800   
                text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  rounded-full"
                data-modal-hide="popup-modal"
              >
                <AiOutlineClose fontSize={20} />
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                {props.iconType === "warning" && (
                  <AiFillExclamationCircle
                    className="mx-auto mb-4 text-warning"
                    fontSize={80}
                  />
                )}
                {props.iconType === "error" && (
                  <AiFillMinusCircle
                    className="mx-auto mb-4 text-danger"
                    fontSize={80}
                  />
                )}
                <h1 className="mb-5 text-3xl font-bold">{props.title}</h1>
                <h3 className="mb-5 text-lg font-normal ">{props.message}</h3>
                <button
                  onClick={() => props.confirm(true)}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-theme-500 hover:bg-theme-600  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                >
                  Confirm
                </button>
                <button
                  onClick={props.cancle}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-gray-50 bg-gray-500 hover:bg-gray-600 hover:text-white rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10  "
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
