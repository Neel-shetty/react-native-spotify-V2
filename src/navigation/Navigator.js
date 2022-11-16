import {View, ActivityIndicator, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import GetStartedScreen from '../screens/onboarding/GetStartedScreen';
// import RegisterOrSignIn from '../screens/login/RegisterOrSignIn';
// import RegisterScreen from '../screens/login/RegisterScreen';
// import SignInScreen from '../screens/login/SignInScreen';
// import ChooseMode from '../screens/onboarding/ChooseMode';
// import ResetPassword from '../screens/login/ResetPassword';
// import ConfirmScreen from '../screens/login/ConfirmScreen';
import {Auth, Hub} from 'aws-amplify';
// import HomeScreen from '../screens/main/HomeScreen';
// import ExploreScreen from '../screens/main/ExploreScreen';
// import PlaylistScreen from '../screens/main/PlaylistScreen';
// import ProfileScreen from '../screens/main/ProfileScreen';
import HomeIcon from '../components/ui/HomeIcon';
import HomeIconOutline from '../components/ui/HomeIconOutline';
import Explore from '../components/ui/Explore';
import ExploreOutline from '../components/ui/ExploreOutline';
import Heart from '../components/ui/Heart';
import HeartOutline from '../components/ui/HeartOutline';
import Profile from '../components/ui/Profile';
import ProfileOutline from '../components/ui/ProfileOutline';
import ChooseMode from '../screens/onboarding/ChooseMode';
// import MusicPlayer from '../screens/main/MusicPlayer';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigator = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    function listener(data) {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    }
    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  async function checkUser() {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(authUser);
    } catch (e) {
      console.log(e);
      setUser(null);
    }
  }

  if (user === undefined) {
    return (
      <View style={styles.ActivityIndicator}>
        <ActivityIndicator />
      </View>
    );
  }

  function MainApp() {
    return (
      <Tab.Navigator
        initialRouteName="ExploreScreen"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {height: 73},
          cardStyle: {
            backgroundColor: 'white',
          },
        }}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <View style={styles.flex1}>
                  {focused && <View style={styles.indicator} />}
                </View>
                <View style={styles.HomeScreen}>
                  <View>{focused ? <HomeIcon /> : <HomeIconOutline />}</View>
                </View>
              </View>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="ExploreScreen"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <View style={styles.flex1}>
                  {focused && <View style={styles.indicator} />}
                </View>
                <View style={styles.HomeScreen}>
                  <View>{focused ? <ExploreOutline /> : <Explore />}</View>
                </View>
              </View>
            ),
            headerShown: false,
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="PlaylistScreen"
          component={PlaylistScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <View style={styles.flex1}>
                  {focused && <View style={styles.indicator} />}
                </View>
                <View style={styles.HomeScreen}>
                  <View>{focused ? <Heart /> : <HeartOutline />}</View>
                </View>
              </View>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <View style={styles.flex1}>
                  {focused && <View style={styles.indicator} />}
                </View>
                <View style={styles.HomeScreen}>
                  <View>{focused ? <Profile /> : <ProfileOutline />}</View>
                </View>
              </View>
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainApp">
        {/* {user ? (
          <>
            <Stack.Screen
              name="MainApp"
              component={MainApp}
              options={() => ({
                tabBarStyle: {
                  display: 'none',
                },
                tabBarButton: () => null,
                headerShown: false,
              })}
            />
            <Stack.Screen
              name="MusicPlayer"
              // component={MusicPlayer}
              options={{headerShown: false}}
            />
          </>
        ) : ( */}
        {/* <> */}
        <Stack.Screen
          name="GetStarted"
          component={GetStartedScreen}
          options={() => ({
            tabBarStyle: {
              display: 'none',
            },
            tabBarButton: () => null,
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="ChooseMode"
          component={ChooseMode}
          options={() => ({
            tabBarStyle: {
              display: 'none',
            },
            tabBarButton: () => null,
            headerShown: false,
          })}
        />
        {/* <Stack.Screen
            name="RegisterOrSignIn"
            // component={RegisterOrSignIn}
            options={() => ({
              tabBarStyle: {
                display: 'none',
              },
              tabBarButton: () => null,
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="RegisterScreen"
            // component={RegisterScreen}
            options={() => ({
              tabBarStyle: {
                display: 'none',
              },
              tabBarButton: () => null,
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="ConfirmScreen"
            // component={ConfirmScreen}
            options={() => ({
              tabBarStyle: {
                display: 'none',
              },
              tabBarButton: () => null,
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="SignInScreen"
            // component={SignInScreen}
            options={() => ({
              tabBarStyle: {
                display: 'none',
              },
              tabBarButton: () => null,
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="ResetPassword"
            // component={ResetPassword}
            options={() => ({
              tabBarStyle: {
                display: 'none',
              },
              tabBarButton: () => null,
              headerShown: false,
            })}
          />
        </> */}
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  indicator: {
    width: 23,
    height: 4,
    backgroundColor: '#42C83C',
    borderBottomRightRadius: 3.5,
    borderBottomLeftRadius: 3.5,
    alignSelf: 'baseline',
    marginBottom: 41.5,
  },
  ActivityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex1: {
    flex: 1,
  },
  HomeScreen: {
    flex: 2.3,
    alignItems: 'center',
    //justifyContent: "center",
  },
});
