import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
// import {useSelector, useDispatch} from 'react-redux';
import PlaylistData from '../../../assets/dummydata/PlaylistData';
import {unlikeAll, likeAll} from '../../redux/features/like/likeSlice';
// import likeContainer from '../../components/PlaylistScreenComponents/likeContainer'

const PlaylistScreen = () => {
  // const dispatch = useDispatch();
  const {likedSongs, isLoading, amount} = useSelector(store => store.like);
  if (amount < 1) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>no liked songs, like a few first</Text>
      </View>
    );
  }
  if (amount > 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>{amount}</Text>
        <Text>
          {likedSongs.map(item => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                }}
                key={item.key}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    //padding: 20,
                  }}>
                  <Text>{item.SongName}</Text>
                  <Text>{item.Artist}</Text>
                  <Text>{item.duration}</Text>
                  <Text>{item.like}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </Text>
        <Button 
        title="unlike all" 
        // onPress={() => dispatch(unlikeAll())} 
        />
        <Button title="like all" 
        // onPress={() => dispatch(likeAll())} 
        />
      </View>
    );
  }
};

export default PlaylistScreen;

const styles = StyleSheet.create({});
