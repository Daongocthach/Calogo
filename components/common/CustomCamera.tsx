import { FileProps } from "@/lib"
import React, { useRef, useState } from "react"
import { View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import { Camera, CameraType } from 'react-native-camera-kit'
import { Icon } from "react-native-paper"

type CameraProps = {
    onCapture: (file: FileProps) => void
    onClose: () => void
}

function CustomCamera({ onCapture, onClose }: CameraProps) {
    const cameraRef = useRef<any>(null)
    const [isResizing, setIsResizing] = useState(false)

    const handleCapture = async () => {
        setIsResizing(true)
        try {
            const photo = await cameraRef.current.capture()
            const fileUri = `file://${photo.uri}`
            const file: FileProps = {
                uri: fileUri,
                name: 'photo.jpg',
                type: 'image/jpeg',
            }
            onCapture(file)
        } catch (err) {
            console.error('Capture or processing error:', err)
        } finally {
            setIsResizing(false)
            onClose()
        }
    }
    

    return (
        <View style={styles.container}>
            <Camera
                ref={cameraRef}
                cameraType={CameraType.Back}
                flashMode="auto"
                style={{ flex: 1 }}
            />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Icon source="close" size={28} color="white" />
            </TouchableOpacity>
            <View style={styles.controlContainer}>
                {isResizing ? (
                    <ActivityIndicator size="large" color="white" />
                ) : (
                    <TouchableOpacity onPress={handleCapture}>
                        <Icon source="camera-iris" size={60} color="white" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        position: "relative",
    },
    controlContainer: {
        position: "absolute",
        bottom: 40,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
    },
})

export default CustomCamera