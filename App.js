/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
//  * @format
//  * @flow strict-local
 */

import React, {useEffect} from 'react';
import Navigator from './src/navigation/Navigator';
import TrackPlayer from 'react-native-track-player';
// import {Amplify} from 'aws-amplify';
// import awsconfig from './aws-exports';
// Amplify.configure(awsconfig);
import {QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient();

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  async function setup() {
    await TrackPlayer.setupPlayer();
  }

  useEffect(() => {
    setup();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navigator />
      </QueryClientProvider>
    </>
  );
};

export default App;
