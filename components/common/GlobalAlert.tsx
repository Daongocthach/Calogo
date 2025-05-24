import React, { createContext, useContext, useState, useEffect } from "react"
import { View, TouchableOpacity } from "react-native"
import { useTranslation } from "react-i18next"
import { setGlobalShowAlert } from "@/notification/alert"
import CustomModal from "./CustomModal"
import CustomText from "./CustomText"
import CustomButton from "./CustomButton"

import { useTheme } from "react-native-paper"

type AlertConfig = {
  text1: string
  text2: string
  type: 'ok' | 'confirm'
  onConfirm?: () => void
  buttonTitle?: string
  buttonColor?: string
}

const AlertContext = createContext<(config: AlertConfig) => void>(() => {})

export const useGlobalAlert = () => useContext(AlertContext)

export function GlobalAlertProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const [visible, setVisible] = useState(false)
  const [config, setConfig] = useState<AlertConfig | null>(null)

  const show = (newConfig: AlertConfig) => {
    setConfig(newConfig)
    setVisible(true)
  }

  useEffect(() => {
    setGlobalShowAlert(show)
  }, [])

  const hide = () => setVisible(false)

  const handleConfirm = () => {
    if (config?.onConfirm) config.onConfirm()
    hide()
  }

  const isConfirm = config?.type === 'confirm'

  return (
    <AlertContext.Provider value={show}>
      {children}
      <CustomModal visible={visible} onClose={hide}>
        <CustomText className="font-bold text-center text-xl mb-2">
          {config?.text1 || t('alert')}
        </CustomText>
        <CustomText className="text-center mb-4">
          {config?.text2}
        </CustomText>

        {!isConfirm && (
          <CustomButton
            text={config?.buttonTitle || t("ok")}
            handle={handleConfirm}
            buttonClassName="p-4"
            style={{
              borderRadius: 12,
              backgroundColor: config?.buttonColor || colors.primary,
            }}
          />
        )}

        {isConfirm && (
          <View
            className="flex-row mt-4"
            style={{ borderTopWidth: 1, borderTopColor: colors.outline }}
          >
            <TouchableOpacity
              className="flex-1 items-center justify-center"
              style={{
                borderRightWidth: 1,
                borderRightColor: colors.outline,
                padding: 15,
              }}
              onPress={hide}
            >
              <CustomText className="font-medium" style={{ color: colors.outlineVariant }}>
                {t("cancel")}
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 items-center justify-center"
              style={{ padding: 15 }}
              onPress={handleConfirm}
            >
              <CustomText className="font-medium" style={{ color: colors.primary }}>
                {t("yes")}
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </CustomModal>
    </AlertContext.Provider>
  )
}
