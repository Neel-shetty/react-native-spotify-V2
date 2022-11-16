import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.458.26C5.85.26 1.302 4.808 1.302 10.417s4.547 10.156 10.156 10.156c5.61 0 10.156-4.547 10.156-10.156C21.614 4.807 17.067.26 11.458.26ZM2.864 10.417a8.594 8.594 0 1 1 17.188 0 8.594 8.594 0 0 1-17.188 0Z"
      fill="#7D7D7D"
    />
    <Path
      d="M20.344 18.198a.781.781 0 0 0-1.105 1.105l4.167 4.166a.781.781 0 1 0 1.105-1.105l-4.167-4.166Z"
      fill="#7D7D7D"
    />
  </Svg>
)

export default SvgComponent
