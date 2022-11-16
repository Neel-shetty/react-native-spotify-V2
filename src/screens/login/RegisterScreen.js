import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Linking,
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
  email: yup.string().email('Invalid email').required('Required!'),
  password: yup
    .string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .uppercase(1, 'Must include atleast 1 uppercase letter')
    .required('Required!')
    .test('isnum', 'must include atleast 1 number', val => {
      return /\d/.test(val);
    }),
  newpassword: yup
    .string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .uppercase(1, 'Must include atleast 1 uppercase letter')
    .required('Required!')
    .test('isnum', 'Must include atleast 1 number', val => {
      return /\d/.test(val);
    }),
  otp: yup.string().required('Required!'),
});

const RegisterScreen = ({navigation}) => {
  function BackButton() {
    navigation.navigate('RegisterOrSignIn');
  }
  function LoginButton() {
    navigation.navigate('SignInScreen');
  }
  function TermsButton() {
    Linking.openURL('https://www.spotify.com/us/legal/end-user-agreement/');
  }
  function PrivacyButton() {
    Linking.openURL('https://www.spotify.com/us/legal/privacy-policy/');
  }
  async function SignUpButton(values) {
    const {username, email, password} = values;
    console.log(values);

    try {
      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          //user: username
        },
        /* autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        }, */
      });
      console.log(user);
      navigation.navigate('ConfirmScreen', {username});
    } catch (e) {
      Alert.alert('oops', e.message);
      console.log(e);
      if (e.message === 'User already exists') {
        navigation.navigate('ConfirmScreen', {username});
        Auth.resendSignUp(username);
        Alert.alert('Account exits', 'verify your email');
      }
    }
  }

  /* function ConfirmScreen() {
    navigation.navigate('ConfirmScreen');
  } */

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.rootContainer}>
        <View style={styles.header}>
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
            <Logosmall />
          </View>
        </View>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Register</Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>If You Need Any Support</Text>
              <TouchableOpacity>
                <Text style={styles.subtitle2}> Click Here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Formik
            initialValues={{username: '', email: '', password: ''}}
            onSubmit={SignUpButton}
            validationSchema={ReviewSchema}>
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.input1}>
                  <Input
                    placeholder="Username"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                  />
                  <Text style={[styles.subtitle, styles.red]}>
                    {touched.username && errors.username}
                  </Text>
                </View>
                <View style={styles.input1}>
                  <Input
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                </View>
                <View style={styles.input2}>
                  <Input
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                </View>
                <View style={styles.view}>
                  <Button style={styles.button} onPress={handleSubmit}>
                    Create Account
                  </Button>
                </View>
                <View>
                  <View style={styles.subView}>
                    <Text style={styles.subtitle}>
                      By registering, you confirm that you accept our
                      <Text style={styles.subtitle2} onPress={TermsButton}>
                        {' '}
                        Terms of Use{' '}
                      </Text>{' '}
                      and{' '}
                      <Text style={styles.subtitle2} onPress={PrivacyButton}>
                        Privacy Policy{' '}
                      </Text>
                    </Text>
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
        <View style={styles.dividerContainer}>
          <Text style={styles.dividerText}>
            {'           '}
            -------------------------------------------------
          </Text>
          <Text style={styles.dividerTextM}> OR </Text>
          <Text style={styles.dividerText}>
            -------------------------------------------------
          </Text>
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
            <Text style={styles.question}>Do You Have An Account? </Text>
            <TouchableOpacity onPress={LoginButton}>
              <Text style={styles.register}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    position: 'absolute',
    left: width / 2.5,
    top: 38,
  },
  titleContainer: {
    flex: 1,
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    paddingHorizontal: 50,
    height: 200,
    position: 'absolute',
    top: height / 20,
  },
  title: {
    color: '#383838',
    fontFamily: 'satoshi-bold',
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 25,
    //position: "relative",
    //bottom: height / 6,
  },
  subtitle: {
    fontFamily: 'satoshi-medium',
    fontSize: 15,
    color: '#797979',
    textAlign: 'center',
    //backgroundColor: "red",
  },
  subtitle2: {
    fontFamily: 'satoshi-medium',
    fontSize: 15,
    color: '#42C83C',
    //backgroundColor: "red",
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    //backgroundColor: 'red',
    top: 250,
  },
  recover: {
    fontSize: 16,
    fontFamily: 'satoshi-medium',
    padding: 5,
    color: '#383838',
    left: 90,
  },
  view: {
    //backgroundColor: "red",
    flex: 1,
    position: 'absolute',
    top: 240 + 130,
    alignSelf: 'center',
  },
  button: {
    width: 325,
    height: 80,
  },
  dividerContainer: {
    //backgroundColor: "red",
    top: 370,
    flexDirection: 'row',
    alignContent: 'center',
  },
  dividerText: {
    color: '#383838',
  },
  dividerTextM: {
    fontFamily: 'satoshi-medium',
    color: '#383838',
  },
  bottomMenu: {
    //backgroundColor: 'red',
    width: width - 50,
    height: 250,
    alignSelf: 'center',
    top: 400,
  },
  imagebox: {
    height: 40,
    width: 40,
    alignContent: 'center',
  },
  imagebox2: {
    height: 35,
    width: 35,
    alignContent: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    //backgroundColor: 'red',
    minWidth: 250,
    left: 5,
  },
  questionContainer: {
    flex: 1,
    //backgroundColor:'red',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
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
  red: {
    textAlign: 'center',
    color: 'red',
  },
  subView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
});
