import React, { 
    useEffect,
    useState,
    useRef
   } from 'react';
import { View,Text,Button } from "react-native"
import { Canvas,extend,useThree,useFrame } from "@react-three/fiber";
import {
  OrbitControls
  } from  "three/examples/jsm/controls/OrbitControls"
  
import RubiksCube from "../RubiksCube/RubiksCube";  
  
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

const SolutionScreen = (props) => {

  const cube = useRef();

  const [clickOnCube, setClickOnCube] = useState(false);

  const shuffleRef = useRef()
  const undoRef = useRef()
  const redoRef = useRef()
  const solveRef = useRef()

  console.log("props :- ",props );
   return(
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
   )
}

export default SolutionScreen