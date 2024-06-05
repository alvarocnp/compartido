import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';

function info(){
    const parameters=useLocalSearchParams();
    let fechaFormateada = format(parameters?.createdAt, 'dd/MM/yyyy', { locale: es });
  return (
    <View style={styles.view}>
      <View style={styles.view2}>
      <Ionicons name="ellipsis-vertical-sharp" size={24} color="black" />
      </View>

        <Text style={styles.textTitle}>{parameters?.title}</Text>
      <View style={{marginTop:50}}/>
      <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        {/*}
        <AntDesign name="plus" size={24} color="#7CB9E8" />
        
        <Text style={{ color: "#7CB9E8", fontSize: 16, fontWeight: "500" }}>
          Add a subtask
  </Text>{*/}
      </Pressable>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <AntDesign name="calendar" size={24} color="black" />
            <Text>Date</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>{fechaFormateada}</Text>
          </Pressable>
        </View>
      </View>
          {/*}
      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Ionicons name="time-sharp" size={24} color="gray" />
            <Text>Time and Reminder</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>No</Text>
          </Pressable>
        </View>
      </View>
        {*/}
      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >{/*}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Feather name="repeat" size={24} color="black" />
            <Text>Repeat Task</Text>
          </View>
        
          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>No</Text>
            
          </Pressable>
          {*/}
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
          <SimpleLineIcons name="note" size={24} color="black" />
            <Text>Notes</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>Not Added</Text>
          </Pressable>
        </View>
      </View>
      
    </View>
  )
}

export default info

const styles = StyleSheet.create({

    view:{
        flex:1,
        backgroundColor:"white",
        padding:10,
    },
    view2:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    viewTask:{
        marginTop:5
    },
    textTitle:{
        marginTop:20,
        fontSize:17,
        fontWeight:"600",
    }
})