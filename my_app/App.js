import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./src/screens/HomeScreen";
import EventScreen from "./src/screens/EventScreen";
import PurchaseScreen from "./src/screens/PurchaseScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import RecsScreen from "./src/screens/RecsScreen";
import PreferenceScreen from "./src/screens/PreferenceScreen";
import MessageScreen from "./src/screens/MessageScreen";
import AboutScreen from "./src/screens/AboutScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Event: EventScreen,
    Purchase: PurchaseScreen,
    Login: LoginScreen,
    Recs: RecsScreen,
    Preferences: PreferenceScreen,
    Messages: MessageScreen,
    About: AboutScreen
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      title: "Sailthru Demo App"
    }
  }
);

export default createAppContainer(navigator);
