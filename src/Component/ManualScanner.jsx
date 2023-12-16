import { 
    useState,
    useEffect,
    useRef
 } from "react";
import { 
    View,
    Text,
    Button,
    Dimensions,
    Pressable,
    StyleSheet,
    Image,
    Modal
 } from "react-native"
 import { 
    useCameraPermission,
    useCameraDevice,
    Camera,
    useFrameProcessor,
    runAsync
  } from 'react-native-vision-camera';
import Animated,{ useSharedValue } from "react-native-reanimated";
import { Canvas,extend,useThree,useFrame } from "@react-three/fiber";
import {
    OrbitControls
    } from  "three/examples/jsm/controls/OrbitControls";

import CheckMark from "../assets/check-svgrepo-com.svg";

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

const ManualScanner = (props) => { 
   const [showTurnModal,setShowTurnModal] = useState(false);
   const rotateY = useSharedValue(0);

   const [clickOnCube, setClickOnCube] = useState(false);

   const [imageUri,setImageUri] = useState("");

   const shuffleRef = useRef()
   const undoRef = useRef()
   const redoRef = useRef()
   const solveRef = useRef()

   const [selectedColor,setSelectedColor] = useState(""); 
   const [faceColors,setFaceColors] = useState(["","","","","","","","",""]);

   const { hasPermission, requestPermission } = useCameraPermission();
   const device = useCameraDevice("back");
   const frameProcessor = useFrameProcessor((frame) => {
     'worklet'
     //console.log("I'm running synchronously at 60 FPS!")
 
     runAsync(frame, () => {
       'worklet'
       //console.log("I'm running asynchronously, possibly at a lower FPS rate!",CubeSolver(frame))
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

   return(
    <>
    <View 
        style={{
            borderRadius:20,
            position:"relative",
            top:Dimensions.get("window").height / 8,
            left:0,
            right:0,
            bottom:0,
            zIndex:10,
            width:Dimensions.get("window").width,
            height:45,
            backgroundColor:'transparent',
            alignItems:"center",
            justifyContent:"center" 
        }}>
            <View style={{
                borderRadius:10,
                marginHorizontal:20,
                width:"80%",
                height:"100%",
                flexDirection:"row",
                justifyContent:"space-evenly",
                alignItems:"center",
                backgroundColor:"white"
            }}> 
                <Pressable style={{
                    backgroundColor:props.autoSelected?"white":"gray",
                    width:"50%",
                    height:"100%",
                    margin:10,
                    justifyContent:"center",
                    alignItems:"center"
                    }}
                    onPress={() => {
                        props.setAutoSelected(prevState => !prevState) 
                    }} 
                    >
                     <Text>
                        Auto
                     </Text>
                     </Pressable>
                     <Pressable
                     style={{
                        width:"50%",
                        height:"100%",
                        backgroundColor:props.autoSelected?"gray":"white",
                        margin:10,
                        justifyContent:"center",
                        alignItems:"center"
                     }}
                      onPress={() => {
                        props.setAutoSelected(prevState => !prevState)
                      }}
                     >
                     <Text>
                        Manual
                     </Text>
                     </Pressable>                    
                   </View>                    
                </View>
        <Animated.View 
        style={{
            borderColor:"white",
            borderWidth:5,
            borderStyle:"solid",
            alignItems:"center",
            justifyContent:"center",
            backgroundColor:'transparent',
            position:"relative",
            top:Dimensions.get("window").height / 8,
            left:0,
            right:0,
            bottom:0,
            zIndex:10,
            padding:120,
            margin:50,
            borderRadius:10,
        }}>
            <Pressable style={{
                backgroundColor:faceColors[0],
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:0,
                bottom:160,
                left:0,
                right:166,
            }} 
            onPress={() => {
                console.log("pressed",selectedColor);
                const temp = [...faceColors];
                temp[0] = selectedColor;
                setFaceColors(temp);
            }}>
            </Pressable>
            <Pressable style={{
                backgroundColor:faceColors[1],
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:0,
                bottom:160,
                left:83,
                right:83,
            }}
            onPress={() => {
                console.log("pressed",selectedColor);
                const temp = [...faceColors];
                temp[1] = selectedColor;
                setFaceColors(temp);
            }}
            >
            </Pressable>
            <Pressable style={{
                backgroundColor:faceColors[2],
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:0,
                bottom:160,
                left:166,
                right:0,
            }}
            onPress={() => {
                console.log("pressed",selectedColor);
                const temp = [...faceColors];
                temp[2] = selectedColor;
                setFaceColors(temp);
            }}
            >
            </Pressable>

            <Pressable style={{
                backgroundColor:faceColors[3],
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:80,
                bottom:80,
                left:0,
                right:166,
            }}
            onPress={() => {
                console.log("pressed",selectedColor);
                const temp = [...faceColors];
                temp[3] = selectedColor;
                setFaceColors(temp);
            }}
            >
            </Pressable>
            <Pressable style={{
                backgroundColor:faceColors[4],
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:80,
                bottom:80,
                left:83,
                right:83,
            }}
            onPress={() => {
                console.log("pressed",selectedColor);
                const temp = [...faceColors];
                temp[4] = selectedColor;
                setFaceColors(temp);
            }}
            >
            </Pressable>
            <Pressable style={{
                backgroundColor:faceColors[5],
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:80,
                bottom:80,
                left:166,
                right:0,
            }}
            onPress={() => {
                console.log("pressed",selectedColor);
                const temp = [...faceColors];
                temp[5] = selectedColor;
                setFaceColors(temp);
            }}
            >
            </Pressable>

            <Pressable style={{
                backgroundColor:faceColors[6],
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:160,
                bottom:0,
                left:0,
                right:166,
            }}
            onPress={() => {
                console.log("pressed",selectedColor);
                const temp = [...faceColors];
                temp[6] = selectedColor;
                setFaceColors(temp);
            }}
            >
            </Pressable>
            <Pressable style={{
                backgroundColor:faceColors[7],
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:160,
                bottom:0,
                left:83,
                right:83,
            }}
            onPress={() => {
                console.log("pressed",selectedColor);
                const temp = [...faceColors];
                temp[7] = selectedColor;
                setFaceColors(temp);
            }}
            >
            </Pressable>
            <Pressable style={{
                backgroundColor:faceColors[8],
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:160,
                bottom:0,
                left:166,
                right:0,
            }}
            onPress={() => {
                console.log("pressed",selectedColor);
                const temp = [...faceColors];
                temp[8] = selectedColor;
                setFaceColors(temp);
            }}
            >
            </Pressable>
        </Animated.View>
        <View style={{
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
            backgroundColor:'transparent',
            position:"relative",
            top:Dimensions.get("window").height / 8,
            left:0,
            right:0,
            bottom:0,
            zIndex:10,
            padding:20,
            marginHorizontal:50,
            marginVertical:-35
        }}>
        <Pressable style={{
            backgroundColor:"#2196F3",
            paddingHorizontal:30,
            paddingVertical:10,
            borderRadius:4
        }}>
            <Text style={{
                fontWeight:"600"
            }}>
                Prev
            </Text>
        </Pressable>
        <Pressable style={{
            backgroundColor:"#2196F3",
            paddingHorizontal:30,
            paddingVertical:10,
            borderRadius:4
        }}
        onPress={() => {
            setShowTurnModal(true);
        }}
        >
            <Text style={{
                fontWeight:"600"
            }}>
                Next
            </Text>
        </Pressable>
        </View>  
        <View style={{
            position:"relative",
            top:Dimensions.get("window").height / 6,
            left:0,
            right:0,
            bottom:0,
            zIndex:10,
        }}>
            <View style={{
                flexDirection:"row",
                alignItems:"stretch",
                justifyContent:"space-evenly",
                marginVertical:10
            }}>
                <Pressable onPress={() => {
                    setSelectedColor("white");
                }} >
                    <View style={{
                        backgroundColor:"white",
                        padding:25,
                        borderRadius:10,
                        justifyContent:"center",
                        alignItems:"center"
                    }}>
                      {
                        selectedColor == "white" ? <CheckMark></CheckMark> : <></>
                      }
                    </View>
                </Pressable>
                <Pressable onPress={() => {
                    setSelectedColor("blue");
                }}>
                    <View style={{
                        backgroundColor:"blue",
                        padding:25,
                        borderRadius:10
                    }}>
                      {
                        selectedColor == "blue" ? <CheckMark></CheckMark> : <></>
                      }
                    </View>
                </Pressable>
                <Pressable onPress={() => {
                    setSelectedColor("red");
                }} >
                    <View style={{
                        backgroundColor:"red",
                        padding:25,
                        borderRadius:10
                    }}>
                      {
                        selectedColor == "red" ? <CheckMark></CheckMark> : <></>
                      }
                    </View>
                </Pressable>
            </View>
            <View style={{
                flexDirection:"row",
                alignItems:"stretch",
                justifyContent:"space-evenly",
                marginVertical:10
            }}>
                <Pressable onPress={() => {
                    setSelectedColor("yellow");
                }}>
                    <View style={{
                        backgroundColor:"yellow",
                        padding:25,
                        borderRadius:10
                    }}>
                      {
                        selectedColor == "yellow" ? <CheckMark></CheckMark> : <></>
                      }
                    </View>
                </Pressable>
                <Pressable onPress={() => {
                    setSelectedColor("orange");
                }}>
                    <View style={{
                        backgroundColor:"orange",
                        padding:25,
                        borderRadius:10
                    }}>
                      {
                        selectedColor == "orange" ? <CheckMark></CheckMark> : <></>
                      }
                    </View>
                </Pressable>
                <Pressable onPress={() => {
                    setSelectedColor("green");
                }}>
                    <View style={{
                        backgroundColor:"green",
                        padding:25,
                        borderRadius:10
                    }}>
                      {
                        selectedColor == "green" ? <CheckMark></CheckMark> : <></>
                      }
                    </View>
                </Pressable>
            </View>
        </View>
        <Modal
        visible={true}
        style={{
            width:"50%",
            height:"50%"
        }}
        transparent={true}
        >
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}>
             <View style={{
                        margin: 20,
                        backgroundColor: '#FFFFFF',
                        borderRadius: 10,
                        padding: 20,
                        shadowColor: '#000000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        width: '80%',
                        height:"50%",
             }}>
                    <Canvas style={{
                        flex:1,
                        width:"100%",
                        height:"100%"
                       }}
                       camera={{
                        fov:75,
                        position:[1,1,6]
                       }}
                    >
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
             </View> 
          </View>
        </Modal>
    </>
   )
}

export default ManualScanner