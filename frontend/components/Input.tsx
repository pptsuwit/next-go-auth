import { ChangeHandler, RefCallBack } from "react-hook-form";

interface Props {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  register?: HookRegister;
  errors?: any;
  className?: string;
}
interface HookRegister {
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  ref: RefCallBack;
  name: string;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function Input(props: Props) {
  return (
    <div>
      <input
        className={`w-full py-2 px-3 shadow 
        focus:outline-none focus:border-theme-400 focus:border-2 border rounded 
        text-gray-700
        bg-white ${props.className}`}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        {...props.register}
      ></input>
      {props.errors?.[props.name] && (
        <p className="text-red-500 text-sm">
          {props.errors?.[props.name]?.message}
        </p>
      )}
    </div>
  );
}
