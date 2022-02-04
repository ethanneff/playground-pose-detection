import {
  addOrientationChangeListener,
  getOrientationAsync,
  removeOrientationChangeListener,
  Subscription,
} from "expo-screen-orientation";
import { useCallback, useEffect, useRef } from "react";
import { orientationSlice, useAppDispatch } from "../redux";

export const useOrientation = () => {
  const dispatch = useAppDispatch();
  const subscription = useRef<Subscription | null>(null);

  const onLoad = useCallback(async () => {
    const curOrientation = await getOrientationAsync();
    dispatch(orientationSlice.actions.setOrientation(curOrientation));

    subscription.current = addOrientationChangeListener((event) => {
      dispatch(
        orientationSlice.actions.setOrientation(
          event.orientationInfo.orientation
        )
      );
    });
  }, [dispatch]);

  useEffect(() => {
    onLoad();
    return () => {
      if (!subscription.current) return;
      removeOrientationChangeListener(subscription.current);
    };
  }, [onLoad]);
};
