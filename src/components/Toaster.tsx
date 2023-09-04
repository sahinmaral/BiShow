import { FC, Fragment, useEffect, useMemo, useRef, useState } from "react";
import ToasterType from "../enums/ToasterTypeEnum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faCircleInfo,
  faCircleCheck,
  faCircleXmark,
  faCircleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import ToasterContext from "../types/ToasterContext";
import { useToaster } from "../context/ToasterProvider";
import clsx from "clsx";

type ToasterProps = {
  context: ToasterContext;
};

const Toaster: FC<ToasterProps> = ({ context }) => {
  const [maxDuration, setMaxDuration] = useState<number>(
    context.initialDuration
  );
  const [progress, setProgress] = useState<number>(context.initialDuration);

  const [icon, setIcon] = useState<IconDefinition>(faCircleInfo);

  const { clearToastr } = useToaster();

  const toasterRef = useRef<HTMLDivElement>(null);

  const classesOfComponents = useMemo(() => {
    const iconBackgroundClasses = {
      "bg-green-100 dark:bg-green-800":
        context.toastType === ToasterType.Success,
      "bg-blue-100 dark:bg-blue-800": context.toastType === ToasterType.Info,
      "bg-red-100 dark:bg-red-800": context.toastType === ToasterType.Danger,
      "bg-yellow-100 dark:bg-yellow-800":
        context.toastType === ToasterType.Warning,
      "bg-transparent-100 dark:bg-transparent-800": !context.toastType,
    };

    const iconClasses = {
      "text-green-500 dark:text-green-200":
        context.toastType === ToasterType.Success,
      "text-blue-500 dark:text-blue-200":
        context.toastType === ToasterType.Info,
      "text-yellow-500 dark:text-yellow-200":
        context.toastType === ToasterType.Danger,
      "text-red-500 dark:text-red-200":
        context.toastType === ToasterType.Warning,
      "text-transparent-500 dark:text-transparent-200": !context.toastType,
    };

    const progressBarClasses = {
      "h-1 opacity-30 transition-all duration-500 bg-green-600 dark:bg-green-800":
        context.toastType === ToasterType.Success,
      "h-1 opacity-30 transition-all duration-500 bg-blue-600 dark:bg-blue-800":
        context.toastType === ToasterType.Info,
      "h-1 opacity-30 transition-all duration-500 bg-red-600 dark:bg-red-800":
        context.toastType === ToasterType.Danger,
      "h-1 opacity-30 transition-all duration-500 bg-yellow-600 dark:bg-yellow-800":
        context.toastType === ToasterType.Warning,
      "h-1 opacity-30 transition-all duration-500 bg-transparent-600 dark:bg-transparent-800":
        true,
    };

    return { progressBarClasses, iconBackgroundClasses, iconClasses };
  }, [context]);

  const progressBarWidth = useMemo(() => {
    return (progress / maxDuration) * 100;
  }, [progress]);

  const setIconOfToaster = () => {
    switch (context.toastType) {
      case ToasterType.Success:
        setIcon(faCircleCheck);
        break;
      case ToasterType.Danger:
        setIcon(faCircleXmark);
        break;
      case ToasterType.Warning:
        setIcon(faCircleExclamation);
        break;
      case ToasterType.Info:
        setIcon(faCircleInfo);
        break;
      default:
        setIcon(faCircleInfo);
        break;
    }
  };

  useEffect(() => {
    if (progress > 0) {
      if (!toasterRef.current?.classList.contains("z-10")) {
        toasterRef.current?.classList.add("z-10");
        toasterRef.current?.classList.remove("-z-10");
      }
      const timerId = setInterval(() => {
        setProgress((prevTime) => prevTime - 1000);
      }, 1000);

      return () => {
        clearInterval(timerId);
      };
    } else {
      clearToastr();
      toasterRef.current?.classList.add("-z-10");
      toasterRef.current?.classList.remove("z-10");
    }
  }, [progress]);

  useEffect(() => {
    setIconOfToaster();
    setMaxDuration(context.initialDuration);
    setProgress(context.initialDuration);
  }, [context.initialDuration]);

  return (
    <Fragment>
      <div
        ref={toasterRef}
        className={`fixed flex flex-col transition-opacity duration-300 ${
          progress === 0 ? "opacity-0" : "opacity-100"
        } bottom-5 right-5 w-full max-w-xs pt-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`}
      >
        <div className="flex items-center pb-4 px-4">
          <div
            className={clsx(
              `!transition-none inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg`,
              classesOfComponents.iconBackgroundClasses
            )}
          >
            <FontAwesomeIcon
              icon={icon}
              className={clsx(classesOfComponents.iconClasses)}
            />
          </div>
          <div className="ml-3 text-sm font-normal">{context.message}</div>
          <button
            onClick={() => setProgress(0)}
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className={`w-full bg-gray-200 h-1 dark:bg-gray-700`}>
          <div
            className={clsx(classesOfComponents.progressBarClasses)}
            style={{ width: `${progressBarWidth}%` }}
          ></div>
        </div>
      </div>
    </Fragment>
  );
};

export default Toaster;
