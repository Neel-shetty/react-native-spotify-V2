import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from '../../components/ui/Button';
import {Auth} from 'aws-amplify';

const ProfileScreen = () => {
  async function logOut() {
    await Auth.signOut();
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={logOut}>Log Out</Button>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
