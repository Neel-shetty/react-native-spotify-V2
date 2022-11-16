import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import categoryData from "../../../../assets/dummydata/categoryData";

const CategoryBar = () => {
  const categories = ["New", "Videos", "Artists", "Podcasts", "Trending"];
  const [select, setSelect] = useState(categoryData);

  function onSelect(index) {
    const tempData = [];
    const newIndex = select.map((val) => {
      if (val.key === index.key) {
        tempData.push({ ...val, selected: true });
      } else {
        tempData.push({ ...val, selected: false });
      }
    });
    setSelect(tempData);
  }

  // console.log(select[item].selected);

  return (
    <View>
      <FlatList
        data={categoryData}
        //keyExtractor={(item)=> item.key}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => onSelect(item)}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "satoshi-medium",
                  paddingHorizontal: 25,
                  //backgroundColor: select[index].selected ? "pink" : "red",
                }}
              >
                {item.title}
              </Text>
              {select[index].selected && <View style={styles.indicator}></View>}
            </TouchableOpacity>
          );
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoryBar;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "satoshi-medium",
    paddingHorizontal: 25,
  },
  indicator:{
    width:26,
    height:3,
    backgroundColor: '#42C83C',
    borderBottomRightRadius:3.5,
    borderBottomLeftRadius:3.5,
    alignSelf:'center'
  }
});
