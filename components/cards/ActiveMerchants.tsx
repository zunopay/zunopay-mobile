import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

export function ActiveMerchants() {
  return (
    <View style={styles.container}>
      <Text>Active Merchants</Text>
      {
        <>
          <Merchant style={styles.merchant} />
          <Merchant style={styles.merchant} />
          <Merchant style={styles.merchant} />
        </>
      }
    </View>
  );
}

interface MerchantProps {
  style: StyleProp<ViewStyle>;
}

const Merchant: React.FC<MerchantProps> = ({ style }) => {
  return (
    <View style={style}>
        <Text style={styles.merchantLogo}></Text>
      <View>
        <Text style={styles.merchantName}> Al - Baik</Text>
        <Text style={styles.merchantLocation}> New Delhi, India</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    maxHeight: 60,
    marginTop: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  merchant: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "blue",
    marginTop: 5,
    width: 300,
    borderRadius: 5,
    paddingRight: 30,
    paddingLeft: 10,
  },
  merchantLogo: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
  },
  merchantName: {
    color: "white",
  },
  merchantLocation: {
    color: "white",
  },
});
