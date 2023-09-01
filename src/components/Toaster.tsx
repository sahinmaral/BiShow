import { FC, Fragment, useEffect, useMemo, useState } from "react";
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

type ToasterProps = {
  context: ToasterContext;
};

type ToasterComponentsClassStates = {
  iconBackground: string;
  progressBar: string;
  icon: string;
};


const Toaster: FC<ToasterProps> = ({ context }) => {
  const [maxDuration, setMaxDuration] = useState<number>(
    context.initialDuration
  );
  const [progress, setProgress] = useState<number>(context.initialDuration);

  const [icon, setIcon] = useState<IconDefinition>(faCircleInfo);

  const initialData = {
    iconBackground:
      "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-transparent-100 rounded-lg dark:bg-transparent-800",
    icon: "text-transparent-500 dark:text-transparent-200",
    progressBar:
      "bg-transparent-600 h-1 opacity-30 transition-all duration-500",
  };

  const [toasterComponentsClassStates, setToasterComponentsClassStates] =
    useState<ToasterComponentsClassStates>(initialData);

  const { clearToastr } = useToaster();

  const progressBarWidth = useMemo(() => {
    return (progress / maxDuration) * 100;
  }, [progress]);

  const setColorOfEveryToasterComponents = (color: string) => {
    const updatedStates: ToasterComponentsClassStates = {
      iconBackground: initialData.iconBackground.replaceAll(
        "transparent",
        color
      ),
      icon: initialData.icon.replace("transparent", color),
      progressBar: initialData.progressBar.replaceAll("transparent", color),
    };

    setToasterComponentsClassStates({...updatedStates});
  };

  const renderByToasterType = () => {
    switch (context.toastType) {
      case ToasterType.SUCCESS:
        setColorOfEveryToasterComponents("green");
        setIcon(faCircleCheck);
        break;
      case ToasterType.DANGER:
        setColorOfEveryToasterComponents("red");
        setIcon(faCircleXmark);
        break;
      case ToasterType.WARNING:
        setColorOfEveryToasterComponents("yellow");
        setIcon(faCircleExclamation);
        break;
      case ToasterType.INFO:
        setColorOfEveryToasterComponents("blue");
        setIcon(faCircleInfo);
        break;
      default:
        setColorOfEveryToasterComponents("transparent");
        setIcon(faCircleInfo);
        break;
    }
  };

  useEffect(() => {
    if (progress > 0) {
      const timerId = setInterval(() => {
        setProgress((prevTime) => prevTime - 1000);
      }, 1000);

      return () => {
        clearInterval(timerId);
      };
    } else {
      clearToastr();
    }
  }, [progress]);

  useEffect(() => {
    renderByToasterType();
    setMaxDuration(context.initialDuration);
    setProgress(context.initialDuration);
  }, [context.initialDuration]);

  return (
    <Fragment>
      <div
        className={`fixed flex flex-col transition-opacity duration-300 ${
          progress === 0 ? "opacity-0" : "opacity-100"
        } bottom-7 right-7 w-full max-w-xs pt-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`}
      >
        <div className="flex items-center pb-4 px-4">
          <div className={toasterComponentsClassStates.iconBackground}>
            <FontAwesomeIcon
              icon={icon}
              className={toasterComponentsClassStates.icon}
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
            className={toasterComponentsClassStates.progressBar}
            style={{ width: `${progressBarWidth}%` }}
          ></div>
        </div>
      </div>
    </Fragment>
  );
};

export default Toaster;
