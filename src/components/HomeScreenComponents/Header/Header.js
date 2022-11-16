import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Logosmall from "../../ui/Logosmall";
import SearchIcon from "../../ui/SearchIcon";

const Header = () => {
  return (
    <View>
      <View styles={styles.root}>
      
      <Logosmall />
      
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  root: {
    //backgroundColor: 'red',
    flex: 1,
    height: 33,
  },
});
