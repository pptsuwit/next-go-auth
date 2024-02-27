import { useSearchParams } from "next/navigation";

export function getPage(defaultPage: string | number = 1, defaultPageSize: string | number = 10) {
  const result: IPage = {
    page: useSearchParams().get("page") || defaultPage?.toString(),
    size: useSearchParams().get("pageSize") || defaultPageSize?.toString(),
  };
  return result;
}
export function getModalMessage(type?: string, message?: string): IModalMessage {
  switch (type) {
    case "create_success":
      return {
        title: "Success",
        message: "Data creation successful.",
        status: "success",
      };
    case "update_success":
      return {
        title: "Success",
        message: "Data modification successful.",
        status: "success",
      };
    case "delete_success":
      return {
        title: "Success",
        message: "Data deletion successful.",
        status: "success",
      };

    case "create_error":
      return {
        title: "Error",
        message: "Data creation unsuccessful.",
        status: "error",
      };
    case "update_error":
      return {
        title: "Error",
        message: "Data modification unsuccessful.",
        status: "error",
      };
    case "delete_error":
      return {
        title: "Error",
        message: "Data deletion unsuccessful.",
        status: "error",
      };
    case "warn":
      return {
        title: "Warning",
        message: "",
        status: "warn",
      };
    case "error":
      return {
        title: "Error",
        message: message,
        status: "error",
      };
    default:
      return {
        title: "",
        message: "Something went wrong",
        status: "error",
      };
  }
}
export function getConfirmModalMessage(type: string) {
  switch (type) {
    case "delete_warning":
      return {
        title: "!Warning",
        message: "are you sure you want to delete this data?",
      };

    default:
      return {
        title: "",
        message: "Something went wrong",
      };
  }
}

export function isNull(value: any): boolean {
  if (value) return true;
  else return false;
  // return value === null || value === undefined || value === 0 || value === "";
}

export function getToken() {
  return localStorage.getItem(process.env.TOKEN_NAME as string);
}
const validate = (values: any) => {
  let errors: any = {};
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = "Phone number is required";
  } else if (!/^\d{10}$/.test(values.phoneNumber)) {
    errors.phoneNumber = "Invalid phone number, should be 10 digits";
  }
  return errors;
};
