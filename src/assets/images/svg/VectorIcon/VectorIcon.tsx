import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function VectorIcon(props: SvgProps) {
  return (
    <Svg
      width={14}
      height={13}
      viewBox="0 0 14 13"
      fill="none"
      //   xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M13 1L4.75 12 1 7"
        stroke="#514D47"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default VectorIcon;
