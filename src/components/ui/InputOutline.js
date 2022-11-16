import * as React from "react"
import Svg, { Rect } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={334}
    height={80}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      opacity={0.2}
      x={0.5}
      y={0.5}
      width={333}
      height={79}
      rx={29.5}
      stroke="#000"
    />
  </Svg>
)

export default SvgComponent
