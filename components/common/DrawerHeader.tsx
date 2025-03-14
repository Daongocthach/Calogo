import { TouchableOpacity, View } from "react-native";
import { DrawerToggleButton } from '@react-navigation/drawer'
import { useTranslation } from "react-i18next";
import CustomText from "@/components/common/CustomText";
import { IconSymbol } from "./IconSymbol";
import { router } from "expo-router";

const DrawerHeader = ({ title }: { title: string }) => {
    const { t } = useTranslation();  
    return (
        <View className="w-full h-20 flex flex-row items-center gap-10 px-2 py-2" style={{ backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => { router.push('/') }}>
                <IconSymbol name="chevron.left.2" size={40} color={'gray'} />
            </TouchableOpacity>
            <CustomText className="font-bold">{t(title)}</CustomText>
        </View>
    );
};

export default DrawerHeader;