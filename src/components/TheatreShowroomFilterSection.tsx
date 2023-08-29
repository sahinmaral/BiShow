import { FC, useEffect, useState } from "react";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TheatreShowroomFilterSection: FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setPageWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageWidth]);

  return (
    <div className={`${isOpened ? "h-[80px] " : ""}bg-purple-heart-300 rounded-lg p-4 w-full mt-10`}>
      <div className="flex md:hidden justify-between py-3 pe-1">
        <h1 className="text-xl font-semibold">Filtreleme</h1>
        <button
          className="text-slate-800"
          onClick={() => setIsOpened(!isOpened)}
        >
          <FontAwesomeIcon icon={faBars} size="xl" />
        </button>
      </div>
      <ul
        className={`${
            !isOpened || pageWidth > 768  ? "opacity-100" : "opacity-0 invisible"
          } transition-opacity duration-300 grid  md:grid-rows-1 grid-rows-4 md:grid-cols-4 grid-cols-1 font-medium text-gray-900 bg-purple-heart-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
      >
        <li className="px-4 py-3 w-full flex flex-col gap-5 border-r border-r-gray-400 group hover:cursor-pointer hover:bg-purple-heart-200">
          <div className="flex justify-between">
            <p className="group-hover:hidden">Şehir</p>{" "}
            <p className="hidden group-hover:block">Ankara</p>
          </div>
          <button className="bg-dolly-300 hover:bg-dolly-200 rounded-md py-2 w-full flex gap-4 justify-center items-center" onClick={() => alert("test")}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Ekle</span>
          </button>
        </li>
        <li className="px-4 py-3 w-full flex flex-col gap-5 border-r border-r-gray-400 group hover:cursor-pointer hover:bg-purple-heart-200">
          <div className="flex justify-between">
            <p className="group-hover:hidden">Mekan</p>{" "}
            <p className="hidden group-hover:block">Ankara</p>
          </div>
          <button className="group bg-dolly-300 hover:bg-dolly-200 rounded-md py-2 w-full flex gap-4 justify-center items-center">
            <FontAwesomeIcon icon={faPlus} />
            <span>Ekle</span>
          </button>
        </li>
        <li className="px-4 py-3 w-full flex flex-col gap-5 border-r border-r-gray-400 group hover:cursor-pointer hover:bg-purple-heart-200">
          <div className="flex justify-between">
            <p className="group-hover:hidden">Tür</p>{" "}
            <p className="hidden group-hover:block">Drama</p>
          </div>
          <button className="bg-dolly-300 hover:bg-dolly-200 rounded-md py-2 w-full flex gap-4 justify-center items-center">
            <FontAwesomeIcon icon={faPlus} />
            <span>Ara</span>
          </button>
        </li>
        <li className="px-4 py-3 w-full flex flex-col gap-5 group hover:cursor-pointer hover:bg-purple-heart-200">
          <div className="flex justify-between">
            <p className="group-hover:hidden">Tarih</p>{" "}
            <p className="hidden group-hover:block">18/05/2023</p>
          </div>
          <button className="group bg-dolly-300 hover:bg-dolly-200 rounded-md py-2 w-full flex gap-4 justify-center items-center">
            <FontAwesomeIcon icon={faPlus} />
            <span>Ara</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TheatreShowroomFilterSection;
