import Toast from "react-native-toast-message"
import { toastList, ToastType } from "@/notification/toastList"
import { alertList, AlertType } from "@/notification/alertList"
import i18next from "@/locales"
import { showCustomAlert } from "./alert"

export const showToast = (name: ToastType) => {

    if (!toastList[name]) return
    const { type, text1, text2 } = toastList[name]

    Toast.show({
        type,
        text1: text1 ? i18next.t(text1) : "",
        text2: text2 ? i18next.t(text2) : "",
        autoHide: true,
        visibilityTime: 2000,
    })
}

export const showAlert = (name: AlertType, handle?: () => void) => {
    if (!alertList[name]) return
    const { type, text1, text2 } = alertList[name]
    showCustomAlert({
        text1: i18next.t(text1),
        text2: i18next.t(text2),
        type: type,
        onConfirm: handle,
    })
}

