import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PlaylistData from "../../../assets/dummydata/PlaylistData";
import likeItem from './likeItem'


const LikeContainer = (item) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          //padding: 20,
        }}
      >
        <Text>{PlaylistData.SongName}</Text>
        <Text>{PlaylistData.Artist}</Text>
        <Text>{PlaylistData.duration}</Text>
        <Text>{PlaylistData.like}</Text>
      </TouchableOpacity>
    </View>
  );
}


export default LikeContainer

const styles = StyleSheet.create({})