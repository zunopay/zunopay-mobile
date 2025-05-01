import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

export function ActiveMerchants () {
    return (
        <View style={styles.container}>
            <Text>Active Merchants</Text>
            {
                <>
                    <Merchant style={styles.merchant} />
                    <Merchant style={styles.merchant}/>
                    <Merchant style={styles.merchant}/>
                </>
            }
        </View>
    )
}


interface MerchantProps {
    style : StyleProp<ViewStyle>
}

const Merchant : React.FC<MerchantProps> = ({ style }) => {
    return (
        <View style={style} >
            <Text > Al - Baik</Text>
            <Text> New Delhi, India</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      maxHeight: 60,
      marginTop: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    merchant: {
        backgroundColor: 'blue',
        marginTop: 5,
        width: 300,
        borderRadius: 5
    }
  });