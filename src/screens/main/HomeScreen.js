import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
// import Button from '../../components/ui/Button';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
// import {Auth, Analytics} from 'aws-amplify';
import SongPreviewList from '../../components/HomeScreenComponents/SongPreview';
import CategoryBar from '../../components/HomeScreenComponents/CategoryBar';
import NewAlbum from '../../components/HomeScreenComponents/NewAlbum/NewAlbum';
import Playlist from '../../components/HomeScreenComponents/Playlist/Playlist';
import Header from '../../components/HomeScreenComponents/Header/Header';
import SearchIcon from '../../components/ui/SearchIcon';
import MenuDots from '../../components/ui/MenuDots';
import TrackPlayer from 'react-native-track-player';
import RNFS, {readDir, readDirAssets} from 'react-native-fs';
// import * as MediaLibrary from 'expo-media-library';
// import {StatusBar} from 'expo-status-bar';
// import {API_KEY} from '@env'
RNFS.readDir(RNFS.ExternalStorageDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  .then(result => {
    console.log('GOT RESULT', result[1].path);

    // stat the first file
    return Promise.all([RNFS.stat(result[0].path), result[0].path]);
  })
  .then(statResult => {
    if (statResult[0].isFile()) {
      // if we have a file, read it
      return RNFS.readFile(statResult[1], 'utf8');
    }

    return 'no file';
  })
  .then(contents => {
    // log the file contents
    console.log(contents);
  })
  .catch(err => {
    console.log(err.message, err.code);
  });

var path = RNFS.DocumentDirectoryPath + '/test.txt';
// write the file
RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
  .then(success => {
    console.log('FILE WRITTEN!');
  })
  .catch(err => {
    console.log(err.message);
  });

async function readFolder() {
  const items = await readDir('/storage/emulated/0/Music');
  console.log(items);
}
readFolder();
const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Permissons required for Spotify ',
        message:
          'Spotify needs to access your storage' +
          'to read the audio files on this device.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the storage');
    } else {
      console.log('Camera permission storage');
    }
  } catch (err) {
    console.warn(err);
  }
};
// requestStoragePermission();

const HomeScreen = () => {
  async function getPermission() {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
    } catch (e) {
      console.log(e);
    }
  }

  getPermission();

  async function getFiles() {
    // console.log(':joy:');
  }
  getFiles();
  const [files, setFiles] = useState([]);

  const song1 = {
    url: require('../../../assets/songs/hb.m4a'),
  };

  async function play() {
    const song = await TrackPlayer.add(song1);
    console.log(song);
    await TrackPlayer.pause();
  }
  // play();
  // Analytics.autoTrack();
  // console.log(API_KEY)
  // async function getFiles() {
  //   let files = await MediaLibrary.getAssetsAsync({
  //     mediaType: 'audio',
  //     //album: 'music'
  //   });
  //   files = await MediaLibrary.getAssetsAsync({
  //     mediaType: 'audio',
  //     first: files.totalCount,
  //   });
  //   //const folder = await MediaLibrary.getAssetInfoAsync('33 DADDY ! DADDY ! DO !.m4a')
  //   const tempFile = files.assets;
  //   setFiles(tempFile);
  //   //console.log(folder)
  //   //console.log(files.assets)
  //   //download();
  // }

  // useLayoutEffect(() => {
  //   getFiles();
  // }, []);

  // function logOut() {
  //   Auth.signOut();
  // }

  const [fontsLoaded] = useFonts({
    'satoshi-bold': require('../../../assets/fonts/satoshi/Satoshi-Bold.otf'),
    'satoshi-regular': require('../../../assets/fonts/satoshi/Satoshi-Regular.otf'),
    'satoshi-medium': require('../../../assets/fonts/satoshi/Satoshi-Medium.otf'),
  });

  // useEffect(() => {
  //   async function getPerms() {
  //     const perms = await MediaLibrary.requestPermissionsAsync();
  //     console.log(perms);
  //   }
  //   getPerms();
  // }, []);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar hidden={true} />
      <SafeAreaView onLayout={onLayoutRootView} style={styles.root}>
        <ScrollView
          contentContainerStyle={styles.root}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          {/* <Button>logout</Button> */}
          <>
            <View
              style={{
                width: width,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 30,
                paddingBottom: 24,
                flexDirection: 'row',
                paddingHorizontal: 35,
                //backgroundColor: "violet",
                //flex:0.8
              }}>
              <TouchableOpacity>
                <SearchIcon />
              </TouchableOpacity>

              <Header />
              <MenuDots />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                //backgroundColor: "violet",
                paddingBottom: 41,
                //paddingHorizontal:60
              }}>
              <NewAlbum />
            </View>
            <View style={{flex: 5}}>
              <View style={{height: 30, marginBottom: 30}}>
                <CategoryBar />
              </View>
              <View style={{height: 242, marginBottom: 30}}>
                <SongPreviewList data={files} />
              </View>
              <View
                style={{
                  flex: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <ScrollView horizontal={true} style={{ width: "100%" }}> */}
                <Playlist data={files} />
                {/* </ScrollView> */}
                {/* <Text>test</Text> */}
              </View>
            </View>
          </>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

// const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  root: {
    //alignItems: "center",
    //justifyContent: "center",
    //flex: 1,
    backgroundColor: 'white',
  },
});
