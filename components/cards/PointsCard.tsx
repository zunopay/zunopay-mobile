import { StyleSheet, Text, View } from "react-native";

export function PointsCard () {
    return (
        <View style={styles.container}>
            <Text style={styles.points} >4522 Points</Text>
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
    points: {
        color: '#fff',
        fontSize: 20,
    }
  });