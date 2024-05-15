import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "@/screens/HomeScreen";
import { LivestreamScreen } from "@/screens/LivestreamScreen";

const RootStack = createStackNavigator<RootStackParamList>()

export default function Root() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Livestream" component={LivestreamScreen} options={{ presentation: 'modal'}} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
