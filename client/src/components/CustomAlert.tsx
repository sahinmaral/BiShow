import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import AlertTypeEnum from "../enums/AlertTypeEnum";

type ClassesOfComponent = {
  containerClass: string;
  iconClass: string;
};

type CustomAlertProps = {
  message: string;
  alertType: AlertTypeEnum;
};

const CustomAlert: FC<CustomAlertProps> = ({ message, alertType }) => {
  const [classesOfComponents, setClassesOfComponents] =
    useState<ClassesOfComponent>({
      containerClass: "mt-5 flex items-center p-4 mb-4 gap-3 text-lg rounded-lg",
      iconClass: "",
    });

  const [mainTitle, setMainTitle] = useState<string>("");

  const setClassesByAlertType = () => {
    let colorClass = "";

    switch (alertType) {
      case AlertTypeEnum.Info:
        colorClass =
          "text-blue-800 bg-blue-50 dark:bg-blue-800 dark:text-blue-400";
        setMainTitle("Bilgi !")
        break;
      case AlertTypeEnum.Danger:
        colorClass = "text-red-800 bg-red-50 dark:bg-red-800 dark:text-red-400";
        setMainTitle("Hata !")
        break;
      case AlertTypeEnum.Warning:
        colorClass =
          "text-yellow-800 bg-yellow-50 dark:bg-yellow-800 dark:text-yellow-400";
          setMainTitle("Uyarı !")
        break;
      case AlertTypeEnum.Success:
        colorClass =
          "text-green-800 bg-green-50 dark:bg-green-800 dark:text-green-400";
          setMainTitle("Başarılı !")
        break;
      default:
        break;
    }

    setClassesOfComponents({
      containerClass: `${classesOfComponents.containerClass} ${colorClass}`,
      iconClass: classesOfComponents.iconClass,
    });
  };

  useEffect(() => {
    setClassesByAlertType();
  }, [alertType]);

  return (
    <div className={classesOfComponents.containerClass}>
      <FontAwesomeIcon
        icon={faExclamationCircle}
        className={classesOfComponents.iconClass}
      />
      <div>
        <span className="font-medium">{mainTitle}</span> {message}
      </div>
    </div>
  );
};

export default CustomAlert;
