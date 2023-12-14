import { 
    useEffect,
    useState
 } from "react";
import { 
    View,
    StyleSheet,
    Text,
    Pressable
 } from "react-native";
import {Dimensions} from 'react-native';

 
import CameraScanner from "../Component/CameraScanner";
import ManualScanner from "../Component/ManualScanner";

const scannerScreen = (props) => {

    const [autoSelected,setAutoSelected] = useState(false);


    return (
        <View style={{ 
            flex: 1,
            position:"absolute",
            top:0,
            bottom:0,
            right:0,
            left:0, 
            backgroundColor:"black"
            }}>
                {
                    autoSelected ?
                    <CameraScanner autoSelected={autoSelected} setAutoSelected={setAutoSelected} ></CameraScanner> 
                    :
                    <ManualScanner autoSelected={autoSelected} setAutoSelected={setAutoSelected} ></ManualScanner>
                }
        </View>
    );
}


export default scannerScreen