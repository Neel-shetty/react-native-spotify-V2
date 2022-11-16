import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM10.5 3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM10.5 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      stroke="#7D7D7D"
      strokeWidth={1.5}
    />
  </Svg>
)

export default SvgComponent
