import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';

const ProgressReport = ({navigation, route}) => {
  return <WebView source={{uri: route.params.url}} style={{flex: 1}} />;
};

export default ProgressReport;

const styles = StyleSheet.create({});
