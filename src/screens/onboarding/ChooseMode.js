import {StyleSheet, Text, View, StatusBar, ImageBackground} from 'react-native';
import React from 'react';
import Logo from '../../components/ui/Logo';
// import Logos from '../../../assets/svg/Logo.svg';
import {useState} from 'react';
import Button from '../../components/ui/Button';
import {useNavigation} from '@react-navigation/native';
// import {StatusBar} from 'expo-status-bar';
import {Ionicons} from '@expo/vector-icons';

const ChooseMode = () => {
  const navigation = useNavigation();
  const [iconDark, setIconDark] = useState('moon-outline');
  const [iconLight, setIconLight] = useState('sunny');

  function NextScreen() {
    navigation.navigate('RegisterOrSignIn');
  }

  function ToggleDarkMode() {
    if (iconLight === 'sunny') {
      setIconLight('sunny-outline');
    }
    setIconDark('moon');
  }

  function ToggleLightMode() {
    if (iconDark === 'moon') {
      setIconDark('moon-outline');
    }
    setIconLight('sunny');
  }

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.rootContainer}>
        <ImageBackground
          source={require('../../../assets/images/choosemode.png')}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.logoContainer}>
            <Logo width="196" height="59" scale="1" />
          </View>
          <View style={styles.semiroot}>
            <View style={styles.dummy} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Choose Mode</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <View style={styles.iconContainer}>
                <View style={styles.circle}>
                  <Ionicons
                    name={iconDark}
                    size={50}
                    color="black"
                    onPress={ToggleDarkMode}
                  />
                </View>

                <View style={styles.circle}>
                  <Ionicons
                    name={iconLight}
                    size={50}
                    color="black"
                    onPress={ToggleLightMode}
                  />
                </View>
              </View>
            </View>
            <View style={styles.view}>
              <Button onPress={NextScreen} style={styles.button}>
                Continue
              </Button>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default ChooseMode;

// const height = Dimensions.get('window').height;
// const width = Dimensions.get('window').width;

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
    justifyContent: 'flex-start',
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
    //paddingHorizontal: 60,
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //backgroundColor: "red",
    width: 270,
    //flex:1,
    opacity: 0.8,
    paddingBottom: 80,
  },
  circle: {
    height: 70,
    width: 70,
    backgroundColor: 'white',
    borderRadius: 35,
    //opacity:0.5,
    alignItems: 'center',
    justifyContent: 'center',
    blurRadius: 1,
  },
});
