import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ZUNOPAY_SHORT_LOGO from '../../assets/images/logo.png';

export const LogoWithText: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={ZUNOPAY_SHORT_LOGO}
        style={styles.logo}
      />
      <Text style={styles.text}>Zuno<Text style={styles.pay}>Pay</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode:'contain',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
  },
  pay: {
    fontWeight:'700'
  }
});