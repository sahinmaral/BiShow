import { FC, MouseEvent, ChangeEvent, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import ModalContent from "../types/ModalContentType";
import { useDispatch } from "react-redux";
import { setModalVisibilityToggle } from "../redux/app/appSlice";
import { v4 as uuidv4 } from "uuid";

type FilterActivityModalContentProps = {
  modalContent: ModalContent;
  updateActivityFilter: (value: string) => void;
};

const FilterActivityModalContent: FC<FilterActivityModalContentProps> = ({
  modalContent,
  updateActivityFilter,
}) => {
  const dispatch = useDispatch();

  const handleCloseModal = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(setModalVisibilityToggle());

    const targetElement = document.querySelector("html, body") as HTMLElement;
    targetElement.style.overflow = "auto";
  };

  const handleSelectOption = (event: ChangeEvent<HTMLInputElement>) => {
    const targetElement = event.target as HTMLInputElement;
    updateActivityFilter(targetElement.value);
  };

  const filterActivityData = useMemo(() => {
    return JSON.parse(modalContent.data) as string[];
  }, []);

  return (
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[400px] h-[500px] overflow-y-scroll">
      <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {modalContent.title}
        </h3>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={(event) => handleCloseModal(event)}
        >
          <FontAwesomeIcon icon={faClose} />
          <span className="sr-only">Close modal</span>
        </button>
      </div>

      <div className="p-6 space-y-6">
        {filterActivityData.map((item) => {
          return (
            <div className="flex items-center mb-4" key={uuidv4()}>
              <input
                type="radio"
                name="countries"
                id={`countries-${item}`}
                value={item}
                onChange={handleSelectOption}
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={`countries-${item}`}
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {item}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterActivityModalContent;
