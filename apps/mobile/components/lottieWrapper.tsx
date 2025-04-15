// components/LottieWrapper.tsx
import { Platform } from 'react-native';

let LottieView: any;

if (Platform.OS === 'web') {
  LottieView = require('lottie-react').default;
} else {
  LottieView = require('lottie-react-native');
}

export default LottieView;