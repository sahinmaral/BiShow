import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-1/2 h-[calc(100vh-80px)] flex items-center justify-center">
      <FontAwesomeIcon className="text-6xl text-cornflower-blue-500" icon={faSpinner} spin />
    </div>
  );
};

export default Loading;
