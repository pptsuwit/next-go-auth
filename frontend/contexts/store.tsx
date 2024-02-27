"use client";
import { getModalMessage } from "@/utils/helpers";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type DataType = {
  firstName: string;
};
interface DialogState {
  show: boolean;
  title: string;
  message: string;
  iconType: string;
  confirm: (data?: any) => void;
  cancle: () => void;
}
interface ContextProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;

  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  modalMessage: IModalMessage;
  setModalMessage: Dispatch<SetStateAction<IModalMessage>>;

  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;

  drawer: boolean;
  setDrawer: Dispatch<SetStateAction<boolean>>;

  title: string;
  setTitle: Dispatch<SetStateAction<string>>;

  dialog: DialogState;
  setDialog: Dispatch<SetStateAction<DialogState>>;
}

const GlobalContext = createContext<ContextProps>({
  userId: "",
  setUserId: (): string => "",
  data: [],
  setData: (): DataType[] => [],
  modal: false,
  setModal: (): boolean => false,
  modalMessage: { title: "", message: "", status: "" },
  setModalMessage: (): IModalMessage => ({
    title: "",
    message: "",
    status: "",
  }),
  loading: false,
  setLoading: (): boolean => false,
  drawer: false,
  setDrawer: (): boolean => false,
  title: "",
  setTitle: (): string => "",

  dialog: {
    show: false,
    title: "",
    message: "",
    iconType: "",
    confirm: (): void => {},
    cancle: (): void => {},
  },
  setDialog: (): DialogState => ({
    show: false,
    title: "",
    message: "",
    iconType: "",
    confirm: (): void => {},
    cancle: (): void => {},
  }),
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState<DataType[] | []>([]);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(getModalMessage());
  const [loading, setLoading] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState("");
  const [dialog, setDialog] = useState({
    show: false,
    title: "",
    message: "",
    iconType: "warning",
    confirm: () => {},
    cancle: () => {
      setDialog((prev) => ({
        ...prev,
        show: false,
      }));
    },
  });
  return (
    <GlobalContext.Provider
      value={{
        userId,
        setUserId,
        data,
        setData,
        modal,
        setModal,
        modalMessage,
        setModalMessage,
        loading,
        setLoading,
        drawer,
        setDrawer,
        title,
        setTitle,
        dialog,
        setDialog,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
