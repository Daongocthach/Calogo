import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from "@react-navigation/drawer";
import {
    Feather,
    AntDesign,
    MaterialIcons,
    Ionicons,
} from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useTheme } from "react-native-paper";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const pathname = usePathname();
    const { colors } = useTheme();

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.userInfoWrapper}>
                <Image
                    source={{ uri: "https://randomuser.me/api/portraits/women/26.jpg" }}
                    width={80}
                    height={80}
                    style={styles.userImg}
                />
                <View style={styles.userDetailsWrapper}>
                    <Text style={styles.userName}>John Doe</Text>
                    <Text style={styles.userEmail}>john@email.com</Text>
                </View>
            </View>
            <DrawerItem
                icon={({ color, size }) => (
                    <Feather
                        name="home"
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
                    <MaterialIcons
                        name="login"
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
                    <Ionicons
                        name="settings-outline"
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
                    <Ionicons
                        name="settings-outline"
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
        </DrawerContentScrollView>
    );
};

export default function DrawerLayout() {
    const { colors } = useTheme();
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerPosition: 'right',
                drawerStyle: { width: "70%", backgroundColor: colors.background },
            }}
        >
            <Drawer.Screen name="settings" options={{ title: "Cài đặt" }} />
            <Drawer.Screen name="login" options={{ title: "Đăng nhập" }} />
            <Drawer.Screen name="signup" options={{ title: "Đăng ký" }} />
            <Drawer.Screen name="reset-password" options={{ title: "Quên mật khẩu" }} />
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
    },
    userImg: {
        borderRadius: 40,
    },
    userDetailsWrapper: {
        marginTop: 25,
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

