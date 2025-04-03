import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from "@react-navigation/drawer";
import {
    Feather,
    MaterialIcons,
    Ionicons,
} from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useTheme } from "react-native-paper";
import DrawerHeader from "@/components/common/DrawerHeader";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const pathname = usePathname();
    const { colors } = useTheme();

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.userInfoWrapper}>
                <Image
                    source={require("@/assets/images/avatar.jpg")}
                    width={10}
                    height={10}
                    resizeMode="contain"
                    style={{ width: 80, height: 80, borderRadius: 40 }}
                />
                <View style={styles.userDetailsWrapper}>
                    <Text style={styles.userName}>Username</Text>
                    <Text style={styles.userEmail}>name@email.com</Text>
                </View>
            </View>
            <DrawerItem
                icon={({ color, size }) => (
                    <Feather
                        name="user-plus"
                        size={size}
                        color={pathname == "/signup" ? colors.primary : colors.onBackground}
                    />
                )}
                label={"Đăng ký"}
                labelStyle={[styles.navItemLabel, { color: pathname == "/signup" ? colors.primary : colors.onBackground }]}
                style={{ backgroundColor: pathname == "/home" ? colors.primary : colors.background }}
                onPress={() => {
                    router.push("/signup");
                }}
            />
            <DrawerItem
                icon={({ color, size }) => (
                    <Feather
                        name="key"
                        size={size}
                        color={pathname == "/login" ? colors.onPrimary : colors.onBackground}
                    />
                )}
                label={"Đăng nhập"}
                labelStyle={[
                    styles.navItemLabel,
                    { color: pathname == "/login" ? colors.onPrimary : colors.onBackground },
                ]}
                style={{ backgroundColor: pathname == "/login" ? colors.primary : colors.background }}
                onPress={() => {
                    router.push("/login");
                }}
            />
            <DrawerItem
                icon={({ color, size }) => (
                    <Feather
                        name="settings"
                        size={size}
                        color={pathname == "/settings" ? colors.primary : colors.onBackground}
                    />
                )}
                label={"Settings"}
                labelStyle={[
                    styles.navItemLabel,
                    { color: pathname == "/settings" ? colors.primary : colors.onBackground },
                ]}
                style={{ backgroundColor: pathname == "/settings" ? colors.primary : colors.background }}
                onPress={() => {
                    router.push("/settings");
                }}
            />
            <DrawerItem
                icon={({ color, size }) => (
                    <Feather
                        name="lock"
                        size={size}
                        color={pathname == "/settings" ? colors.primary : colors.onBackground}
                    />
                )}
                label={"Đổi mật khẩu"}
                labelStyle={[
                    styles.navItemLabel,
                    { color: pathname == "/reset-password" ? colors.primary : colors.onBackground },
                ]}
                style={{ backgroundColor: pathname == "/reset-password" ? colors.primary : colors.background }}
                onPress={() => {
                    router.push("/reset-password");
                }}
            />
            <DrawerItem
                icon={({ color, size }) => (
                    <Feather
                        name="log-out"
                        size={size}
                        color={pathname == "/settings" ? colors.primary : colors.onBackground}
                    />
                )}
                label={"Đăng xuất"}
                labelStyle={[
                    styles.navItemLabel,
                    { color: pathname == "/reset-password" ? colors.primary : colors.onBackground },
                ]}
                style={{ backgroundColor: pathname == "/reset-password" ? colors.primary : colors.background }}
                onPress={() => {
                    router.push("/login");
                }}
            />
        </DrawerContentScrollView>
    );
};

export default function DrawerLayout() {
    const { colors } = useTheme();
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                header: ({ route }) => <DrawerHeader title={route.name} />,
                headerShown: false,
                drawerPosition: 'right',
                drawerStyle: { width: "70%"},
            }}
        >
            <Drawer.Screen name="settings" options={{ headerShown: true, title: "Cài đặt" }} />
            <Drawer.Screen name="login" options={{ headerShown: true, title: "Đăng nhập" }} />
            <Drawer.Screen name="signup" options={{ headerShown: true, title: "Đăng ký" }} />
            <Drawer.Screen name="reset-password" options={{ headerShown: true, title: "Quên mật khẩu" }} />
        </Drawer>
    );
}

const styles = StyleSheet.create({
    navItemLabel: {
        marginLeft: 10,
        fontSize: 18,
    },
    userInfoWrapper: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginBottom: 10,
        alignItems: "center",
    },
    userDetailsWrapper: {
        marginLeft: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 16,
        fontStyle: 'italic',
        textDecorationLine: 'underline',
    }
});

