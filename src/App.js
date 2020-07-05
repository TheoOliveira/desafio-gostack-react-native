import React, {useEffect, useState} from "react";
import api from './services/api';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  // inicializa useState
  const [repositories, setRepo] = useState([]);

// GET Repos

useEffect(()=>{
  api.get('repositories').then((response)=>{
    console.log(response.data);
    setRepo(response.data);
  });
}, []);
  async function handleLikeRepository(id) {
   const response = await api.post(`repositories/${id}/like`, (req,res)=> {
    const {id} = req.params;

    const repoIndex = repositories.findIndex((repository)=>repository.id == id);
    if(repoIndex <0){
      return res.status(400).json({error:  'repository not found'});
    }
    repositories[repoIndex] = {...repositories[repoIndex], likes: repositories[repoIndex].likes + 1}
    return response;
  })
  
  return response.status(200).json(repositories[repoIndex]);

  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList data={repositories} keyExtractor={(repository)=> repository.id}
        renderItem={({item: repository})=>(
          <View style={styles.repositoryContainer}>
          <Text style={styles.repository}>{repository.title}</Text>

          <View style={styles.techsContainer}>
            <Text style={styles.tech}>
              {repository.techs}
            </Text>
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-${repository.id}`}
            >
              {repository.likes}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(1)}
            
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-${repository.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View>
        )}
        />
        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
