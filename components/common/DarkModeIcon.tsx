import { useTheme } from "react-native-paper"

import useStore from "@/store"
import CustomButton from "@/components/common/CustomButton"

function DarkModeIcon() {
    const { colors } = useTheme()
    const { darkMode, setDarkMode } = useStore()
    const toggleTheme = () => {
        setDarkMode(!darkMode)
    }
    return (
        <CustomButton
            icon={darkMode ? 'lightbulb-on-outline' : 'weather-night'}
            handle={toggleTheme}
            iconColor={colors.onBackground}
            buttonClassName='pl-4'
        />
    )
}

export default DarkModeIcon