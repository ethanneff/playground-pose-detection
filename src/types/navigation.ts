import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type Route = "landing" | "results" | "settings" | "workout" | "dashboard";
export type RouteParams = { [key in Route]: undefined };
export type UseNavigation = NativeStackNavigationProp<RouteParams, Route>;
export type UseRouter = RouteProp<RouteParams, Route>;
