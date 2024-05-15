import { RootStackScreenProps } from "@/navigation/types";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = RootStackScreenProps<'Home'>

export function HomeScreen({ navigation}: Props) {
  const onPresentLivestream = () => {
    navigation.push('Livestream')
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={onPresentLivestream} hitSlop={24}>
        <Text>Present livestream</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  }
})
