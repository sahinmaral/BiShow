import { FC } from "react";

type ActivitySavePopoverProps = {
  clearFocusedSeanceUrl: () => void;
};

const ActivitySavePopover: FC<ActivitySavePopoverProps> = ({
  clearFocusedSeanceUrl,
}) => {
  return (
    <div className="absolute right-[110%] -top-10 z-10 inline-block w-64 text-sm text-gray-500  bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
      <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Bilet Kaydetme
        </h3>
      </div>
      <div className="px-3 py-2">
        <p>Bu seansı satın aldınız mı ?</p>
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            Evet
          </button>
          <button
            type="button"
            onClick={() => {
              clearFocusedSeanceUrl();
            }}
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Hayır
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivitySavePopover;
