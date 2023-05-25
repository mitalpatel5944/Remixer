/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Animated,
  Easing,
  PanResponder,
  TouchableOpacity
} from 'react-native';

import RNFS, { DocumentDirectoryPath, DownloadDirectoryPath, downloadFile, CachesDirectoryPath, readDir, exists, readFile } from 'react-native-fs';
import SoundPlayer from 'react-native-sound-player';
const path = require('./src/Assets/file1.mp3')
// const App = () => {
//   const [value, setValue] = useState(new Animated.Value(0));
//   const opacityVal = useRef(new Animated.Value(0)).current;
//   const XYVAL = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
//   const XYVAL1 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
//   const heifgt = useRef(new Animated.Value(0)).current;

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: Animated.event([null, { dx: XYVAL.x, dy: XYVAL.y }]),
//       onPanResponderRelease: () => {
//         Animated.spring(XYVAL, {
//           toValue: { x: 0, y: 0 },
//           useNativeDriver: true,

//         }).start();
//       },
//     }),
//   ).current;
//   useEffect(() => {
//     // Animated.timing(opacityVal, {
//     //   useNativeDriver: true,
//     //   toValue: 1,
//     //   duration: 10000,
//     //   delay: 10000
//     // }).start();

//     // Animated.timing(XYVAL, {
//     //   useNativeDriver: true,
//     //   toValue: { x: 100, y: -100 },
//     //   duration: 10000
//     // }).start();
//     // Animated.parallel([
//     //   Animated.timing(XYVAL, {
//     //     useNativeDriver: true,
//     //     toValue: { x: 100, y: 0 },
//     //     duration: 5000
//     //   }),

//     //   Animated.timing(XYVAL1, {
//     //     useNativeDriver: true,
//     //     toValue: { x: 100, y: -100 },
//     //     duration: 5000
//     //   }),
//     // ]).start();
//   }, [XYVAL])

//   return (
//     <Animated.View style={{
//       flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center",
//       transform: [{ translateX: XYVAL.x }, { translateY: XYVAL.y }],
//     }}         {...panResponder.panHandlers}>

//       {/* <Animated.View style={{
//         height: 100, width: 100, backgroundColor: 'red',
//         transform: [{ translateX: XYVAL.x }, { translateY: XYVAL.y }]
//       }}> */}

//       <View style={{ height: 100, width: 100, backgroundColor: "red" }}>

//       </View>

//       {/* </Animated.View> */}
//       {/* <Animated.View style={{
//         height: 100, width: 100, backgroundColor: 'red',
//         transform: [{ translateX: XYVAL1.x }, { translateY: XYVAL1.y }]
//       }}></Animated.View>
//       <Animated.View style={{
//         height: 100, width: 100, backgroundColor: 'red',

//       }}></Animated.View> */}

//     </Animated.View>
//   );
// }

const App = () => {
  const [file, setFile] = useState<String>("")

  const checkFile = async () => {
    await exists(`${CachesDirectoryPath}/react-native.mp3`).then(r => {
      if (r == true) {
        setFile(`${CachesDirectoryPath}/react-native.mp3`)

      } else {
        RNFS.downloadFile({
          fromUrl: 'https://drive.google.com/file/d/1jOSbr3mmm6TBc3ie9_fTOz20wKbNkZ1B/view?usp=share_link',
          toFile: `${CachesDirectoryPath}/react-native.mp3`,
        }).promise.then((r) => {
          console.log(r);

        });
      }

    }).catch(e => {

    })
  }
  useEffect(() => {
    checkFile()
  })

  const playSound = async () => {

    try {
      await SoundPlayer.playSoundFile(`${CachesDirectoryPath}`, 'mp3')
    } catch (error) {
      console.log(error);

    }
  }
  const pauseSound = () => {
    SoundPlayer.pause()
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity style={{ backgroundColor: 'blue', justifyContent: "center", alignItems: "center", padding: 10, margin: 10 }}
        onPress={() => playSound()}>
        <Text style={{ color: "white" }}>Play</Text>
      </TouchableOpacity >
      <TouchableOpacity style={{ backgroundColor: 'red', justifyContent: "center", alignItems: "center", padding: 10, margin: 10 }} onPress={() => pauseSound()}>
        <Text style={{ color: "white" }}>Pause</Text>
      </TouchableOpacity>
    </View>
  );
}
export default App;
