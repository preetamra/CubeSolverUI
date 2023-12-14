import { useState,useEffect } from "react";
import { 
    View,
    Text,
    Button,
    Dimensions,
    Pressable,
    StyleSheet
 } from "react-native"
 import { 
    useCameraPermission,
    useCameraDevice,
    Camera,
    useFrameProcessor,
    runAsync
  } from 'react-native-vision-camera';

const ManualScanner = (props) => {

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
                     <Pressable
                     style={{
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
        <View 
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
            borderRadius:10
        }}>
            <View style={{
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:0,
                bottom:160,
                left:0,
                right:166,
            }}>
            </View>
            <View style={{
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:0,
                bottom:160,
                left:83,
                right:83,
            }}>
            </View>
            <View style={{
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:0,
                bottom:160,
                left:166,
                right:0,
            }}>
            </View>

            <View style={{
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:80,
                bottom:80,
                left:0,
                right:166,
            }}>
            </View>
            <View style={{
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:80,
                bottom:80,
                left:83,
                right:83,
            }}>
            </View>
            <View style={{
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:80,
                bottom:80,
                left:166,
                right:0,
            }}>
            </View>

            <View style={{
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:160,
                bottom:0,
                left:0,
                right:166,
            }}>
            </View>
            <View style={{
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:160,
                bottom:0,
                left:83,
                right:83,
            }}>
            </View>
            <View style={{
                borderColor:"white",
                borderWidth:5,
                position:"absolute",
                top:160,
                bottom:0,
                left:166,
                right:0,
            }}>
            </View>
        </View>
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
        }}>
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
                <Pressable >
                    <View style={{
                        backgroundColor:"white",
                        padding:25,
                        borderRadius:10
                    }}></View>
                </Pressable>
                <Pressable >
                    <View style={{
                        backgroundColor:"blue",
                        padding:25,
                        borderRadius:10
                    }}></View>
                </Pressable>
                <Pressable >
                    <View style={{
                        backgroundColor:"red",
                        padding:25,
                        borderRadius:10
                    }}></View>
                </Pressable>
            </View>
            <View style={{
                flexDirection:"row",
                alignItems:"stretch",
                justifyContent:"space-evenly",
                marginVertical:10
            }}>
                <Pressable >
                    <View style={{
                        backgroundColor:"yellow",
                        padding:25,
                        borderRadius:10
                    }}></View>
                </Pressable>
                <Pressable >
                    <View style={{
                        backgroundColor:"orange",
                        padding:25,
                        borderRadius:10
                    }}></View>
                </Pressable>
                <Pressable >
                    <View style={{
                        backgroundColor:"green",
                        padding:25,
                        borderRadius:10
                    }}></View>
                </Pressable>
            </View>
        </View>
        <Pressable 
        onPress={() => {
            console.log(props);
            props.navigation.navigate("Home");
        }}
        style={{
            alignItems:"center",
            justifyContent:"space-between",
            backgroundColor:'red',
            position:"absolute",
            top:Dimensions.get("window").height / 1.03,
            left:0,
            right:0,
            bottom:0,
            zIndex:10,
            padding:20,
            marginRight:200,
            marginVertical:-35
        }}>
           <Text style={{
            fontWeight:"800",
           }}>
              Back
           </Text>
        </Pressable>
    </>
   )
}

export default ManualScanner