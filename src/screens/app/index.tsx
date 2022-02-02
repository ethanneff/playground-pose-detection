import * as posedetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import {
  bundleResourceIO,
  cameraWithTensors,
} from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import { ExpoWebGLRenderingContext } from "expo-gl";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import _ from "underscore";
import {
  orientationSlice,
  poseSlice,
  useAppDispatch,
  useAppSelector,
} from "../../redux";
import { CameraSwitcher } from "./CameraSwitcher";
import { Constants } from "./constants";
import { Fps } from "./FPS";
import { Poses } from "./Poses";
import { usePoseUtils } from "./usePoseUtils";

const TensorCamera = cameraWithTensors(Camera);

export const App = () => {
  const dispatch = useAppDispatch();
  const [model, setModel] = useState<posedetection.PoseDetector>();
  const cameraType = useAppSelector((state) => state.pose.cameraType);
  const rafId = useRef<number | null>(null);
  const {
    getOutputTensorWidth,
    getOutputTensorHeight,
    getTextureRotationAngleInDegrees,
  } = usePoseUtils();

  useEffect(() => {
    const prepare = async () => {
      rafId.current = null;

      // Set initial orientation.
      const curOrientation = await ScreenOrientation.getOrientationAsync();
      dispatch(orientationSlice.actions.setOrientation(curOrientation));

      // Listens to orientation change.
      ScreenOrientation.addOrientationChangeListener((event) => {
        dispatch(
          orientationSlice.actions.setOrientation(
            event.orientationInfo.orientation
          )
        );
      });

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
        const modelJson = require("../../../offline_model/model.json");
        const modelWeights1 = require("../../../offline_model/group1-shard1of2.bin");
        const modelWeights2 = require("../../../offline_model/group1-shard2of2.bin");
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

  if (!model) {
    return (
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        position: "relative",
        width: Constants.camWidth,
        height: Constants.camHeight,
        marginTop:
          Dimensions.get("window").height / 2 - Constants.camHeight / 2,
      }}
    >
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
      <Fps />
      <CameraSwitcher />
    </View>
  );
};
