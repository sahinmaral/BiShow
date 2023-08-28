import { FC } from "react";
import SlickListArrowProps from "../interfaces/SlickListArrowProps";


const SlickListPrevArrow: FC = (props: SlickListArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style}}
      onClick={onClick}
    />
  );
};

export default SlickListPrevArrow;
