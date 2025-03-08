import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DrawerLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer screenOptions={{ headerShown: false, drawerPosition: 'right', drawerStyle: { width: "70%" } }}>
                <Drawer.Screen name="settings" options={{ title: "Cài đặt" }} />
                <Drawer.Screen name="login" options={{ title: "Đăng nhập" }} />
                <Drawer.Screen name="signup" options={{ title: "Đăng ký" }} />
                <Drawer.Screen name="reset-password" options={{ title: "Quên mật khẩu" }} />
            </Drawer>
        </GestureHandlerRootView >
    );
}
