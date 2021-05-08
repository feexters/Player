import * as React from 'react';
import Svg, {Mask, Path, G} from 'react-native-svg';

function UserIcon({color = '#72A8BC'}) {
  return (
    <Svg width={17} height={20} viewBox="0 0 17 20" fill="none">
      <Mask id="prefix__a" x={0} y={0} width={17} height={20}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.5 0a5 5 0 100 10 5 5 0 000-10zm-3 5a3 3 0 116 0 3 3 0 01-6 0zM5 12a5 5 0 00-5 5v2a1 1 0 102 0v-2a3 3 0 013-3h7a3 3 0 013 3v2a1 1 0 102 0v-2a5 5 0 00-5-5H5z"
          fill={color}
        />
      </Mask>
      <G mask="url(#prefix__a)">
        <Path fill={color} d="M-4-2h24v24H-4z" />
      </G>
    </Svg>
  );
}

export default UserIcon;
