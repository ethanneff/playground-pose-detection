import { Dimensions, Platform } from "react-native";

const ios = Platform.OS === "ios";
const android = Platform.OS === "android";
const tensorWidth = 180;
const { width } = Dimensions.get("window");
const camWidth = width;

export const Constants = {
  ios,
  android,
  tensorWidth,
  tensorHeight: tensorWidth / (ios ? 9 / 16 : 3 / 4),
  camWidth,
  camHeight: camWidth / (ios ? 9 / 16 : 3 / 4),
  minKeyPointScore: 0.3,
  autoRender: false,
  loadModelFromBundle: false,
  buttonColor: "rgba(255, 255, 255, .7)",
};
