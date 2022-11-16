import {StyleSheet, Text, View, StatusBar, ImageBackground} from 'react-native';
import React from 'react';
import Logo from '../../components/ui/Logo';
// import Logos from '../../../assets/svg/Logo.svg';
import {useFonts} from 'expo-font';
// import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import {useCallback, useEffect} from 'react';
import Button from '../../components/ui/Button';
import {useNavigation} from '@react-navigation/native';
// import {StatusBar} from 'expo-status-bar';
// import {Storage} from '@aws-amplify/storage';

const GetStartedScreen = () => {
  /* async function awsstore() {
    const store = await Storage.put('test.txt', 'Hello');
  } */

  const [fontsLoaded] = useFonts({
    'satoshi-bold': require('../../../assets/fonts/satoshi/Satoshi-Bold.otf'),
    'satoshi-regular': require('../../../assets/fonts/satoshi/Satoshi-Regular.otf'),
    'satoshi-medium': require('../../../assets/fonts/satoshi/Satoshi-Medium.otf'),
  });

  const navigation = useNavigation();

  function NextScreen() {
    navigation.navigate('ChooseMode');
  }

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
      <View onLayout={onLayoutRootView} style={styles.rootContainer}>
        <ImageBackground
          source={require('../../../assets/images/getStartedBG.png')}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.logoContainer}>
            <Logo width="196" height="59" scale="1" />
          </View>
          <View style={styles.semiroot}>
            <View style={styles.dummy} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Enjoy Listening To Music?</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>
                Lorem ipsum dolor sit amet. A delectus animi id accusamus illo
                et veniam omnis. Est quae dolorem et pariatur debitis est.
              </Text>
            </View>
            <View style={styles.view}>
              <Button onPress={NextScreen} style={styles.button}>
                Get Started
              </Button>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default GetStartedScreen;

// const height = Dimensions.get('window').height;
// const width = Dimensions.get('window').width;
//console.log(height,width)

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    //height: height + 60,
    //width: "100%",
  },
  imageContainer: {
    flex: 1,
    //backgroundColor:'red'
  },
  logoContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    //backgroundColor: 'red',
    //paddingHorizontal: width / 3.5,
    //position: "absolute",
    //top: 60,
  },
  semiroot: {
    //backgroundColor: "white",
    flex: 6,
  },
  titleContainer: {
    flex: 1,
    //backgroundColor: "red",
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 5,

    //paddingHorizontal: 30,
    //marginHorizontal: 5,
    //flexDirection: "column",
    //minWidth: width,
    //alignSelf: "center",
  },
  title: {
    color: 'white',
    fontFamily: 'satoshi-bold',
    fontSize: 35,
    //position: "absolute",
    //bottom: height / 20,
    //backgroundColor: "green",
    //flex: 1,
    //textAlign: 'center'
    //justifyContent: 'flex-start',
  },
  subtitleContainer: {
    //backgroundColor: "white",
    //opacity: 0.5,
    //position: "absolute",
    //height: 115,
    //width: 350,
    //bottom: 260,
    //bottom: height / 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 60,
    paddingVertical: 15,
  },
  subtitle: {
    color: '#797979',
    fontFamily: 'satoshi-regular',
    fontSize: 25,
    textAlign: 'center',
  },
  view: {
    //backgroundColor: "blue",
    flex: 1,
    //position: "absolute",
    //top: 170,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
    paddingTop: 10,
  },
  button: {
    width: 329,
    height: 92,
    alignSelf: 'center',
    justifyContent: 'center',
    //marginBottom: 5
  },
  dummy: {
    flex: 3,
  },
});
