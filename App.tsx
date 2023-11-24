import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { 
  useCameraPermission,
  useCameraDevice,
  Camera,
  useFrameProcessor,
  runAsync
} from 'react-native-vision-camera';

function App() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("front");
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    console.log("I'm running synchronously at 60 FPS!")

    runAsync(frame, () => {
      'worklet'
      console.log("I'm running asynchronously, possibly at a lower FPS rate!")
    })
  }, [])

  useEffect(() => {
   if(!hasPermission)
   {
    requestPermission().then(
      (res) =>{
      console.log(res);
      }).catch((e) => {
      console.log(e);
    })
   }
  },[]);
  
  return (
    !hasPermission?
    <View style={{
      flex:1,
      justifyContent:"center",
      alignContent:"center"
    }}>
      <Text>
        Permission Denied
      </Text>
    </View>:
    <View style={{
      flex:1,
    }}>
    <Camera 
    device={device}
    style={StyleSheet.absoluteFill}
    isActive={true}
    orientation='portrait'
    frameProcessor={frameProcessor}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
