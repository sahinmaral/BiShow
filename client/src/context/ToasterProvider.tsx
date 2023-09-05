import { FC, createContext, useContext, useState } from "react";
import Toaster from "../components/Toaster";
import ToasterContext from "../types/ToasterContext";
import ToasterType from "../enums/ToasterTypeEnum";

type ToasterContainerProps = {
  children: JSX.Element;
};

type ToasterContextType = {
  context: ToasterContext;
  clearToastr : () => void;
  setInfoWithContext: (context: ToasterContext) => void;
  setDangerWithContext: (context: ToasterContext) => void;
  setWarningWithContext: (context: ToasterContext) => void;
  setSuccessWithContext: (context: ToasterContext) => void;
  setInfoWithMessage: (message: string) => void;
  setDangerWithMessage: (message: string) => void;
  setWarningWithMessage: (message: string) => void;
  setSuccessWithMessage: (message: string) => void;
};

const ToasterContext = createContext<ToasterContextType | null>(null);

const ToasterProvider: FC<ToasterContainerProps> = (props) => {
  const initialData = {
    message: "",
    initialDuration: 0,
  };

  const [context, setContext] = useState<ToasterContext>(initialData);

  const setInfoWithContext = (context: ToasterContext) => {
    context.toastType = ToasterType.Info;
    setContext(context);
  };

  const setDangerWithContext = (context: ToasterContext) => {
    context.toastType = ToasterType.Danger;
    setContext(context);
  };

  const setWarningWithContext = (context: ToasterContext) => {
    context.toastType = ToasterType.Warning;
    setContext(context);
  };

  const setSuccessWithContext = (context: ToasterContext) => {
    context.toastType = ToasterType.Success;
    setContext(context);
  };

  const setInfoWithMessage = (message: string) => {
    setContext({
      ...context,
      message: message,
      initialDuration: 5000,
      toastType: ToasterType.Info,
    });
  };

  const setDangerWithMessage = (message: string) => {
    setContext({
      ...context,
      message: message,
      initialDuration: 5000,
      toastType: ToasterType.Danger,
    });
  };

  const setWarningWithMessage = (message: string) => {
    setContext({
      ...context,
      message: message,
      initialDuration: 5000,
      toastType: ToasterType.Warning,
    });
  };

  const setSuccessWithMessage = (message: string) => {
    setContext({
      ...context,
      message: message,
      initialDuration: 5000,
      toastType: ToasterType.Success,
    });
  };

  const clearToastr = () => {
    setContext(initialData);
  };

  return (
    <ToasterContext.Provider
      value={{
        context,
        clearToastr,
        setInfoWithContext,
        setDangerWithContext,
        setWarningWithContext,
        setSuccessWithContext,
        setInfoWithMessage,
        setDangerWithMessage,
        setWarningWithMessage,
        setSuccessWithMessage,
      }}
    >
      {props.children}
      <Toaster context={context} />
    </ToasterContext.Provider>
  );
};

export const useToaster = () => {
  const context = useContext(ToasterContext);

  if (!context) {
    throw new Error("useToaster must be used within a ToasterProvider");
  }

  return context;
};

export default ToasterProvider;
