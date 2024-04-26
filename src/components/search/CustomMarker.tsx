import { useEffect } from "react";
import type { Coordinate } from "@yext/types";
import { Coordinate as CoordinateClass } from "@yext/components-tsx-geo";
import { Marker, useMapContext } from "@yext/pages-components";
import { useLocator } from "src/components/search/utils/useLocator";

type CustomMarkerProps = {
  coordinate: Coordinate;
  id: string;
  index: number;
};

const CustomMarker = (props: CustomMarkerProps) => {
  const {
    selectedId,
    setSelectedId,
    hoveredId,
    setHoveredId,
    focusedId,
    setFocusedId,
  } = useLocator();

  const { coordinate, id, index } = props;
  const selected = id === selectedId;
  const focused = id === focusedId;
  const hovered = id === hoveredId;
  const map = useMapContext();

  // If a marker is offscreen when its corresponding LocatorCard is clicked, pan the map to be centered on the marker
  useEffect(() => {
    if (selectedId === id) {
      if (!map.getBounds().contains(new CoordinateClass(coordinate))) {
        map.setCenter(coordinate, true);
      }
    }
  }, [selectedId, id, coordinate, map]);

  return (
    <Marker
      coordinate={coordinate}
      id={id}
      onClick={setSelectedId}
      onFocus={(focused, id) => setFocusedId(focused ? id : "")}
      onHover={(hovered, id) => setHoveredId(hovered ? id : "")}
      zIndex={selected ? 1 : hovered || focused ? 2 : 0}
    >
      <MapPin
        backgroundColor={selected || hovered || focused ? "#C6AB76" : "black"}
        textColor={selected || hovered || focused ? "black" : "white"}
        index={index}
        height={selected ? 57 : 49}
        width={selected ? 33 : 29}
      />
    </Marker>
  );
};

type MapPinProps = {
  backgroundColor?: string;
  height: number;
  index: number;
  textColor?: string;
  width: number;
};

const MapPin = (props: MapPinProps) => {
  const { backgroundColor, height, index, textColor, width } = props;
  return (
    <svg
      width="28px"
      height="48px"
      viewBox="0 0 28 48"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g
        id="Typography"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeOpacity="0.5"
      >
        <g
          id="Elements/Buttons/MapPins/Pins/Locator/Ace/Normal"
          fill="#000000"
          fillRule="nonzero"
          stroke="#000000"
        >
          <path
            fill={backgroundColor ? backgroundColor : "black"}
            fillRule="nonzero"
            d="M14,0.5 C10.1428571,0.5 6.76516504,1.94194174 4.35355339,4.35355339 C1.94194174,6.76516504 0.5,10.1428571 0.5,14 C0.5,18.2222007 2.81127298,21.5200673 5.43664938,25.3306779 C9.01817614,30.5290958 13.2123628,36.6381179 14.5001928,46.9861165 C14.7876372,36.6381179 18.9818239,30.5290958 22.5633506,25.3306779 C25.188727,21.5200673 27.5,18.2222007 27.5,14 C27.5,10.1428571 26.0580583,6.76516504 23.6464466,4.35355339 C21.234835,1.94194174 17.8571429,0.5 14,0.5 Z"
            id="Background"
          ></path>
          <text
            fill={textColor ? textColor : "white"}
            fontFamily="Arial-BoldMT,Arial"
            fontSize="14"
            fontWeight="bold"
          >
            <tspan x="50%" y="18" textAnchor="middle">
              {index}
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  );
};

export default CustomMarker;
