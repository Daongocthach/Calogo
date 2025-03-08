import Toast from "react-native-toast-message"
import { Alert } from "react-native"
import { toastList, ToastType } from "@/notification/toastList"
import { alertList, AlertType } from "@/notification/alertList"
import i18next from "@/locales"

export const showToast = (name: ToastType) => {

    if (!toastList[name]) return
    const { type, text1, text2 } = toastList[name]

    Toast.show({
        type,
        text1: text1 ? i18next.t(text1) : "",
        text2: text2 ? i18next.t(text2) : "",
    })
}


export const showAlert = (name: AlertType, handle?: () => void) => {
    if (!alertList[name]) return
    const { type, text1, text2 } = alertList[name]

    Alert.alert(i18next.t(text1), i18next.t(text2),
        type === 'ok' ? [{ text: "OK", style: "cancel" }] :
        type === 'confirm' ?
        [
            { text: i18next.t("cancel"), style: "cancel" },
            {
                text: i18next.t("confirm"),
                onPress: () => {
                    if (handle)
                        handle()
                },
            },
        ] : []
    )
}

