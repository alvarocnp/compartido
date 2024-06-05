import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-native-calendars';
import moment from "moment"
import axios from 'axios';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
const index = () => {
  const today = moment().format("DD MM YYYY");
  const [selectedDate, setSelectDate] = useState(today);
  const [task, setTask] = useState([]);

  const fetchCompletedTask = async () => {
    try {
      const response = await axios.get(`http://192.168.1.159:3000/tasks/complete/${selectedDate}/6632a41c67a60486f03cd3fc`);
      const completedTasks = response.data.completedTask || [];
      setTask(completedTasks);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCompletedTask();

  }, [selectedDate]);
  console.log(task);

  const hadleDayPress = (day) => {
    setSelectDate(day.dateString)
  }
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Calendar theme={{
        arrowColor:"#ff5733",
        todayTextColor:"#ff5733",
      }}
      style={styles.calendar}  onDayPress={hadleDayPress} markedDates={{ [selectedDate]: { selected: true, selectedColor: "#ff5733" } }} />

      <View style={styles.viewCalendar} />
      <View style={styles.viewCompletedTask2}>
        <Text>Completed Task</Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
      </View>
      {task?.map((item, index) => (
        <Pressable style={styles.pressTask}>
          <View style={styles.viewTask}>
            <FontAwesome name="circle" size={18} color="black" />
            <Text style={{ flex: 1, textDecorationLine: "line-through", color: "gray" }}>{item?.title}</Text>
            <FontAwesome6 name="bookmark" size={20} color="black" />
          </View>
        </Pressable>
      ))}
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  calendar: {
    
    color: "#ff5733",
  },

  viewCalendar: {
    marginTop: 20,
  },
  viewTask: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 12,

  },

  pressTask: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 7,
    marginVertical: 10
  },
  
  viewCompletedTask2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginHorizontal: 10,
    marginVertical:10,
  }


})