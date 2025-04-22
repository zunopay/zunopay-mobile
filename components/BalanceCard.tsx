import { StyleSheet, Text, View } from "react-native";

export function BalanceCard () {
    return (
        <View style={styles.container}>
            <Text style={styles.balance} >Balance: 124 USD</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
      maxHeight: 50,
      padding: 5,
      margin: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    balance: {
        color: '#fff',
        fontSize: 20,
    }
  });