import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { Audio } from "expo-av";
import { Storage } from "@aws-amplify/storage";
import { useState } from "react";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import { a } from "aws-amplify";
import { Sound } from "expo-av/build/Audio";

const Controls = () => {
  const route = useRoute();
  console.log(route.params);
  //const songId = route.params.songId
  const filePath = route.params.uri;
  const [sound, setSound] = useState(null);
  const [songStatus, setSongStatus] = useState("");
  const [position, setPosition] = useState();
  const [currentAudio, setCurrentAudio] = useState();
  // const [songLink, setSongLink] = useState()
  // setPosition(songStatus)

  console.log(songStatus);
  async function getFiles() {
    let files = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });

    for (let i = 0; i < 20; i++) {
      console.log(files.assets[i].uri);
      console.log("\n");
    }
  }

  async function load() {
    await sound.loadAsync({ uri: filepath });
  }

  async function loop() {
    await sound.setIsLoopingAsync();
  }

  async function mute() {
    await sound.setIsMutedAsync();
  }

  // useEffect(()=>{
  //   getFiles()
  // },[])

  function onPlaybackStatusUpdate(status){
    console.log(status)
  }

  async function playSound() {

    if (sound === null) {
      // initial audio playback
      const playbackObj = new Audio.Sound();
      /* const {sound} = await Sound.createAsync(
        {uri:filePath},
        {shouldPlay:true},
        onPlaybackStatusUpdate
      ) */
      const status = await playbackObj.loadAsync(
        {
          uri: filePath,
        },
        { shouldPlay: true }

      );
      setCurrentAudio(route.params);
      //console.log(status)
      //console.log(await playbackObj.getStatusAsync());
      const {
        isPlaying,
        isLoaded,
        isLooping,
        isMuted,
        durationMillis,
        isBuffering,
        playableDurationMillis,
        shouldPlay,
        positionMillis,
      } = await playbackObj.getStatusAsync();
      //setPosition(positionMillis)
      //const songStatus = await playbackObj.getStatusAsync();
      setSongStatus(status);
      console.log(status.isPlaying);
      setSound(playbackObj);
      // const getstatus1 = await playbackObj.getStatusAsync()

      //console.log(getstatus1.isPlaying
    }

    //pause song
    if (
      songStatus.isLoaded &&
      songStatus.isPlaying &&
      currentAudio.songId === route.params.songId
    ) {
      // await sound.pauseAsync()
      console.log("pausing");
      // return
      const status = await sound.setStatusAsync({ shouldPlay: false });
      return setSongStatus(status);
    }

    //play song
    if (
      songStatus.isLoaded &&
      !songStatus.isPlaying &&
      currentAudio.songId === route.params.songId
    ) {
      console.log("resuming................");
      const status = await sound.playAsync();
      return setSongStatus(status);
    }

    //play next song 
    if('x'){

    }

    //previous song
  }
  //console.log(songStatus.isPlaying);
  /* function pp() {
    if (songStatus.isPlaying === true && songStatus.isLoaded === true) {
      sound.pauseAsync();
    } else if (songStatus.isPlaying === false) {
      sound.playAsync();
    }
  } */

  async function permissionCheck() {
    const perms = await Audio.getPermissionsAsync();
    //console.log(perms);
  }

  async function requestPermission() {
    if (permissionCheck.granted === false) {
      const permResponse = await Audio.requestPermissionsAsync();
      //console.log(permResponse);
    }
  }

  async function pause() {
    await sound.pauseAsync();
  }
  async function playNext(playbackObj, uri) {
    if (sound.isLoaded && currentAudio.songId === route.params.songId) {
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
        // await play(playbackObj, uri);
      } catch (e) {
        console.log("error playing next song - ", e);
      }
    }
  }

  useEffect(() => {
    permissionCheck();
    requestPermission();
    Audio.setAudioModeAsync({
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      interruptionModeAndroid: 1,
    });
  }, []);

  // useEffect(()=>{
  //   console.log(position)
  // },[position])

  useEffect(() => {
    return sound 
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined
  }, [sound]);

  //console.log(status)
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        //backgroundColor: "pink",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <View style={{ flex: 1 }}></View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity>
          <Svg //repeat
            width={24}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M15.78 2.47a.75.75 0 0 0-1.06 1.06l.72.72h-4.602c-1.706 0-2.747 0-3.615.281a5.75 5.75 0 0 0-3.692 3.692c-.281.868-.281 1.909-.281 3.615v.324c0 1.706 0 2.747.281 3.615a.75.75 0 1 0 1.427-.464C4.759 14.702 4.75 13.92 4.75 12c0-1.92.01-2.702.208-3.313a4.25 4.25 0 0 1 2.729-2.729C8.298 5.759 9.08 5.75 11 5.75h4.178l-.658.549a.75.75 0 1 0 .96 1.152l1.409-1.174a1.747 1.747 0 0 0 .117-2.582L15.78 2.47ZM20.469 8.223a.75.75 0 1 0-1.427.464c.199.611.208 1.393.208 3.313 0 1.92-.01 2.702-.208 3.313a4.25 4.25 0 0 1-2.729 2.729c-.611.199-1.393.208-3.313.208h-2c-.967 0-1.646-.002-2.16-.03l.69-.69a.75.75 0 1 0-1.06-1.06l-1.226 1.225a1.749 1.749 0 0 0 .117 2.582l1.409 1.174a.75.75 0 0 0 .96-1.152l-.681-.568c.51.02 1.097.02 1.795.019h2.318c1.706 0 2.747 0 3.615-.281a5.75 5.75 0 0 0 3.692-3.692c.281-.868.281-1.909.281-3.615v-.324c0-1.706 0-2.747-.281-3.615Z"
              fill="#7E7E7E"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity onPress={pause}>
          <Svg // left
            width={26}
            height={26}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M6.23 6.5a.813.813 0 0 0-1.626 0v13a.813.813 0 0 0 1.625 0v-13ZM16.778 5.703c-.733-.079-1.462.154-2.244.521-.778.366-1.731.925-2.934 1.632l-.075.044c-1.203.707-2.156 1.267-2.856 1.77-.704.506-1.263 1.03-1.559 1.707a4.054 4.054 0 0 0 0 3.246c.296.678.855 1.201 1.56 1.707.699.504 1.652 1.063 2.855 1.77l.075.044c1.203.707 2.156 1.267 2.934 1.632.782.367 1.511.6 2.244.521a3.937 3.937 0 0 0 2.784-1.633c.429-.6.594-1.351.672-2.222.079-.867.079-1.985.079-3.4v-.084c0-1.415 0-2.534-.079-3.4-.078-.871-.243-1.622-.672-2.222a3.938 3.938 0 0 0-2.784-1.633Z"
              fill="#363636"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 2, alignItems: "center" }}>
        <TouchableOpacity onPress={playSound}>
          <View
            style={{
              height: 72,
              width: 72,
              borderRadius: 72 / 2,
              backgroundColor: "#42C83C",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {songStatus === "" && (
              <Svg //play
                width={28}
                height={28}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M17.585 6.074c-2.02-1.152-3.59-2.047-4.865-2.627-1.28-.583-2.39-.912-3.47-.8a6.108 6.108 0 0 0-4.292 2.448c-.642.873-.91 1.994-1.038 3.381-.129 1.382-.128 3.173-.128 5.476v.096c0 2.303 0 4.094.128 5.476.129 1.387.396 2.508 1.038 3.38a6.108 6.108 0 0 0 4.292 2.45c1.08.111 2.19-.218 3.47-.8 1.275-.581 2.845-1.476 4.865-2.628l.082-.047c2.02-1.152 3.59-2.047 4.737-2.847 1.15-.803 1.998-1.59 2.442-2.576a5.971 5.971 0 0 0 0-4.912c-.444-.986-1.292-1.773-2.442-2.576-1.146-.8-2.716-1.695-4.737-2.847l-.082-.047Z"
                  fill="#fff"
                />
              </Svg>
            )}
            {songStatus.isLoaded && songStatus.isPlaying && (
              <Svg //pause
                width={28}
                height={28}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M11.375 3.5a.875.875 0 0 0-1.75 0v21a.875.875 0 0 0 1.75 0v-21ZM18.375 3.5a.875.875 0 0 0-1.75 0v21a.875.875 0 0 0 1.75 0v-21Z"
                  fill="#fff"
                />
              </Svg>
            )}
            {songStatus.isLoaded && !songStatus.isPlaying && (
              <Svg //play
                width={28}
                height={28}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M17.585 6.074c-2.02-1.152-3.59-2.047-4.865-2.627-1.28-.583-2.39-.912-3.47-.8a6.108 6.108 0 0 0-4.292 2.448c-.642.873-.91 1.994-1.038 3.381-.129 1.382-.128 3.173-.128 5.476v.096c0 2.303 0 4.094.128 5.476.129 1.387.396 2.508 1.038 3.38a6.108 6.108 0 0 0 4.292 2.45c1.08.111 2.19-.218 3.47-.8 1.275-.581 2.845-1.476 4.865-2.628l.082-.047c2.02-1.152 3.59-2.047 4.737-2.847 1.15-.803 1.998-1.59 2.442-2.576a5.971 5.971 0 0 0 0-4.912c-.444-.986-1.292-1.773-2.442-2.576-1.146-.8-2.716-1.695-4.737-2.847l-.082-.047Z"
                  fill="#fff"
                />
              </Svg>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity >
          <Svg //right
            width={26}
            height={26}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M21.396 6.5a.812.812 0 1 0-1.625 0v13a.813.813 0 0 0 1.625 0v-13ZM14.4 7.856c-1.203-.707-2.155-1.266-2.934-1.632-.782-.367-1.511-.6-2.244-.521a3.938 3.938 0 0 0-2.784 1.633c-.428.6-.594 1.351-.672 2.222-.079.867-.079 1.985-.079 3.4v.084c0 1.415 0 2.534.079 3.4.078.871.244 1.622.672 2.222a3.937 3.937 0 0 0 2.784 1.633c.733.079 1.462-.154 2.244-.521.779-.366 1.731-.925 2.934-1.632l.075-.044c1.204-.707 2.156-1.267 2.856-1.77.704-.506 1.263-1.03 1.559-1.706a4.054 4.054 0 0 0 0-3.248c-.296-.677-.855-1.2-1.559-1.706-.7-.503-1.652-1.063-2.856-1.77l-.074-.044Z"
              fill="#363636"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity>
          <Svg //shuffle
            width={24}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M18.78 3.47a.75.75 0 1 0-1.06 1.06l.724.725a5.75 5.75 0 0 0-4.552 2.555L8.86 15.358a4.25 4.25 0 0 1-3.536 1.892H5a.75.75 0 0 0 0 1.5h.324a5.75 5.75 0 0 0 4.784-2.56l5.032-7.547a4.25 4.25 0 0 1 2.997-1.859l-.617.515a.75.75 0 0 0 .96 1.152l1.409-1.174a1.746 1.746 0 0 0 .117-2.582L18.78 3.47ZM5 5.25a.75.75 0 0 0 0 1.5h.324A4.25 4.25 0 0 1 8.86 8.643a.75.75 0 0 0 1.248-.833 5.75 5.75 0 0 0-4.784-2.56H5ZM15.14 15.357a.75.75 0 1 0-1.248.832 5.75 5.75 0 0 0 4.31 2.541l-.682.569a.75.75 0 0 0 .96 1.152l1.409-1.174c.384-.32.595-.77.626-1.227a1.746 1.746 0 0 0-.509-1.355L18.78 15.47a.75.75 0 1 0-1.06 1.06l.712.713a4.25 4.25 0 0 1-3.292-1.885Z"
              fill="#7E7E7E"
            />
          </Svg>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
};

export default Controls;

const styles = StyleSheet.create({});
