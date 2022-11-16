import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

const LyricsButton = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Svg
        width={31}
        height={31}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M21.27 18.765a.969.969 0 0 0 1.376-1.364l-2.297-2.318c-.866-.873-1.573-1.587-2.203-2.093-.655-.526-1.32-.907-2.119-1.008a4.162 4.162 0 0 0-1.054 0c-.799.101-1.464.482-2.119 1.008-.63.506-1.337 1.22-2.203 2.093l-2.297 2.318a.969.969 0 0 0 1.376 1.364l2.257-2.277c.916-.924 1.546-1.558 2.08-1.987.52-.417.852-.56 1.15-.598.188-.024.378-.024.565 0 .299.038.632.181 1.15.598.535.43 1.165 1.063 2.081 1.987l2.257 2.277Z"
          fill="#414141"
        />
      </Svg>
      <Text style={{ fontSize: 14, fontFamily: "satoshi-medium" }}>Lyrics</Text>
    </View>
  );
};

export default LyricsButton;

const styles = StyleSheet.create({});
