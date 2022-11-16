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
      d="M16.41 11.208c.24-.098.48.141.381.381l-1.285 3.123c-.149.36-.434.645-.794.793l-3.123 1.286a.292.292 0 0 1-.38-.38l1.286-3.124c.148-.36.433-.645.793-.793l3.123-1.286Z"
      fill="#42C83C"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.578 2.095c-.939-.084-2.086-.084-3.537-.084h-.082c-1.451 0-2.598 0-3.537.084-.964.086-1.77.264-2.533.655-.197.102-.39.213-.576.333-.72.465-1.277 1.074-1.834 1.866-.542.77-1.116 1.764-1.841 3.02l-.041.072c-.726 1.257-1.3 2.25-1.696 3.105-.408.878-.656 1.665-.699 2.521a6.71 6.71 0 0 0 0 .665c.043.856.291 1.644.699 2.522.397.855.97 1.848 1.696 3.105l.04.07c.726 1.258 1.3 2.25 1.842 3.022.557.792 1.114 1.4 1.834 1.866.187.12.379.23.576.332.762.391 1.569.57 2.533.656.939.084 2.086.084 3.537.084h.082c1.451 0 2.598 0 3.537-.084.964-.086 1.77-.265 2.533-.656.197-.101.39-.212.576-.332.72-.465 1.277-1.074 1.834-1.866.542-.771 1.116-1.764 1.841-3.021l.041-.071c.726-1.257 1.3-2.25 1.696-3.105.408-.878.656-1.666.699-2.522a6.71 6.71 0 0 0 0-.665c-.043-.855-.291-1.643-.699-2.521-.397-.855-.97-1.848-1.696-3.105l-.04-.071c-.726-1.257-1.3-2.25-1.842-3.021-.556-.792-1.114-1.401-1.834-1.866a6.71 6.71 0 0 0-.576-.333c-.762-.39-1.569-.57-2.533-.655Zm.832 10.16c.69-1.678-.987-3.356-2.665-2.665l-3.123 1.286a3.208 3.208 0 0 0-1.746 1.745L9.59 15.744c-.69 1.678.988 3.356 2.666 2.665l3.123-1.286a3.208 3.208 0 0 0 1.745-1.745l1.286-3.123Z"
      fill="#42C83C"
    />
  </Svg>
)

export default SvgComponent