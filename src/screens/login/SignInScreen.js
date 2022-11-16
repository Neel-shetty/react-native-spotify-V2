import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import React from 'react';
import Button from '../../components/ui/Button';
import Logosmall from '../../components/ui/Logosmall';
import BackArrow from '../../components/ui/backArrow';
import Input from '../../components/ui/Input';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Auth} from 'aws-amplify';

const ReviewSchema = yup.object({
  username: yup
    .string()
    .required('Required!')
    .min(4, 'Too short, like your pp :)')
    .max(20, "too long, didn't ask your mum's body count"),
  password: yup
    .string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .uppercase(1, 'Must include atleast 1 uppercase letter')
    .required('Required!')
    .test('isnum', 'must include atleast 1 number', val => {
      return /\d/.test(val);
    }),
});

const SignInScreen = ({navigation}) => {
  // const [error, seterror] = useState();
  function BackButton() {
    navigation.navigate('RegisterOrSignIn');
  }
  function RegisterButton() {
    navigation.navigate('RegisterScreen');
  }
  function ForgotButton() {
    navigation.navigate('ResetPassword');
  }
  function SupportButton() {
    Linking.openURL('https://support.spotify.com/us/category/account-help/');
  }
  async function SignInButton(values) {
    console.log(values);
    const {username, password} = values;
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
    } catch (e) {
      Alert.alert('oops', e.message);
    }
    //console.log(user)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.rootContainer}>
        <View style={styles.rootContainer}>
          <KeyboardAvoidingView
            style={styles.rootContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            enabled={Platform.OS === 'ios' ? true : false}>
            <View style={styles.main}>
              <View style={styles.header}>
                <View style={styles.backButtonContiner}>
                  <TouchableOpacity onPress={BackButton}>
                    <Image
                      source={require('../../../assets/images/Ellipse.png')}
                      style={styles.backButton}
                    />
                    <BackArrow style={styles.backArrow} />
                  </TouchableOpacity>
                </View>
                <View style={styles.logoContainer}>
                  <Logosmall />
                </View>
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Sign In</Text>
                <View style={styles.subtitleContainer}>
                  <Text style={styles.subtitle}>If You Need Any Support</Text>
                  <TouchableOpacity onPress={SupportButton}>
                    <Text style={styles.subtitle2}> Click Here</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Formik
                initialValues={{username: '', password: ''}}
                onSubmit={values => {
                  SignInButton(values);
                }}
                validationSchema={ReviewSchema}>
                {({
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  values,
                  errors,
                  touched,
                  isSubmitting,
                }) => (
                  <>
                    {/* {seterror(errors)} */}
                    <View style={styles.inputContainer}>
                      <Input
                        placeholder="Username"
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                        style={styles.inputError}
                        error={errors}
                        isSubmitting={isSubmitting}
                      />

                      <Text style={[styles.subtitle, styles.red]}>
                        {touched.username && errors.username}
                      </Text>
                      <Input
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        error={errors}
                      />

                      <Text style={[styles.subtitle, styles.red]}>
                        {touched.password && errors.password}
                      </Text>

                      <TouchableOpacity onPress={ForgotButton}>
                        <Text style={styles.recover}>Forgot password</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                      <Button onPress={handleSubmit} style={styles.button}>
                        Sign In
                      </Button>
                    </View>
                  </>
                )}
              </Formik>
            </View>
            <View style={styles.dummy}>
              <View style={styles.dividerContainer}>
                <View style={styles.div1} />
                <Text style={styles.subtitle}> OR </Text>
                <View style={styles.div2} />
              </View>
              <View style={styles.bottomMenu}>
                <View style={styles.imageContainer}>
                  <TouchableOpacity>
                    <Image
                      source={require('../../../assets/images/googlelogo.png')}
                      style={styles.imagebox}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require('../../../assets/images/applelogo.png')}
                      style={styles.imagebox2}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.questionContainer}>
                  <Text style={styles.question}>Not A Member ? </Text>
                  <TouchableOpacity onPress={RegisterButton}>
                    <Text style={styles.register}>Register Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;

