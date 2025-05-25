import { useState, useEffect } from "react"
import { useRouter } from "expo-router"
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native"
import { useTheme } from "react-native-paper"
import { useTranslation } from "react-i18next"
import useStore from "@/store"
import { CustomText, Icon, CustomDropDown } from "@/components"
import { showAlert } from "@/notification"

export default function SettingsScreen() {
  const router = useRouter()
  const { isLoggedIn, clearAllData } = useStore()
  const { colors } = useTheme()
  const { t } = useTranslation()
  const handleClearAllData = () => {
    showAlert("clear_data", clearAllData)
  }
  const { currentLanguage, darkMode, signOut, changeLanguage, setDarkMode } = useStore()
  const [language, setLanguage] = useState<string>(currentLanguage)

  const toggleSwitch = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    changeLanguage(language as "cn" | "en" | "vi")
  }, [language])

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <CustomText style={styles.sectionTitle}>{t("general")}</CustomText>
        <View style={styles.item}>
          <Icon name="Globe" size={20} color={colors.onBackground} />
          <CustomText style={styles.itemText}>{t("language")}</CustomText>
        </View>
        <CustomDropDown
          select={language}
          setSelect={setLanguage}
          selects={[
            { label: 'English', value: 'en' },
            { label: 'Vietnamese', value: 'vi' },
            { label: 'Chinese', value: 'cn' },
          ]}
          placeholder={t('select language')}
        />
        <TouchableOpacity style={styles.item} className='mt-2'>
          <Icon name="Moon" size={20} color={colors.onBackground} />
          <CustomText style={styles.itemText}>{t('dark mode')}</CustomText>
          <Switch value={darkMode} onChange={toggleSwitch} thumbColor={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <CustomText style={styles.sectionTitle}>{t("data")}</CustomText>

        <TouchableOpacity style={styles.item}>
          <Icon name="CircleHelp" size={20} color={colors.primary} />
          <CustomText style={styles.itemText}>{t("help")}</CustomText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={handleClearAllData}>
          <Icon name="Trash2" size={20} color={colors.error} />
          <CustomText style={[styles.itemText, { color: colors.error }]}>
            {t("clear all data")}
          </CustomText>
        </TouchableOpacity>
      </View>

      {isLoggedIn ? (
        <TouchableOpacity style={[styles.link, { backgroundColor: colors.primary }]} onPress={signOut}>
          <CustomText style={styles.linkText}>{t('logout')}</CustomText>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.link, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/login')}>
          <CustomText style={styles.linkText}>{t('login')}</CustomText>
        </TouchableOpacity>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
    padding: 8,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  itemText: {
    fontSize: 15,
    flex: 1,
    fontWeight: "500",
  },
  link: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  linkText: {
    color: "#ffffff",
    fontWeight: "600",
  },
})
