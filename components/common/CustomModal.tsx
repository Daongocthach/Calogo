import { memo } from "react"
import { View, ActivityIndicator, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native"
import { Modal, Portal, useTheme } from 'react-native-paper'
import { useTranslation } from "react-i18next"

import CustomButton from "@/components/common/CustomButton"
import CustomText from "@/components/common/CustomText"
import Icon from "@/components/common/Icon"

type ModalProps = {
    modalTitle?: string
    isNotCloseModal?: boolean
    isYesCancelButton?: boolean,
    isOnlyConfirmButton?: boolean,
    visible: boolean
    children?: React.ReactNode
    buttonTitle?: string
    buttonColor?: string
    isLoading?: boolean
    onClose: () => void
    handle?: () => void
}

const CustomModal = ({
    modalTitle,
    isNotCloseModal,
    isYesCancelButton,
    isOnlyConfirmButton,
    visible,
    children,
    buttonTitle,
    buttonColor,
    isLoading,
    onClose,
    handle,
}: ModalProps) => {
    const { t } = useTranslation()
    const { colors } = useTheme()

    const handleConfirm = async () => {
        handle && handle()
        !isNotCloseModal && onClose()
    }

    return (
        <Modal
            visible={visible}
            onDismiss={onClose}
            contentContainerStyle={{
                backgroundColor: colors.background,
                borderRadius: 12,
            }}
            style={{ padding: 20, backgroundColor: colors.backdrop, zIndex: 1000 }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={{ padding: 20 }}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    {isOnlyConfirmButton &&
                        <View className='w-full items-end'>
                            <TouchableOpacity onPress={onClose}>
                                <Icon name='X' size={20} color={colors.outlineVariant} />
                            </TouchableOpacity>
                        </View>
                    }
                    {modalTitle &&
                        <CustomText className='font-bold text-center text-xl'>
                            {modalTitle}
                        </CustomText>
                    }
                    {children}
                    {isLoading ? <ActivityIndicator size="large" color={colors.primary} />
                        :
                        (<>
                            {isOnlyConfirmButton &&
                                <CustomButton
                                    text={buttonTitle || t("submit")}
                                    handle={handleConfirm}
                                    buttonClassName="p-4 mt-4 mb-8"
                                    style={{
                                        borderRadius: 12,
                                        flex: 1,
                                        backgroundColor: buttonColor || colors.primary
                                    }}
                                />}
                            {isYesCancelButton &&
                                <View className="flex-row mt-4"
                                    style={{ borderTopWidth: 1, borderTopColor: colors.outline }}>
                                    <TouchableOpacity
                                        className="flex-1 items-center justify-center"
                                        style={{
                                            borderRightWidth: 1,
                                            borderRightColor: colors.outline,
                                            padding: 15
                                        }}
                                        onPress={onClose}
                                    >
                                        <CustomText className="font-medium" style={{ color: colors.outlineVariant }}>
                                            {t('cancel')}
                                        </CustomText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="flex-1 items-center justify-center"
                                        style={{ padding: 15 }}
                                        onPress={handleConfirm}
                                    >
                                        <CustomText className="font-medium" style={{ color: colors.primary }}>
                                            {t('yes')}
                                        </CustomText>
                                    </TouchableOpacity>
                                </View>
                            }
                        </>)
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default memo(CustomModal)