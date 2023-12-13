import React, { 
  useEffect,
  useState,
  useRef
 } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';
import { 
  useCameraPermission,
  useCameraDevice,
  Camera,
  useFrameProcessor,
  runAsync
} from 'react-native-vision-camera';
import { CubeSolver } from './FrameProcessorWrapper';
import { 
  Canvas, 
  useFrame,
  useThree,
  extend
} from '@react-three/fiber';
import {  
  BoxGeometry, 
  Mesh, 
  MeshBasicMaterial,
  Group
} from "three";
import {
OrbitControls
} from  "three/examples/jsm/controls/OrbitControls"

import RubiksCube from './src/RubiksCube/RubiksCube';

extend({ OrbitControls })

const CameraControls = ({rotate}) => {
  const {camera, gl:{domElement}} = useThree()
  const controls = useRef()
  
  useFrame(() => {
    controls.current.update()
  })

  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={true}
      enableRotate={rotate}
      enableDamping={true}
      dampingFactor={0.05}
      maxDistance={12}
      minDistance={6}
      enablePan={false}
    />
  );
}

function App() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("front");
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    console.log("I'm running synchronously at 60 FPS!")

    runAsync(frame, () => {
      'worklet'
      console.log("I'm running asynchronously, possibly at a lower FPS rate!",CubeSolver(frame))
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

  const cube = useRef();

  const [clickOnCube, setClickOnCube] = useState(false);

  const shuffleRef = useRef()
  const undoRef = useRef()
  const redoRef = useRef()
  const solveRef = useRef()
  
  return (
    <>
       <Canvas
      style={{
        flex:1
      }}
      camera={{
        fov:75,
        position:[1,1,6]
      }}
      >
       <CameraControls rotate={!clickOnCube} />
       <RubiksCube
       onShuffle={(callback) => (shuffleRef.current = callback)}
       onUndo={(callback) => (undoRef.current = callback)}
       onRedo={(callback) => (redoRef.current = callback)}
       onSolve={(callback) => (solveRef.current = callback)}
       blockRubikCubeRotation={(value) => {
        setClickOnCube(value)
      }}
       ></RubiksCube>
      </Canvas>
      <Button
      title='Click Me'
      onPress={() => {
        shuffleRef && shuffleRef.current()
      }}
      />
    </>
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
