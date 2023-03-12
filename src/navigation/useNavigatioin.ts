import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  RouteProp,
  useNavigation as useNavigationRA,
  useRoute,
} from "@react-navigation/native";

export const useNavigation = () => {
  const bottomNavigation = useNavigationRA<BottomTabNavigationProp<any, any>>();
  return {
    bottomNavigation,
  };
};

export const useParams = () => {
  const route = useRoute<RouteProp<any, any>>();
  return route.params;
};
