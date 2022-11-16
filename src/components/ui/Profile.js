import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={28}
    height={28}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14 2.333a5.542 5.542 0 1 0 0 11.083 5.542 5.542 0 0 0 0-11.083ZM10.5 15.166a5.542 5.542 0 0 0 0 11.084h7a5.542 5.542 0 1 0 0-11.084h-7Z"
      fill="#42C83C"
    />
  </Svg>
)

export default SvgComponent
