import { Stack } from "expo-router";
import React from "react";
import { ModalPortal } from "react-native-modals";


export default function Layout() {
    return (
        <>
        <Stack >
<<<<<<< HEAD
            <Stack.Screen name="index" options={{title:"Tasks"}} />
=======
        <Stack.Screen
                name="index"
                options={{
                    title: "Taskify",
                    headerStyle: {
                        height: 60, // Cambia esta altura según sea necesario
                    },
                    headerTitleStyle: {
                        alignSelf: 'center', // Centra el título si es necesario
                    },
                }}
            />
>>>>>>> 7e824f4fc507f604a945878205e0500c3292e60a
        </Stack>
        <ModalPortal/>
        </>
    );
}