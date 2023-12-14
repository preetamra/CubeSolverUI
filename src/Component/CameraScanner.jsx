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

const CameraScanner = (props) => {
   const [autoSelected,setAutoSelected] = useState(true);

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
            position:"relative",
            top:Dimensions.get("window").height / 2.5,
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
        <Camera 
            device={device}
            style={StyleSheet.absoluteFill}
            isActive={true}
            orientation='portrait'
            frameProcessor={frameProcessor}
            />
    </>
   )
}

export default CameraScanner