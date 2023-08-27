import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const Footer: FC = () => (
  <footer className="bg-white p-2 shadow dark:bg-gray-800 border-t border-gray-200">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023. Bütün haklar saklıdır.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
        <li>
          <a
            href="https://www.linkedin.com/in/sahinmaral/"
            target="_blank"
            className="mr-4 md:mr-6 text-gray-500 dark:text-gray-400 hover:text-gray-800"
          >
            <FontAwesomeIcon icon={faLinkedinIn} size="lg"/>
          </a>
        </li>
        <li>
          <a
            href="https://www.github.com/sahinmaral"
            target="_blank"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-800"
          >
            <FontAwesomeIcon icon={faGithub} size="lg"/>
          </a>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
