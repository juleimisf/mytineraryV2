import { Alert } from "react-native";
import { STRINGS } from "./strings.js";

export const handleExplore = () => {
  Alert.alert(STRINGS.ALERT_TITLE, STRINGS.ALERT_MESSAGE, [
    { text: STRINGS.ALERT_OK },
  ]);
};
