import { Pressable, StyleSheet, Text, View, TextInput, ScrollView,Image} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { BottomModal, ModalContent, ModalTitle, SlideAnimation } from 'react-native-modals';
import axios from 'axios';
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const index = () => {
  const today = moment().format("DD MMM YY");
  const [isModalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [marked, setMarked] = useState(false);

  const addTask = async () => {
    try {
      const taskData = {
        title: task,

      }
      axios.post(`http://192.168.1.159:3000/tasks/6632a41c67a60486f03cd3fc`, taskData).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log("error", error)
      });

      await getUserTasks();
      setModalVisible(false);
      setTask("");
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50); // Adjust the delay as needed
    }
  }, [isModalVisible]);

  useEffect(() => {
    getUserTasks();
  }, [marked,isModalVisible])
  const getUserTasks = async () => {
    try {
      const res = await axios.get(`http://192.168.1.159:3000/users/6632a41c67a60486f03cd3fc/tasks`)
      console.log(res.data.tasks);
      setTasks(res.data.tasks);

      const tasksListadas = res.data.tasks || [];
      const pending = tasksListadas.filter((task) => task.status !== "completed");

      const completed = tasksListadas.filter((task) => task.status === "completed");

      setPendingTasks(pending);
      setCompletedTasks(completed);
    } catch (error) {
      console.log("error", error)
    }
  };

  const markTaskCompleted = async (taskId) => {
    try {
        setMarked(true);
        const response = await axios.patch(`http://192.168.1.159:3000/tasks/${taskId}/complete`);
        console.log(response.data);
    } catch (error) {
        console.log("Error marking task as completed:", error.response ? error.response.data : error.message);
    }
};
  const router =useRouter();

  console.log("completed", completedTasks);
  console.log("pending", pendingTasks);
  return (
    <>
      <View style={{
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 12
      }}
      >{/*}
        <Pressable style={{
          backgroundColor: "#ff5733",
          paddingHorizontal: 12,
          paddingVertical: 5,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Text style={{
            color: "white",
            textAlign: "center"
          }}>All</Text>
        </Pressable>
        <Pressable 
        style={{
          backgroundColor: "#ff5733",
          paddingHorizontal: 12,
          paddingVertical: 5,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Text style={{
            color: "white",
            textAlign: "center"
          }}>Work</Text>
        </Pressable>
        <Pressable style={{
          backgroundColor: "#ff5733",
          paddingHorizontal: 12,
          paddingVertical: 5,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Text style={{
            color: "white",
            textAlign: "center"
          }}>Personal</Text>
        </Pressable>{*/}
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "e8e8e8" }}>
        <View style={{ padding: 10 }}>
          {tasks?.length > 0 ? (
            <View>
              {pendingTasks?.length > 0 && <Text> Task!! {today}</Text>}

              {pendingTasks?.map((item, index) => (
                <Pressable style={styles.pressTask}  onPress={() => {
                  router?.push({
                    pathname: "/home/info",
                    params: {
                      id: item._id,
                      title: item?.title,
                      category: item?.category,
                      createdAt: item?.createdAt,
                      dueDate: item?.dueDate,
                    },
                  });
                }}>
                  <View style={styles.viewTask}>
                    <Entypo onPress={()=> markTaskCompleted(item?._id)} name="circle" size={18} color="black" />
                    <Text style={{ flex: 1 }}>{item?.title}</Text>
                    <FontAwesome6 name="bookmark" size={20} color="black" />
                  </View>
                </Pressable>
              ))}
              {completedTasks?.length > 0 && (
                <View>
                  <View style={styles.viewCompletedTask}>
                  </View>
                  <View style={styles.viewCompletedTask2}>
                    <Text>Completed Task</Text>
                    <MaterialIcons name="arrow-drop-down" size={24} color="black" />
                  </View>
                  {completedTasks?.map((item, index) => (
                    <Pressable style={styles.pressTask}>
                      <View style={styles.viewTask}>
                        <FontAwesome name="circle" size={18} color="black" />
                        <Text style={{ flex: 1 ,textDecorationLine:"line-through", color:"gray"}}>{item?.title}</Text>
                        <FontAwesome6 name="bookmark" size={20} color="black" />
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View>
              <Text
                style={{
                  display: "flex",
                  textAlign: "center",
                  color: "#ff5733",
                  marginTop: 30,
                  fontSize: 17
                }}
              >Start with new tasks!</Text>

            </View>
          )}

        </View>

      </ScrollView>
      <Pressable onPress={() =>
        setModalVisible(!isModalVisible)}
        style={{
          display: "flex",
          flexDirection: 'row',
          height: 52,
          width: 390,
          backgroundColor: "#474b4e",
          padding: 10,
          borderRadius: 6,
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 25
        }}>
        <Ionicons name="add" size={32} color="#e8e8e8" style={{

        }} />
        <Text style={styles.bottomButtonText}>Add a task</Text>
      </Pressable>
      <BottomModal onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title='Add a task' />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom"
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}
      >
        <ModalContent style={styles.modal}>
          <View style={styles.modalView}>
            <TextInput ref={inputRef} placeholder='Enter a new task' style={styles.textInput} value={task} onChangeText={(text) => setTask(text)} />
            <Ionicons onPress={addTask} name="send-sharp" size={24} color="#ff5733" style={{}} />
          </View>
        </ModalContent>
      </BottomModal>

    </>
  );
};

export default index;

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: 200
  },

  textInput: {
    padding: 7,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    color: "black",

  },

  bottomButtonText: {
    color: "#e8e8e8",
    marginLeft: 7,
    bottom: -5,
    fontSize: 16
  },

  modalView: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },

  viewTask: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,

  },

  pressTask: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 7,
    marginVertical: 10
  },

  viewCompletedTask: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  viewCompletedTask2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginHorizontal: 10,
  }

})