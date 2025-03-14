import { TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useTheme } from "react-native-paper";
import { CustomText, IconSymbol } from "@/components";

const DrawerHeader = ({ title }: { title: string }) => {
    const { t } = useTranslation(); 
    const { colors } = useTheme(); 
    return (
        <View className="w-full flex flex-row items-center gap-10 px-2" style={{ height: 60 }}>
            <TouchableOpacity onPress={() => { router.push("/") }}>
                <IconSymbol name="chevron.left.2" size={34} color={colors.onBackground} />
            </TouchableOpacity>
            <CustomText className="font-semibold ml-2" style={{ fontSize: 20 }}>{t(title)}</CustomText>
        </View>
    );
};

export default DrawerHeader;