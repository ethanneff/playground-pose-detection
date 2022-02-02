import { Camera } from "expo-camera";
import * as ScreenOrientation from "expo-screen-orientation";
import { useAppSelector } from "./../../redux/hooks";
import { Constants } from "./constants";

export const usePoseUtils = () => {
  const orientation = useAppSelector((state) => state.orientation.direction);
  const cameraType = useAppSelector((state) => state.pose.cameraType);

  const isPortrait =
    orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
    orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN;

  const getOutputTensorWidth =
    isPortrait || Constants.android
      ? Constants.tensorWidth
      : Constants.tensorHeight;

  const getOutputTensorHeight =
    isPortrait || Constants.android
      ? Constants.tensorHeight
      : Constants.tensorWidth;

  const getTextureRotationAngleInDegrees = () => {
    if (Constants.android) {
      return 0;
    }
    switch (orientation) {
      case ScreenOrientation.Orientation.PORTRAIT_DOWN:
        return 180;
      case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
        return cameraType === Camera.Constants.Type.front ? 270 : 90;
      case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
        return cameraType === Camera.Constants.Type.front ? 90 : 270;
      default:
        return 0;
    }
  };

  return {
    isPortrait,
    getOutputTensorWidth,
    getOutputTensorHeight,
    getTextureRotationAngleInDegrees,
  };
};
