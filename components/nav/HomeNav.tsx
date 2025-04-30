import { Text, View } from "react-native";
import { LogoWithText } from "../logo/LogoWithText";
import { usePathname, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { RoutePath } from "@/enums/RoutePath";

export function HomeNav(){
    const pathname = usePathname()
    const router = useRouter()

    const isHomeScreen = (pathname == RoutePath.Home)

    return (
        <View style={styles.content}>
        {isHomeScreen ? <Text style={styles.sidenav} onPress={() => router.push(RoutePath.Settings)}></Text> : null}
        <LogoWithText />
      </View>
    )
}

const styles = StyleSheet.create({
    sidenav: {
      display: 'flex',
      backgroundColor: 'blue',
      width: 30,
      height: 30,
      borderRadius: 20,
      marginTop: 5
    },
    content: {
      display: 'flex',
      flexDirection: 'row',
      height: 50
    },
  })