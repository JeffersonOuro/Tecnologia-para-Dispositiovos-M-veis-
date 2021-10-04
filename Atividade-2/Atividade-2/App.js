import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, Modal } from 'react-native';
import Constants from 'expo-constants';

async function executeGet(url, jsonState) {
  await fetch(url)
  .then(response => {
    if(response.status == 200) {
      console.log("sucesso")
      response.json().then(function(result){
        jsonState(result);
      });
    } else {
      throw new Error('Erro ao consumir API');
    }
  })
  .then((response) => {

  }).catch((error) => {
    console.error(error);
  });
}


const Item = ({empresa, nome, email, username, onPress, empresaFrase}) => {
  const [modal, setModal] = React.useState(false)

  function mudaModal() {
    setModal(!modal)
  }

  return (
    <View>

      <SubItemModal
        nomeEmpresa={empresa}
        fraseEmpresa={empresaFrase}
        toggleModal={mudaModal}
        display={modal}
      />

      <Pressable onPress={mudaModal}>
      <View style={styles.items}>
          <Text style={styles.title}>{empresa}</Text>
          <Text>Nome: {nome}</Text>
          <Text>E-mail: {email}</Text>
          <Text>@{username}</Text>
        </View>
      </Pressable>

    </View>
  )

}

const SubItemModal = ({nomeEmpresa, fraseEmpresa, toggleModal, display}) => (

    <Modal
      animationType="slide"
      transparent={true}
      visible={display}
      onRequestClose={toggleModal}
    >

      <View style={styles.centeredView}>
        <Pressable onPress={toggleModal}>
          <View>
            <Text style={styles.title}>{nomeEmpresa}</Text>
            <Text>{fraseEmpresa}</Text>
          </View>
        </Pressable>
      </View>
    </Modal>
)


export default function App() {

  const [jsonData, setJsonData] = React.useState({});

  executeGet("https://jsonplaceholder.typicode.com/users", setJsonData);

  //exemplo com evento de press
  function cardEmpresa({item}){
    return (
      <View>
      <Item empresa={item.company.name}
                nome={item.name}
                email={item.email}
                username={item.username}
                empresaFrase={item.company.catchPhrase}
      />

      </View>
    )
  }

  return (
    <View style={styles.container}>

      <FlatList
        ListHeaderComponent={
            <Text style={styles.title}>Lista de participantes da conferência (header)</Text>
        }

        data={jsonData}
        renderItem={cardEmpresa}
        keyExtractor={(item) => item.id}
      />

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
  centeredView: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: 300,
    height: 300,
    marginTop: 150,
    backgroundColor: 'white'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: "center",
    padding: 15,
  },
  items: {
    margin: 12,
    marginTop: 20,
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'pink',
  },
});


