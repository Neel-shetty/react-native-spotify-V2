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
import RNFS from 'react-native-fs';
import * as MediaLibrary from 'expo-media-library';
// import {StatusBar} from 'expo-status-bar';
// import {API_KEY} from '@env'
import apiClient from '../../service/http';
import {useQuery} from 'react-query';
import axios from 'axios';

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

  const [files, setFiles] = useState([]);

  // console.log(files[4].uri);
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
  async function getFiles() {
    let files = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      //album: 'music'
    });
    files = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: files.totalCount,
    });
    //const folder = await MediaLibrary.getAssetInfoAsync('33 DADDY ! DADDY ! DO !.m4a')
    const tempFile = files.assets;
    setFiles(tempFile);
    console.log('temp file ------- ', tempFile);
    //console.log(folder)
    //console.log(files.assets)
    for (let i = 0; i < files.assets.length; i++) {
      // console.log(files.assets[i].filename);
      let tempFileName = files.assets[i].filename;
      const options = {
        method: 'GET',
        url: 'https://geniurl.p.rapidapi.com/search/top',
        params: {
          q: removeExtenstion(tempFileName),
        },
        headers: {
          'X-RapidAPI-Key':
            'c310cfc9femsh498a42dcae913fep1a0fc6jsn6b86c2b5c76d',
          'X-RapidAPI-Host': 'geniurl.p.rapidapi.com',
        },
      };
      function getDetails() {
        axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.error(error);
          });
      } //download();
      getDetails();

      function removeExtension(filename) {
        // filename = filename.replace(/\d+/g, '');
        filename = filename.substring(filename.indexOf(' ') + 1);
        return filename.substring(0, filename.lastIndexOf('.')) || filename;
      }
    }
  }

  useEffect(() => {
    getFiles();
  }, []);

  const [fontsLoaded] = useFonts({
    'satoshi-bold': require('../../../assets/fonts/satoshi/Satoshi-Bold.otf'),
    'satoshi-regular': require('../../../assets/fonts/satoshi/Satoshi-Regular.otf'),
    'satoshi-medium': require('../../../assets/fonts/satoshi/Satoshi-Medium.otf'),
  });

  useEffect(() => {
    async function getPerms() {
      const perms = await MediaLibrary.requestPermissionsAsync();
      console.log(perms);
    }
    getPerms();
  }, []);

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
