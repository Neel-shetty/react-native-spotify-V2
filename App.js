/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
//  * @format
//  * @flow strict-local
 */

import React from 'react';
import Navigator from './src/navigation/Navigator';
// import {Amplify} from 'aws-amplify';
// import awsconfig from './aws-exports';
// Amplify.configure(awsconfig);

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  return (
    <>
      <Navigator />
    </>
  );
};

export default App;
