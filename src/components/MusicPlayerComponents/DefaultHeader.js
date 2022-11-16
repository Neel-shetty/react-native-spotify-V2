import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import BackArrow from "../../components/ui/backArrow";
import MenuDots from "../../components/ui/MenuDots";
import { useNavigation } from "@react-navigation/native";

const DefaultHeader = () => {
  const navigation = useNavigation()
  const padding =(Dimensions.get("window").width) - (Dimensions.get("window").width * 0.95)
  function BackButton() {
    navigation.navigate("HomeScreen");
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: padding
      }}
    >
      <View style={styles.backButtonContiner}>
        <TouchableOpacity onPress={BackButton}>
          <Image
            source={require("../../../assets/images/Ellipse.png")}
            style={styles.backButton}
          />
          <BackArrow style={styles.backArrow} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Now Playing</Text>
      <MenuDots />
    </View>
  );
};

export default DefaultHeader;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: "satoshi-bold",
  },
  backButtonContiner: {
    //flex: 1,
    //paddingLeft: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "center",
    //flexDirection: 'row'
  },
  backArrow: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    bottom: 15,
  },
  backButton: {
    top: 13,
    //right: 3,
  },
});
