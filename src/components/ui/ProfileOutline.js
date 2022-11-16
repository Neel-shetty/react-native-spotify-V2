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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 1.458a5.542 5.542 0 1 0 0 11.084 5.542 5.542 0 0 0 0-11.084ZM10.208 7a3.792 3.792 0 1 1 7.583 0 3.792 3.792 0 0 1-7.583 0ZM10.5 14.292a5.542 5.542 0 0 0 0 11.083h7a5.542 5.542 0 1 0 0-11.083h-7Zm-3.792 5.541a3.792 3.792 0 0 1 3.792-3.791h7a3.792 3.792 0 1 1 0 7.583h-7a3.792 3.792 0 0 1-3.792-3.792Z"
      fill="gray"
    />
  </Svg>
)

export default SvgComponent
