import { Link, Stack } from 'expo-router'
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'

import useStore from '@/store'
import { CustomText } from '@/components'

export default function SettingsScreen() {
    const { removeData } = useStore()

    const handleRemoveData = () => {
        Alert.alert("Remove data", "Are you sure you want to remove all data?", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "OK", onPress: removeData }
        ])
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleRemoveData}>
                    <CustomText>Remove Data</CustomText>
                </TouchableOpacity>
                <Link href="/" style={styles.link}>
                    <CustomText >Go to home screen!</CustomText>
                </Link>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
})
