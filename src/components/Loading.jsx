/* eslint-disable react/prop-types */
import { CgSpinnerTwo } from "react-icons/cg";

export default function Loading({ size, position }) {
  return (
    <span className={`mr-2  ${position}`}>
      <CgSpinnerTwo className={`${size}  text-gray-400 animate-spin`} />
    </span>
  );
}
