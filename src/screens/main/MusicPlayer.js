import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SongCover from '../../components/MusicPlayerComponents/SongCover';
import SongInfo from '../../components/MusicPlayerComponents/SongInfo';
import ProgressBar from '../../components/MusicPlayerComponents/ProgressBar';
import Controls from '../../components/MusicPlayerComponents/Controls';
import DefaultHeader from '../../components/MusicPlayerComponents/DefaultHeader';
import LyricsButton from '../../components/MusicPlayerComponents/LyricsButton';

const MusicPlayer = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <DefaultHeader />
      </View>
      <View style={{flex: 3}}>
        <SongCover songId={0} />
      </View>
      <View style={{flex: 1}}>
        <SongInfo />
      </View>
      <View style={{flex: 1}}>
        <ProgressBar />
      </View>
      <View style={{flex: 1}}>
        <Controls />
      </View>
      <View style={{flex: 1}}>
        <LyricsButton />
      </View>
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({});
