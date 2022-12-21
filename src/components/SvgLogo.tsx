import * as React from "react";
import Svg, { Path, Ellipse } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
};

function SvgLogo({ width = 96, height = 64, ...rest }: Props) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 96 64"
      fill="none"
      {...rest}
    >
      <Path
        d="M30.154 45.666c-10.244 1.875-17.594 1.479-18.666-1.53-1.691-4.743 12.857-14.183 32.495-21.085C63.62 16.149 80.91 14.398 82.6 19.14c1.08 3.027-4.456 7.968-13.709 12.941"
        stroke="#364D9D"
        strokeWidth={2}
      />
      <Ellipse
        cx={46.4646}
        cy={30.8596}
        rx={22.9368}
        ry={22.7755}
        fill="#364D9D"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.76 23.912c0-.915.747-1.656 1.669-1.656h18.35c.92 0 1.667.741 1.667 1.656V38.82c0 .914-.747 1.656-1.668 1.656h-18.35a1.662 1.662 0 01-1.667-1.656V23.912zm20.018 0h-18.35V38.82h18.35V23.912z"
        fill="#EDECEE"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.76 26.397c0-.458.374-.829.835-.829h20.017c.46 0 .834.371.834.829a.831.831 0 01-.834.828H36.595a.831.831 0 01-.834-.828zM42.433 28.881c.46 0 .834.371.834.828a3.3 3.3 0 00.977 2.343c.626.621 1.475.97 2.36.97.884 0 1.733-.349 2.358-.97a3.3 3.3 0 00.978-2.343c0-.457.373-.828.834-.828.46 0 .834.371.834.828a4.952 4.952 0 01-1.466 3.514 5.022 5.022 0 01-3.539 1.456c-1.327 0-2.6-.524-3.538-1.456a4.951 4.951 0 01-1.466-3.514c0-.457.373-.828.834-.828z"
        fill="#EDECEE"
      />
      <Path
        d="M30.154 45.666c1.728-.316 3.539-.697 5.416-1.141M68.89 32.082a110.49 110.49 0 01-5.606 2.802"
        stroke="#F7F7F8"
        strokeWidth={2}
      />
    </Svg>
  );
}

export default SvgLogo;
