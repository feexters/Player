import * as React from 'react';
import Svg, {SvgProps, Mask, Path, G} from 'react-native-svg';

function PlusIcon(props: SvgProps) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      //   xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Mask
        id="prefix__a"
        // maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={22}
        height={22}>
        <Path
          d="M10 21a1 1 0 102 0v-9h9a1 1 0 100-2h-9V1a1 1 0 10-2 0v9H1a1 1 0 100 2h9v9z"
          fill="#72A8BC"
        />
      </Mask>
      <G mask="url(#prefix__a)">
        <Path fill="#72A8BC" d="M-1-1h24v24H-1z" />
      </G>
    </Svg>
  );
}

export default PlusIcon;
