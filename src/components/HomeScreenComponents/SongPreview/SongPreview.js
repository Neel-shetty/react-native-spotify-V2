import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";

const SongPreview = ({ preview }) => {
  const [cover, setCover] = useState();
  const [album, setAlbum] = useState();
  const navigation = useNavigation();

  function onPress() {
    navigation.navigate("MusicPlayer", {
      songId: preview.id,
      uri: preview.uri,
      filename: preview.filename,
      cover: cover,
      duration: duration,
      Album: album,
    });
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

  const duration = convertTime(preview.duration)

  function checkCover(uri) {
    if(uri.includes('cover'))
    {
      //console.log('COVER')
      return uri
    }else {
      return 'http://www.scottishculture.org/themes/scottishculture/images/music_placeholder.png'
    }
  }

  useEffect(() => {
    async function getCover() {
      const info = await MediaLibrary.getAssetInfoAsync(preview);
      const folders = await MediaLibrary.getAlbumsAsync();
      const foldersCount = (await MediaLibrary.getAlbumsAsync()).length;

      for (let i = 0; i < foldersCount; i++) {
        if (info.albumId === folders[i].id) {
          var folderTitle = folders[i].title;
          //console.log(folderTitle);
        }
      }
      setAlbum(folderTitle);
      const folderInfo = await MediaLibrary.getAssetsAsync({
        album: info.albumId,
      });
      // console.log("FOLDER INFO - ", folderInfo.assets);
      //console.log("folder log", folders[0].id);
      //console.log(info.albumId);
      const cover = folderInfo?.assets[0]?.uri ? checkCover(folderInfo?.assets[0]?.uri) : 'http://www.scottishculture.org/themes/scottishculture/images/music_placeholder.png';
      //console.log(cover);
      setCover(cover);
      /* navigation.navigate("MusicPlayer", {
      songId: playlist.id,
      uri: playlist.uri,
      filename: playlist.filename,
      cover: cover,
      duration: convertTime(playlist.duration),
    }); */
    }
    getCover();
  }, []);

  function removeExtension(filename) {
    // filename = filename.replace(/\d+/g, '');
    filename = filename.substring(filename.indexOf(" ") + 1);
    return filename.substring(0, filename.lastIndexOf(".")) || filename;
  }

  //console.log(preview.filename)
  return (
    <View style={{ height: 255, width: 147 }}>
      <View style={styles.root}>
        <View style={styles.box}>
          <View style={styles.thumbnail}>
            <TouchableOpacity onPress={onPress}>
              <ImageBackground
                style={styles.image}
                source={{ uri: cover }}
                imageStyle={styles.image}
              >
                <TouchableOpacity>
                  <View style={styles.circle}>
                    <Svg
                      width={14}
                      height={14}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M9.844 3.935C8.834 3.36 8.05 2.912 7.412 2.621c-.64-.291-1.196-.456-1.736-.4a3.054 3.054 0 0 0-2.145 1.224c-.321.437-.455.997-.52 1.691-.064.69-.064 1.586-.064 2.738v.048c0 1.152 0 2.047.064 2.738.065.694.199 1.254.52 1.69a3.054 3.054 0 0 0 2.145 1.225c.54.056 1.096-.109 1.736-.4.637-.29 1.422-.738 2.432-1.314l.041-.024c1.01-.576 1.795-1.023 2.369-1.423.575-.401.998-.795 1.22-1.288a2.986 2.986 0 0 0 0-2.456c-.222-.493-.645-.887-1.22-1.288-.574-.4-1.358-.847-2.369-1.424l-.04-.023Z"
                        fill="#555"
                      />
                    </Svg>
                  </View>
                </TouchableOpacity>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {removeExtension(preview.filename)}
            </Text>
            <Text numberOfLines={1} style={styles.subtitle}>
              {/* {preview.content.ArtistName} */}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SongPreview;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    //backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    //backgroundColor: "green",
    //borderRadius: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnail: {
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'coral'
    //flex: 1,
  },
  image: {
    height: 185,
    width: 147,
    borderRadius: 30,
  },
  circle: {
    width: 29,
    height: 29,
    backgroundColor: "#E6E6E6",
    borderRadius: 29 / 2,
    left: 105,
    top: 164,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    //flex: 1,
    //backgroundColor: "gold",
    width: 110,
    paddingHorizontal: 5,
    paddingVertical: 12,
    //maxHeight: 60,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    //textAlign: 'left',
    fontFamily: "satoshi-bold",
    fontSize: 16,
  },
  subtitle: {
    fontFamily: "satoshi-regular",
    fontSize: 14,
    paddingTop: 3,
  },
});
