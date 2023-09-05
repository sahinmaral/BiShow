import { FC } from "react";

const HomepageHeader: FC = () => {
  return (
    <div className="container mx-auto py-5 italic flex flex-col md:items-stretch items-center hover:cursor-default">
      <div className="flex justify-start">
        <h1 className="text-xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-2xl font-bold dark:text-white">
          <span className="text-cornflower-blue-500">Unutkan</span> bir{" "}
          <span className="text-cornflower-blue-500">aktivist</span> için
        </h1>
      </div>
      <div className="flex justify-end">
        <h1 className="text-xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-2xl font-bold dark:text-white">
          <span className="text-cornflower-blue-500">yol arkadaşlığı</span>{" "}
          sağlayacak uygulama
        </h1>
      </div>
    </div>
  );
};

export default HomepageHeader;
