import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'react-native';

function PasswordInput(props: { placeholder: any; value: any; onChangeText: any; keyBoardType: any }) {
  const { placeholder, value, onChangeText } = props;
  const [showPassword, setShowPassword] = useState(false);
  const { colors } = useTheme()
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={{ flexDirection: 'row',
    // color: 'black',
    borderColor: colors.border,
    borderWidth: 1.0,
    borderRadius: 10,
    alignItems: 'center',
    alignContent: 'center',
    marginStart: 15,
    marginEnd: 15,
    marginTop: 5,
    flex: 1,
    paddingStart: 10,
    
    }}>
      <TextInput
        style={{ flex: 1,
          color: colors.text,
          fontSize: 17}}
        secureTextEntry={!showPassword}
        placeholder={placeholder}
        value={value}
        placeholderTextColor="gray"
        onChangeText={onChangeText}
        autoCapitalize='none'
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
        <Image source={!showPassword ? require("../assets/eyeOff.png") : require("../assets/eyesOn.png")} style={{ resizeMode: 'center' }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    flexDirection: 'row',
    color: 'black',
  
    borderWidth: 0.7,
    borderRadius: 10,
    alignItems: 'center',
    alignContent: 'center',
    marginStart: 15,
    marginEnd: 15,
    marginTop: 5,
    flex: 1,
    paddingStart: 10,
    fontSize: 18
  },
  input: {
   
  },
  iconContainer: {
    padding: 10,
  },
});

export default PasswordInput;
