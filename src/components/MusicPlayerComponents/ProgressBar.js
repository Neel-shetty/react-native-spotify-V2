import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import Slider from "@react-native-community/slider";
import { useRoute } from "@react-navigation/native";

const ProgressBar = () => {
  const width = Dimensions.get("window").width * 0.9;
  const widthProgress = Dimensions.get("window").width * 0.84;
  const route = useRoute()
  const duration = route.params.duration

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ flex: 0, alignItems: "center", justifyContent: "center" }}>
        <Progress.Bar
          progress={0}
          width={widthProgress}
          useNativeDriver={true}
          borderWidth={0}
          color="#434343"
          unfilledColor="rgba(0, 0, 0, 0.3)"
          height={4}
        />
        <Slider
          style={{ width: width, position: "relative", bottom: 11 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="rgba(0, 0, 0, 0)"
          maximumTrackTintColor="rgba(0, 0, 0, 0)"
          thumbTintColor="#434343"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: widthProgress,
          
        }}
      >
        <Text>0:00</Text>
        <Text>{duration}</Text>
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  bar: {
    width: Dimensions.get("window").width * 0.85,
    height: 2,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignSelf: "center",
    justifyContent: "center",
  },
});
