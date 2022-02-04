import * as posedetection from "@tensorflow-models/pose-detection";
import { Camera } from "expo-camera";
import React from "react";
import Svg, { Circle } from "react-native-svg";
import { useAppSelector } from "../../middleware/redux";
import { Constants } from "./constants";
import { usePoseUtils } from "./usePoseUtils";

export const Poses = () => {
  const poses = useAppSelector((state) => state.pose.poses);
  const cameraType = useAppSelector((state) => state.pose.cameraType);
  const { isPortrait, getOutputTensorWidth, getOutputTensorHeight } =
    usePoseUtils();

  if (!poses.length) {
    return null;
  }

  const getXY = (k: posedetection.Keypoint) => {
    const flipX =
      Constants.android || cameraType === Camera.Constants.Type.back;
    const x = flipX ? getOutputTensorWidth - k.x : k.x;
    const { y } = k;
    const cx =
      (x / getOutputTensorWidth) *
      (isPortrait ? Constants.camWidth : Constants.camHeight);
    const cy =
      (y / getOutputTensorHeight) *
      (isPortrait ? Constants.camHeight : Constants.camWidth);

    return { cx, cy };
  };

  return (
    <Svg
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 20,
      }}
    >
      {poses[0].keypoints
        .filter((k) => (k.score ?? 0) > Constants.minKeyPointScore)
        .map((k) => {
          const { cx, cy } = getXY(k);
          return (
            <Circle
              cx={cx}
              cy={cy}
              fill="#00AA00"
              key={`skeletonkp_${k.name}`}
              r="4"
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
    </Svg>
  );
};
