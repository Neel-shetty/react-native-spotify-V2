import { StyleSheet, Text, TouchableOpacity, View,Dimensions } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const PlaylistItem = ({ playlist }) => {
  const navigation = useNavigation()
  //console.log(playlist)
  function playButton() {
    navigation.navigate('MusicPlayer', {data: playlist})
  }

  return (
    <View style={styles.container}>
      <View style={styles.playContainer}>
        <View style={styles.circle}>
          <TouchableOpacity>
            <Svg
              width={17}
              height={17}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M11.954 4.779c-1.227-.7-2.18-1.243-2.954-1.596-.777-.354-1.451-.554-2.107-.485a3.709 3.709 0 0 0-2.606 1.486c-.39.53-.552 1.21-.63 2.053-.078.839-.078 1.926-.078 3.324v.059c0 1.398 0 2.485.078 3.324.078.843.24 1.523.63 2.053a3.709 3.709 0 0 0 2.606 1.487c.656.068 1.33-.132 2.107-.486.774-.352 1.727-.896 2.954-1.595l.05-.029c1.226-.7 2.18-1.243 2.876-1.728.698-.488 1.212-.966 1.482-1.564a3.625 3.625 0 0 0 0-2.983c-.27-.598-.784-1.076-1.482-1.563-.697-.486-1.65-1.03-2.877-1.73l-.05-.027Z"
                fill="#555"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.titleContainer}>
      <TouchableOpacity>
        <Text style={styles.song} numberOfLines={1}>{playlist.SongName}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={styles.artist}>{playlist.Artist}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lengthContainer}>
        <Text style={styles.length}>{playlist.duration}</Text>
      </View>
      <View style={styles.likeContainer}>
        <TouchableOpacity>
          <Svg
            width={21}
            height={21}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M17.773 3.903C15.73 1.82 13.364 2.7 11.9 3.628c-.828.525-1.974.525-2.802 0-1.464-.93-3.83-1.808-5.872.275C-1.62 8.847 6.694 18.375 10.5 18.375c3.806 0 12.12-9.528 7.273-14.472Z"
              fill="#B4B4B4"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaylistItem;

const width = Dimensions.get("window").width;


const styles = StyleSheet.create({
  container: {
    width:width,
    height: 43,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    paddingHorizontal:20,
    // backgroundColor: "pink",
  },
  circle: {
    width: 37,
    height: 37,
    backgroundColor: "#E6E6E6",
    borderRadius: 37 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  playContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  titleContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 5,
    paddingLeft: 10,
    // backgroundColor: 'pink'
  },
  song: {
    fontSize: 16,
    fontFamily: "satoshi-medium",
  },
  artist: {
    fontSize: 12,
    fontFamily: "satoshi-regular",
  },
  lengthContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
  },
  length: {
    fontSize: 15,
    fontFamily: "satoshi-regular",
  },
  likeContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 1,
  },
});