// const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
    //paddingTop: StatusBar.currentHeight/1
  },
  main: {
    flex: 2,
    //backgroundColor: "red",
  },
  dummy: {
    flex: 1,
    //backgroundColor: 'pink'
  },
  header: {
    flex: 2,
    //backgroundColor: "gold",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButtonContiner: {
    //flex: 1,
    paddingLeft: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
    //flexDirection: 'row'
  },
  backArrow: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: 15,
  },
  backButton: {
    top: 13,
    //right: 3,
  },
  logoContainer: {
    //flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    //flexDirection: 'row',
    alignSelf: 'center',
    //backgroundColor: "red",
    paddingRight: width / 2 - 50,
    //paddingTop: 55
  },
  titleContainer: {
    flex: 3,
    //backgroundColor: "violet",
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#383838',
    fontFamily: 'satoshi-bold',
    fontSize: width < 400 ? 27 : 35,
    textAlign: 'center',
    marginBottom: 20,
    textAlignVertical: 'center',
    //paddingBottom: 25
  },
  subtitle: {
    fontFamily: 'satoshi-medium',
    fontSize: width < 400 ? 13 : 15,
    color: '#797979',
    textAlign: 'center',
    //backgroundColor: "red",
  },
  subtitle2: {
    fontFamily: 'satoshi-medium',
    fontSize: width < 400 ? 13 : 15,
    color: '#42C83C',
    //backgroundColor: "red",
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //marginVertical: 20
  },
  inputContainer: {
    flex: 4,
    //backgroundColor: "pink",
    alignContent: 'center',
    justifyContent: 'center',
    minHeight: 130,
  },
  inputError: {
    //backgroundColor: 'red',
    //opacity: 0.2,
  },
  recover: {
    fontSize: width < 400 ? 14 : 16,
    fontFamily: 'satoshi-medium',
    padding: 5,
    color: '#383838',
    //left: 90,
    textAlign: 'center',
    //paddingHorizontal: 90
  },
  button: {
    //marginBottom: 40,
  },
  buttonContainer: {
    flex: 3,
    //backgroundColor: "violet",
    alignItems: 'center',
    //padding: 20
  },
  dividerContainer: {
    //backgroundColor: "red",
    // top: 370,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 50,
  },
  div1: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#797979',
    //borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    //backgroundColor: 'blue'
  },
  div2: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#797979',
    //borderStyle: 'dashed',
    marginLeft: 5,
    //backgroundColor: 'red'
  },
  dividerText: {
    color: '#383838',
  },
  dividerTextM: {
    fontFamily: 'satoshi-medium',
    color: '#383838',
  },
  bottomMenu: {
    //backgroundColor: 'violet',
    //width: width - 50,
    //height: 250,
    alignItems: 'center',
    //top: 400,
    flex: 1,
    justifyContent: 'center',
    // borderTopRightRadius: 75,
    // borderTopLeftRadius: 75,
  },
  imagebox: {
    height: 40,
    width: 40,
    alignContent: 'center',
    marginHorizontal: 50,
  },
  imagebox2: {
    height: 35,
    width: 35,
    alignContent: 'center',
    marginHorizontal: 50,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
    //backgroundColor: 'red',
    //minWidth: 250,
    //left: 5,
  },
  questionContainer: {
    flex: 1,
    //backgroundColor:'coral',
    alignItems: 'center',
    justifyContent: 'center',
    //top: 0,
    flexDirection: 'row',
  },
  question: {
    fontSize: 16,
    fontFamily: 'satoshi-medium',
    color: '#383838',
  },
  register: {
    fontSize: 16,
    fontFamily: 'satoshi-bold',
    color: '#288CE9',
  },
  red: {textAlign: 'center', color: 'red'},
});

/* const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  backButton: {
    top: 28,
    right: 3,
  },
  backButtonContainer: {
    //alignItems: 'center'
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    position: "absolute",
    left: width / 2.5,
    top: 38,
  },
  titleContainer: {
    flex: 1,
    //backgroundColor: 'red',
    alignItems: "center",
    justifyContent: "center",
    width: width,
    paddingHorizontal: 50,
    height: 200,
    position: "absolute",
    top: height / 20,
  },
  title: {
    color: "#383838",
    fontFamily: "satoshi-bold",
    fontSize: 35,
    textAlign: "center",
    marginBottom: 25,
    //position: "relative",
    //bottom: height / 6,
  },
  subtitle: {
    fontFamily: "satoshi-medium",
    fontSize: 15,
    color: "#797979",
    //backgroundColor: "red",
  },
  subtitle2: {
    fontFamily: "satoshi-medium",
    fontSize: 15,
    color: "#42C83C",
    //backgroundColor: "red",
  },
  subtitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    //backgroundColor: 'red',
    top: 250,
  },
  recover: {
    fontSize: 16,
    fontFamily: "satoshi-medium",
    padding: 5,
    color: "#383838",
    left: 90,
    //textAlign: 'left'
  },
  view: {
    //backgroundColor: "red",
    flex: 1,
    position: "absolute",
    top: 240,
    alignSelf: "center",
  },
  button: {
    width: 325,
    height: 80,
  },
  dividerContainer: {
    //backgroundColor: "red",
    top: 370,
    flexDirection: "row",
    alignContent: "center",
  },
  dividerText: {
    color: "#383838",
  },
  dividerTextM: {
    fontFamily: "satoshi-medium",
    color: "#383838",
  },
  bottomMenu: {
    //backgroundColor: 'red',
    width: width - 50,
    height: 250,
    alignSelf: "center",
    top: 400,
  },
  imagebox: {
    height: 40,
    width: 40,
    alignContent: "center",
  },
  imagebox2: {
    height: 35,
    width: 35,
    alignContent: "center",
  },
  imageContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-evenly",
    //backgroundColor: 'red',
    minWidth: 250,
    left: 5,
  },
  questionContainer: {
    flex: 1,
    //backgroundColor:'red',
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    flexDirection: "row",
  },
  question: {
    fontSize: 16,
    fontFamily: "satoshi-medium",
    color: "#383838",
  },
  register: {
    fontSize: 16,
    fontFamily: "satoshi-bold",
    color: "#288CE9",
  },
}); */
