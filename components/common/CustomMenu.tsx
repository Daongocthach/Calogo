import { useState } from 'react'
import { Menu, Icon, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { useRouter, useNavigation } from 'expo-router'

import useStore from '@/store'
import { CustomButton } from '@/components'
import { showAlert } from '@/notification'


const CustomMenu = () => {
    const router = useRouter()
    const navigation = useNavigation()
    const { colors } = useTheme()
    const { t } = useTranslation()

    const [visible, setVisible] = useState(false)
    const openMenu = () => {
        router.push('/login')
    }
    const closeMenu = () => setVisible(false)
    const { signOut } = useStore()

    const handleLogout = () => {
        showAlert("logout", () => {
            signOut()
        })
        closeMenu()
    }
    const handleNavigate = (screen: string) => {
        closeMenu()
    }
    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchorPosition='bottom'
            contentStyle={{ backgroundColor: colors.background, marginTop: 30 }}
            anchor={
                <CustomButton
                    handle={openMenu}
                    iconColor={visible ? colors.primary : colors.onBackground}
                    icon={'menu'}
                    buttonClassName='px-4'
                />
            }>

            <Menu.Item
                onPress={handleLogout}
                title={t('logout')}
                leadingIcon={() => (
                    <Icon
                        source='logout'
                        size={22}
                        color={colors.onBackground}
                    />
                )}
                titleStyle={{ color: colors.onBackground, fontSize: 16 }}
            />
        </Menu>
    )
}

export default CustomMenu