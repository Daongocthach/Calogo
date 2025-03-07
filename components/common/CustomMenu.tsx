import { useState } from 'react'
import { Menu, Icon, useTheme } from 'react-native-paper'
import { Linking } from 'react-native'
import { useTranslation } from 'react-i18next'

import useStore from '@/store'
import { version, checkUpdate, TOOLS_URL } from '@/utils'
import { CustomButton } from '@/components'
import { showAlert } from '@/notification'


const CustomMenu = ({ navigation, route }: { navigation: any, route: any }) => {
    const { colors } = useTheme()
    const { t } = useTranslation()

    const [visible, setVisible] = useState(false)
    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)
    // const { displayName, signOut, tokenDecoded } = useStore()
    const { displayName, signOut } = useStore()
    const openAPK = async () => {
        try {
            const isUpdate = await checkUpdate()
            if (isUpdate) {
                showAlert("update_available", () => {
                    Linking.openURL(TOOLS_URL + 'update' || '').catch(() => {
                        showAlert("open_apk_failed")
                    })
                })
            }
            else {
                showAlert("the_latest_version")
            }
        } catch (error) {
            showAlert("network_error")
        }
    }
    const handleLogout = () => {
        showAlert("logout", () => {
            signOut()
        })
        closeMenu()
    }
    const handleNavigate = (screen: string) => {
        navigation.navigate(screen)
        closeMenu()
    }
    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchorPosition='bottom'
            contentStyle={{ backgroundColor: colors.background, marginTop: 16 }}
            anchor={
                <CustomButton
                    handle={openMenu}
                    iconColor={visible ? colors.primary : colors.onBackground}
                    icon={'menu'}
                    buttonClassName='px-4'
                />
            }>
            <Menu.Item
                title={displayName}
                titleStyle={{ color: colors.primary, fontSize: 16, fontWeight: 'bold' }}
            />

            {route?.name === t('app') && <Menu.Item onPress={() => { handleNavigate(t('app settings')) }} title={t('app settings')} leadingIcon={'cog-outline'} />}
            {route?.name === t('app') && <Menu.Item onPress={() => { handleNavigate(t('app users')) }} title={t('app users')} leadingIcon={'account-box-multiple-outline'} />}
            {route?.name === t('app settings') && <Menu.Item onPress={() => { handleNavigate(t('app users')) }} title={t('app users')} leadingIcon={'account-box-multiple-outline'} />}
            {route?.name === t('app users') && <Menu.Item onPress={() => { handleNavigate(t('app settings')) }} title={t('app settings')} leadingIcon={'cog-outline'} />}

            <Menu.Item
                onPress={openAPK}
                title={t('update')}
                leadingIcon={() => (
                    <Icon
                        source='cloud-download-outline'
                        size={22}
                        color={colors.onBackground}
                    />
                )}
                titleStyle={{ color: colors.onBackground, fontSize: 16 }}
            />
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
            <Menu.Item
                title={version}
                titleStyle={{ color: colors.onBackground, fontSize: 16 }}
            />
        </Menu>
    )
}

export default CustomMenu