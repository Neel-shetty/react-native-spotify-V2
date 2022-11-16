import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React from 'react';
// import {StatusBar} from 'expo-status-bar';
// import Logo from '../../components/ui/Logo';
import Logobig from '../../components/ui/Logobig';
import Button from '../../components/ui/Button';
import BackArrow from '../../components/ui/backArrow';

const RegisterOrSignIn = ({navigation}) => {
  function RegisterButton() {
    navigation.navigate('RegisterScreen');
  }

  function SignInButton() {
    navigation.navigate('SignInScreen');
  }

  function BackButton() {
    navigation.navigate('ChooseMode');
  }

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.rootContainer}>
        <Image
          source={require('../../../assets/images/billieLogin.png')}
          style={styles.image}
        />
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={BackButton}>
            <Image
              source={require('../../../assets/images/Ellipse.png')}
              style={styles.backButton}
            />
            <BackArrow />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <Logobig />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Enjoy Listening to Music</Text>
          <Text style={styles.subtitle}>
            Spotify is a proprietary Swedish audio streaming and media services
            provider
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              textStyle={styles.buttonTextStyle}
              onPress={RegisterButton}>
              Register
            </Button>
            <TouchableOpacity onPress={SignInButton}>
              <Text style={styles.signInButtonTextStyle}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.view} />
        </View>
      </View>
    </>
  );
};

export default RegisterOrSignIn;

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
//console.log(height,width)

const styles = StyleSheet.create({
  backButtonContainer: {
    //alignItems: 'center',
    //paddingHorizontal: 20,
    //paddingTop: 10,
    //marginTop: 0
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'center',
    //backgroundColor: 'red'
  },
  logoContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
    //backgroundColor: "blue",
    paddingBottom: 20,
    //position: "relative",
    //top: 200,
  },
  titleContainer: {
    flex: 3,
    //backgroundColor: "pink",
    alignItems: 'center',
    justifyContent: 'center',
    //minHeight: 12
    //width: width,
    //paddingHorizontal: 50,
    //height: 200,
    //position: "absolute",
    //top: height / 2.5,
  },
  imageContainer: {
    flex: 7,
    //backgroundColor: "coral",
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    //backgroundColor: "purple",
    //alignSelf: "center",
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-between'
    //position: "absolute",
    //bottom: 360,
    //paddingHorizontal: 50,
    //justifyContent: "center",
    //alignContent: "center",
  },
  title: {
    color: '#383838',
    fontFamily: 'satoshi-bold',
    fontSize: width < 400 ? 27 : 35,
    textAlign: 'center',
    marginBottom: 25,
    textAlignVertical: 'center',
  },
  subtitle: {
    fontFamily: 'satoshi-medium',
    fontSize: width < 400 ? 16 : 23,
    color: '#797979',
    paddingHorizontal: 50,
    //backgroundColor: "red",
  },
  textButton: {
    fontFamily: 'satoshi-bold',
    fontSize: 25,
    color: '#313131',
  },
  view: {
    backgroundColor: 'blue',
    flex: 3,
  },
  image: {
    position: 'absolute',
    width: 440,
    height: height > 900 ? 554 : 440,
    bottom: 0,
    left: -5,
  },
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    width: 147,
    height: 73,
    right: 70,
  },
  buttonTextStyle: {
    fontFamily: 'satoshi-medium',
    fontSize: 25,
    color: 'white',
  },
  signInButtonTextStyle: {
    fontFamily: 'satoshi-medium',
    fontSize: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
    //position: "relative",
    right: 65,
    //top: 22,
    color: '#313131',
  },
  backButton: {
    top: 28,
    right: 3,
  },
});
