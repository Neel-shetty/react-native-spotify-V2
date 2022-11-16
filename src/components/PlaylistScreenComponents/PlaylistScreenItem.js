import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
// import MusicInfo from "expo-music-info";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("songDetails.db");

const PlaylistScreenItem = ({ playlist, id }) => {
  const navigation = useNavigation();
  // const [info, setInfo] = useState();
  //console.log(id)
  db.transaction((tx) => {
    tx.executeSql("select * from songs_table where id=?", [id], (tx, res) => {
      //console.log(res.rows._array[0]);
    });
  });

  async function fileInfo() {
    const info = await MediaLibrary.getAssetInfoAsync(playlist.id);
    const folders = await MediaLibrary.getAlbumsAsync();
    const foldersCount = (await MediaLibrary.getAlbumsAsync()).length;

    for (let i = 0; i < foldersCount; i++) {
      if (info.albumId === folders[i].id) {
        var folderTitle = folders[i].title;
        //console.log(folderTitle);
      }
    }
    const folderInfo = await MediaLibrary.getAssetsAsync({
      album: info.albumId,
    });
    //console.log("FOLDER INFO - ", folderInfo.assets[0].uri);
    //console.log("folder log", folders[0].id);
    //console.log(info.albumId);
    //const cover = folderInfo.assets[0].uri;
    //console.log(cover)
    // setCover(cover);
  }

  async function titleButton() {
    const info = await MediaLibrary.getAssetInfoAsync(playlist.id);
    const folders = await MediaLibrary.getAlbumsAsync();
    const foldersCount = (await MediaLibrary.getAlbumsAsync()).length;
    console.log(foldersCount);
    for (let i = 0; i < foldersCount; i++) {
      if (info.albumId === folders[i].id) {
        var folderTitle = folders[i].title;
        console.log(folderTitle);
      }
    }
    const folderInfo = await MediaLibrary.getAssetsAsync({
      album: info.albumId,
    });
    // console.log("FOLDER INFO - ", folderInfo.assets[0].uri);
    // console.log("folder log", folders[0].id);
    // console.log(info.albumId);
    const cover = folderInfo?.assets[0]?.uri;
    // console.log(cover)
    navigation.navigate("MusicPlayer", {
      songId: playlist.id,
      uri: playlist.uri,
      filename: playlist.filename,
      cover: cover,
      duration: convertTime(playlist.duration),
      Album: folderTitle,
    });
  }

  function playButton() {
    //playsong
  }

  const convertTime = (minutes) => {
    if (minutes) {
      const hrs = minutes / 60;
      const minute = hrs.toString().split(".")[0];
      const percent = parseInt(hrs.toString().split(".")[1].slice(0, 2));
      const sec = Math.ceil((60 * percent) / 100);

      if (parseInt(minute) < 10 && sec < 10) {
        return `0${minute}:0${sec}`;
      }

      if (parseInt(minute) < 10) {
        return `0${minute}:${sec}`;
      }

      if (sec < 10) {
        return `${minute}:0${sec}`;
      }

      return `${minute}:${sec}`;
    }
  };

  function removeExtension(filename) {
    // filename = filename.replace(/\d+/g, '');
    filename = filename.substring(filename.indexOf(" ") + 1);
    return filename.substring(0, filename.lastIndexOf(".")) || filename;
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
        <TouchableOpacity onPress={titleButton}>
          <Text numberOfLines={2} style={styles.song}>
            {removeExtension(playlist.filename)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Text style={styles.artist}>{playlist.Artist}</Text> */}
        </TouchableOpacity>
      </View>

      <View style={styles.lengthContainer}>
        <Text style={styles.length}>{convertTime(playlist.duration)}</Text>
      </View>
      <View style={styles.likeContainer}>
        <TouchableOpacity onPress={playButton}>
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

export default PlaylistScreenItem;

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 43,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    paddingHorizontal: 20,
    //backgroundColor: "pink",
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
    flex: 3,
    paddingLeft: 10,
  },
  song: {
    fontSize: 14,
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
