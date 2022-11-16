import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const Button = ({ children, onPress, style, textStyle }) => {
  
  return (
    <View style={styles.rootContainer}>
      <Pressable onPress={onPress} style={({pressed})=> pressed && styles.pressed }>
        <View style={[styles.titleContainer, style]}>
          <Text style={[styles.title,textStyle ]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: "satoshi-bold",
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#42C83C",
    textAlignVertical: "center",
  },
  titleContainer: {
    width: 329,
    height: 92,
    alignSelf: "center",
    borderRadius: 30,
    overflow: "hidden",
  }, 
  rootContainer: {
    flex:1,
    overflow:'hidden',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
    //position: 'absolute',
    //top:5
  },
  pressed: {
    opacity: 0.5,
    color: '#0ac702'
  },
});
