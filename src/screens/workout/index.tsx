import { useNavigation } from "@react-navigation/native";
import * as posedetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import {
  bundleResourceIO,
  cameraWithTensors
} from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import { ExpoWebGLRenderingContext } from "expo-gl";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import _ from "underscore";
import { Hud } from "../../components/hud";
import {
  poseSlice,
  useAppDispatch,
  useAppSelector
} from "../../middleware/redux";
import { Route, UseNavigation } from "../../types";
import { CameraSwitcher } from "./CameraSwitcher";
import { Constants } from "./constants";
import { Fps } from "./FPS";
import { Poses } from "./Poses";
import { usePoseUtils } from "./usePoseUtils";

const TensorCamera = cameraWithTensors(Camera);

const styles = StyleSheet.create({
  landscape: {
    height: Constants.camWidth,
    marginLeft: Dimensions.get("window").height / 2 - Constants.camHeight / 2,
    width: Constants.camHeight,
  },
  portrait: {
    height: Constants.camHeight,
    marginTop: Dimensions.get("window").height / 2 - Constants.camHeight / 2,
    width: Constants.camWidth,
  },
});

export const Workout = () => {
  const { navigate, goBack } = useNavigation<UseNavigation>();
  const dispatch = useAppDispatch();
  const [model, setModel] = useState<posedetection.PoseDetector>();
  const cameraType = useAppSelector((state) => state.pose.cameraType);
  const rafId = useRef<number | null>(null);
  const {
    isPortrait,
    getOutputTensorWidth,
    getOutputTensorHeight,
    getTextureRotationAngleInDegrees,
  } = usePoseUtils();

  useEffect(() => {
    const prepare = async () => {
      rafId.current = null;

      // Camera permission.
      await Camera.requestCameraPermissionsAsync();

      // Wait for tfjs to initialize the backend.
      await tf.ready();

      // Load movenet model.
      // https://github.com/tensorflow/tfjs-models/tree/master/pose-detection
      const movenetModelConfig: posedetection.MoveNetModelConfig = {
        modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        enableSmoothing: true,
      };
      if (Constants.loadModelFromBundle) {
        const modelJson = require("../../models/model.json");
        const modelWeights1 = require("../../models/group1-shard1of2.bin");
        const modelWeights2 = require("../../models/group1-shard2of2.bin");
        movenetModelConfig.modelUrl = bundleResourceIO(modelJson, [
          modelWeights1,
          modelWeights2,
        ]);
      }
      const newModel = await posedetection.createDetector(
        posedetection.SupportedModels.MoveNet,
        movenetModelConfig
      );
      setModel(newModel);
    };

    prepare();

    return () => {
      if (!rafId.current) return;
      cancelAnimationFrame(rafId.current);
      rafId.current = 0;
    };
  }, [dispatch]);

  const handleCameraStream = useCallback(
    (
      images: IterableIterator<tf.Tensor3D>,
      updatePreview: () => void,
      gl: ExpoWebGLRenderingContext
    ) => {
      const loop = () => {
        const imageTensor = images.next().value as tf.Tensor3D;
        const startTs = Date.now();
        const getPose = _.throttle(async () => {
          const poses = await model?.estimatePoses(
            imageTensor,
            undefined,
            Date.now()
          );
          if (!poses) return;
          dispatch(poseSlice.actions.updatePoses(poses));
        }, 250);
        getPose();
        const latency = Date.now() - startTs;
        const fps = Math.floor(1000 / latency);
        dispatch(poseSlice.actions.updateFps(fps));

        tf.dispose([imageTensor]);

        if (rafId.current === 0) {
          return;
        }

        // Render camera preview manually when autorender=false.
        if (!Constants.autoRender) {
          updatePreview();
          gl.endFrameEXP();
        }

        rafId.current = requestAnimationFrame(loop);
      };

      loop();
    },
    [dispatch, model]
  );

  const handleNav = useCallback(
    (location: Route) => () => {
      if (location === "landing") {
        goBack();
        return;
      }
      navigate(location);
    },
    [goBack, navigate]
  );

  if (!model) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={isPortrait ? styles.portrait : styles.landscape}>
        {/* @ts-ignore */}
        <TensorCamera
          autorender={Constants.autoRender}
          onReady={handleCameraStream}
          resizeDepth={3}
          resizeHeight={getOutputTensorHeight}
          resizeWidth={getOutputTensorWidth}
          rotation={getTextureRotationAngleInDegrees()}
          style={{ width: "100%", height: "100%", zIndex: 1 }}
          type={cameraType}
        />
        <Poses />
        <Hud>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Fps />
            <CameraSwitcher />
          </View>
          <Button onPress={handleNav("settings")} title="settings" />
          <Button onPress={handleNav("results")} title="results" />
          <Button onPress={handleNav("landing")} title="exit" />
        </Hud>
      </View>
    </View>
  );
};
