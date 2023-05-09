import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const CustomButton = (props: any) => (
  <TouchableOpacity  style={props.buttonStyle} onPress={props.onPress}>
    <Text  style={props.titleStyle}>
      {props.title}
    </Text>
  </TouchableOpacity>
);
export default CustomButton;
