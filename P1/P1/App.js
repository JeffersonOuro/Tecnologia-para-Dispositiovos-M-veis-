import * as React from 'react';

import { Text, View, StyleSheet, Button, Image, ActivityIndicator } from 'react-native';

import Constants from 'expo-constants';

const mock = {
  "message": "https://images.dog.ceo/breeds/leonberg/n02111129_2700.jpg",
    "status": "sucesso"
}


async function executeGet(url, jsonState, activitySetter) {
  activitySetter(true)
  await fetch(url).then(response => {
    
    if(response.status == 200) {
      console.log("sucesso")
      response.json().then(function(result){
        jsonState(result);
      });
      activitySetter(false)
    } 
    
    else {
      jsonState(mock)
      throw new Error('Erro API');
    }
  
  })
  .then((response) => {
    console.log(response)
  }).catch((error) => {
    console.error(error);
  });
}

export default function App() {
  const [jsonData, setJsonData] = React.useState({})
  const [activity,setActivity]=React.useState(false)

  //faz o fetch apenas uma vez
  React.useEffect(() => {
      executeGet("https://dog.ceo/api/breeds/image/random", setJsonData, setActivity)
  },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dogs</Text>

      <Image
        style={styles.logo}
        resizeMode="contain"
        source={{
          uri: jsonData.message,
        }}
      />

      <View style={{padding:10}}>
        <ActivityIndicator size="large" animating={activity}/>
      </View>

      <View style={{padding: 10}}>
        <Button
          title="Mostrar outra foto"
          onPress={() => executeGet("https://dog.ceo/api/breeds/image/random", setJsonData, setActivity)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: 'center'
  },
  title: {
    padding: 20,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: 'center'
  }
});