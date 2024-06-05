import { StyleSheet, Text, View ,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const index = () => {
  const [completedTask,setCompletedTasks] = useState(0);
  const [pendingTasks,setPendingTasks] = useState(0);

  const fetchTaskData= async ()=>{
    try{
      const response= await axios.get(`http://192.168.1.159:3000/task/count`);
      const {totalCompletedTask,totalPendingTask}=response.data;
      setCompletedTasks(totalCompletedTask);
      setPendingTasks(totalPendingTask);

    }catch(error){
      console.log("error",error)
    }
  }
  useEffect(()=>{
    fetchTaskData()
  },[]);
  console.log("comp",completedTask)
  console.log("pending",pendingTasks)
  return (
    <View style={styles.view}>
      <View style={styles.view2}>
        {/*}
      <Image
          style={{ width: 60, height: 60, borderRadius: 30 }}
          source={{
            uri: "https://lh3.googleusercontent.com/ogw/ANLem4Zmk7fohWyH7kB6YArqFy0WMfXnFtuX3PX3LSBf=s64-c-mo",
          }}
        /> {*/}
        <View> 
          <Text style={styles.text}>Selected categories</Text>
        </View>
      </View>
      <View style={{marginVertical:12}}>
          <Text>Overview</Text>
          <View style={styles.viewTask}> 
            <View style={styles.viewTask1}> 
              <Text style={styles.textTask}>{completedTask}</Text>
              <Text style={styles.textTask1}>Completed task</Text>
            </View>

            <View style={styles.viewTask1}> 
              <Text style={styles.textTask}>{pendingTasks}</Text>
              <Text style={styles.textTask1}>Pending task</Text>
            </View>
          </View>
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({

  view:{
    padding:10,
    flex:1,
    backgroundColor:"white"
  },  
  view2:{
    flexDirection:"row",
    alignItems:"center",
    gap:10
  },
  text:{
    fontSize:15,
    color:"gray",
    marginTop:4,
  },
  viewTask:{
    flexDirection:"row",
    alignItems:"center",
    gap:6,
    marginVertical:8
  },
  viewTask1:{
    backgroundColor:"#ff5733",
    padding:10,
    borderRadius:8,
    flex:1,
    justifyContent:"center",
    alignContent:"center",
  },
  textTask:{
    textAlign:"center",
    fontSize:16,
    fontWeight:"bold"
  },
  textTask1:{
    textAlign:"center",
    fontSize:16,
  
  }
})