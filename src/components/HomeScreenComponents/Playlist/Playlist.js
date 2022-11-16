import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import React from "react";
import PlaylistItem from "./PlaylistItem";
import PlaylistData from "../../../../assets/dummydata/PlaylistData";

const Playlist = ({data}) => {
  //console.log(PlaylistData)
  const song = data
  return (
    <View style={styles.root}>
      <View style={styles.playlistContainer}>
        <Text style={styles.playlist}>Up Next</Text>
      </View>
      <View style={{ flex: 3 }}>
        {/* <FlatList 
        data={song} 
        renderItem={({item})=>(
          <PlaylistItem playlist={item} />
        )}  
        /> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {PlaylistData.map((song) => (
            <PlaylistItem playlist={song} key={song.key} />
          ))}
        </ScrollView>
      </View>
      {/* 
      <PlaylistItem /> */}
    </View>
  );
};

export default Playlist;

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'violet',
    width: width,
  },
  playlist: {
    fontSize: 20,
    fontFamily: "satoshi-bold",
  },
  playlistContainer: {
    alignItems: "flex-start",
    //backgroundColor: 'pink',
    //flex:1,
    width: width,
    paddingLeft: 30,
    paddingVertical: 12,
  },
});
