import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import BackArrow from '../../components/ui/backArrow';
import Logosmall from '../../components/ui/Logosmall';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Auth} from 'aws-amplify';

const ReviewSchema = yup.object({
  username: yup
    .string()
    .required('Required!')
    .min(4, 'Too short, like your pp :)')
    .max(20, "too long, didn't ask your mum's body count"),
  // email: yup.string().email("Invalid email").required("Required!"),
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

const ResetPassword = ({navigation}) => {
  //const submitUsername = true;
  const [submitUsername, setSubmitUsername] = useState(false);

  function BackButton() {
    navigation.navigate('SignInScreen');
  }
  async function ResetButton({username, otp, newpassword}) {
    if (!submitUsername) {
      try {
        const response = await Auth.forgotPassword(username);
        setSubmitUsername(true);
        console.log(response);
        setSubmitUsername(true);
      } catch (e) {
        Alert.alert('oops', e.message);
      }
    } else {
      try {
        const response = await Auth.forgotPasswordSubmit(
          username,
          otp,
          newpassword,
        );
        console.log(response);
        Alert.alert('Success!', 'Your password has been reset');
        navigation.navigate('SignInScreen');
      } catch (e) {
        Alert.alert('oops', e.message);
      }
    }
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
                <Text style={styles.title}>Reset Password</Text>
              </View>
              <Formik
                initialValues={{username: '', otp: '', newpassword: ''}}
                onSubmit={ResetButton}
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
                    <View style={styles.inputContainer}>
                      {!submitUsername && (
                        <View>
                          <Input
                            placeholder="Username"
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                          />
                        </View>
                      )}
                      {submitUsername && (
                        <View>
                          <Input
                            placeholder="OTP"
                            keyboardType="numeric"
                            onChangeText={handleChange('otp')}
                            onBlur={handleBlur('otp')}
                            value={values.otp}
                          />
                          <Input
                            secureTextEntry={true}
                            placeholder="New Password"
                            onChangeText={handleChange('newpassword')}
                            onBlur={handleBlur('newpassword')}
                            value={values.newpassword}
                          />
                        </View>
                      )}
                      <Text style={[styles.subtitle, styles.red]}>
                        {touched.otp && errors.otp}
                      </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                      <Button onPress={handleSubmit} style={styles.button}>
                        Reset Password
                      </Button>
                    </View>
                  </>
                )}
              </Formik>
            </View>
            <View style={styles.dummy} />
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ResetPassword;

const width = Dimensions.get('window').width;
//console.log(StatusBar.currentHeight)

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
    flex: 2,
    //backgroundColor: "violet",
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#383838',
    fontFamily: 'satoshi-bold',
    fontSize: 35,
    textAlign: 'center',
    //marginBottom: 25,
    textAlignVertical: 'center',
  },
  inputContainer: {
    flex: 5,
    //backgroundColor: "pink",
    alignContent: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  button: {
    marginBottom: 40,
  },
  buttonContainer: {
    flex: 3,
    //backgroundColor: "coral",
    minHeight: 80,
  },
  red: {
    textAlign: 'center',
    color: 'red',
  },
});
