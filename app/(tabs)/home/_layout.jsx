import { Stack } from "expo-router";
import React from "react";
import { ModalPortal } from "react-native-modals";


export default function Layout() {
    return (
        <>
        <Stack >
            <Stack.Screen name="index" />
        </Stack>
        <ModalPortal/>
        </>
    );
}