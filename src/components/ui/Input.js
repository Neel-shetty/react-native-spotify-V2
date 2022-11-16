import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import InputOutline from "./InputOutline";

const Input = ({
  onChangeText,
  onBlur,
  value,
  secureTextEntry,
  placeholder,
  keyboardType,
  style,
  error,
  isSubmitting
}) => {
  //const [red, setRed] = useState(false);
  //var errors = error
  //console.log(error.password);
  //console.warn(isSubmitting)
  /* if (
    error.password === "Required!" ||
    error.username === "Required!" ||
    error.password === "Must include atleast 1 uppercase letter" ||
    error.password === "must include atleast 1 number" ||
    error.password === "Too Long!" ||
    error.password === "Too Short!" ||
    error.username === "too long, didn't ask your mum's body count" ||
    error.username === "Too short, like your pp :)"
  ) {
    var isError = true
    //console.log(isError);
  } else {
    var isError = false
    //console.log(isError);
  }

  if(isSubmitting===true){
    setRed(isError)
  }
 */
  
  return (
    <>
      <View>
        <View style={styles.rootContainer}>
          <View style={styles.outline}>
            <InputOutline />
          </View>
          <TextInput
            placeholder={placeholder}
            style={styles.input}
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            spellCheck={false}
            autoCorrect={false}
          />
        </View>
      </View>
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    alignSelf: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    width: 333,
    height: 80,
    borderColor: "red",
    borderRadius: 30,
    fontSize: 18,
    fontFamily: "satoshi-medium",
    paddingHorizontal: 26,
    //color:'black',
    //backgroundColor: 'red',
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    width: 333,
    height: 80,
    borderColor: "red",
    borderRadius: 30,
    fontSize: 18,
    fontFamily: "satoshi-medium",
    paddingHorizontal: 26,
  },
  outline: {
    alignItems: "center",
  },
  rootContainer: {
    //backgroundColor: "red",
    flex: 1,
    padding: 50,
    width: 333,
    height: 80,
    alignSelf: "center",
    justifyContent: "center",
  },
});
