import React from 'react';
import Svg, { Path } from 'react-native-svg';

import mapSatellitePng from './map_satellite.png';
import mapStandardPng from './map_standard.png';
import mapTerrainPng from './map_terrain.png';

export { mapSatellitePng, mapStandardPng, mapTerrainPng }

export const SearchSvg = () => {
    return (
      <Svg
        fill="none"
        width={24}
        height={24}
        stroke="#1e40af"
        viewBox="0 0 24 24"
        strokeWidth={3}
        >
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </Svg>
    );
  };
  
export const HistorySvg = () => {
    return (
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={2}
        stroke="#52525b"
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M3 3v5h5" />
        <Path d="M3.05 13A9 9 0 106 5.3L3 8" />
        <Path d="M12 7v5l4 2" />
      </Svg>
    );
}

export const MyLocationSvg = () => {
  return (
    <Svg width="24px" height="24px" viewBox="0 0 24 24">
      <Path
        d="M12 2a.75.75 0 01.743.648l.007.102v1.788a7.5 7.5 0 016.713 6.715l.037-.003h1.75a.75.75 0 01.102 1.493l-.102.007-1.788-.001a7.5 7.5 0 01-6.715 6.714l.003.037v1.75a.75.75 0 01-1.493.102l-.007-.102.001-1.788a7.5 7.5 0 01-6.714-6.715l-.037.003H2.75a.75.75 0 01-.102-1.493l.102-.007h1.788a7.5 7.5 0 016.715-6.713L11.25 4.5V2.75A.75.75 0 0112 2zm0 4a6 6 0 100 12 6 6 0 000-12zm0 2a4 4 0 110 8 4 4 0 010-8z"
        fill="#212121"
        fillRule="nonzero"
        stroke="none"
        strokeWidth={1}
      />
    </Svg>
  );
};

export const MapTypeSvg = () => {
  return (
    <Svg width="20px" height="20px" viewBox="0 0 16 16">
      <Path fill="none" d="M0 0H16V16H0z" />
      <Path
        fill="#212121"
        d="M8 9L0 5l8-4 8 4-8 4zm6.397-1.8L16 8l-8 4-8-4 1.603-.8L8 10.397 14.397 7.2zm0 3L16 11l-8 4-8-4 1.603-.8L8 13.397l6.397-3.197z"
      />
    </Svg>
  );
};

export const CloseSvg= () => {
  return (
    <Svg
      width="24px" 
      height="24px"
      x="0px"
      y="0px"
      viewBox="0 0 378.303 378.303"
    >
      <Path
        d="M378.303 28.285L350.018 0 189.151 160.867 28.285 0 0 28.285 160.867 189.151 0 350.018 28.285 378.302 189.151 217.436 350.018 378.302 378.303 350.018 217.436 189.151z"
        fill="#ff3501"
      />
    </Svg>
  )
}