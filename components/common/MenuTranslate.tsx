import { useState } from 'react'
import { Menu, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import useStore from '@/store'
import CustomButton from '@/components/common/CustomButton'

const MenuTranslate = () => {
    const { colors } = useTheme()
    const { i18n } = useTranslation()
    const [visible, setVisible] = useState(false)
    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)
    const { changeLanguage, currentLanguage } = useStore()
    const handleChangeLanguage = (language: "cn" | "en" | "vi") => {
        changeLanguage(language)
        i18n.changeLanguage(language);
        closeMenu()
    }
    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchorPosition='bottom'
            contentStyle={{ backgroundColor: colors.background, marginTop: 10 }}
            anchor={
                <CustomButton
                    handle={openMenu}
                    iconColor={visible ? colors.onSurfaceDisabled : colors.onBackground}
                    icon={'translate'}
                    buttonClassName='px-2'
                />
            }>
            <Menu.Item
                onPress={() => { handleChangeLanguage('vi') }} title={'Tiếng Việt'}
                titleStyle={{ color: currentLanguage === 'vi' ? colors.primary : colors.onBackground }}
            />
            <Menu.Item
                onPress={() => { handleChangeLanguage('en') }} title={'English'}
                titleStyle={{ color: currentLanguage === 'en' ? colors.primary : colors.onBackground }}
            />
            <Menu.Item
                onPress={() => { handleChangeLanguage('cn') }}
                title={'中文'}
                titleStyle={{ color: currentLanguage === 'cn' ? colors.primary : colors.onBackground }}
            />
        </Menu>
    )
}

export default MenuTranslate