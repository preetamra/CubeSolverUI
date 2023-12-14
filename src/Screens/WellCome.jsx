import { View,Text,Button } from "react-native"

const WellComeScreen = (props) => {
   return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Home Screen</Text>
      <Button
      title='Go to Scanner'
      onPress={() => {
          props.navigation.navigate({
            name: "Scanner",
            params: {  },
          });
      }} 
      ></Button>
    </View>
   )
}

export default WellComeScreen