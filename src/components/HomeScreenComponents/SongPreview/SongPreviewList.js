import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React from "react";
import SongPreview from "./SongPreview";
import previewData from "../../../../assets/dummydata/previewData";
import { FlashList } from "@shopify/flash-list";


// const preview1 = previewData[0];
// const preview2 = previewData[1];

const SongPreviewList = ({data}) => {
  const width= Dimensions.get('window').width
  //console.log(previewData)
  return (
    <View style={{ flexDirection: "row", width:width, height: 242}}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={{ paddingLeft: 13,paddingRight:1 }}>
            <SongPreview preview={item} />
          </View>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        //estimatedItemSize={160}
      />
    </View>
  );
};

export default SongPreviewList;

const styles = StyleSheet.create({});
