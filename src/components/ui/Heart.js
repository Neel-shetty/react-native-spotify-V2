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
      d="M23.697 5.204c-2.724-2.777-5.877-1.606-7.83-.367-1.103.7-2.631.7-3.735 0-1.952-1.239-5.106-2.41-7.829.367C-2.16 11.797 8.925 24.5 14 24.5c5.075 0 16.161-12.703 9.697-19.296Z"
      fill="#42C83C"
    />
  </Svg>
)

export default SvgComponent
