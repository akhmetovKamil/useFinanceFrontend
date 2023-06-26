import LoadingIcons from "react-loading-icons";
import { LoadingIconProps } from "./LoadingIcon.props";

const LoadingIcon = ({ width, ...props }: LoadingIconProps) => (
  <div {...props}>
    <LoadingIcons.Grid width={width} />
  </div>
);
export default LoadingIcon;
