import { View, Pressable, ScrollView } from "react-native"
import { Modal, Portal, useTheme } from 'react-native-paper'
import { useTranslation } from "react-i18next"

import { CustomButton, CustomText } from "@/components"

type ModalProps = {
    isNoButton?: boolean
    isNotCloseModal?: boolean
    visible: boolean
    children?: React.ReactNode
    buttonTitle?: string
    onClose: () => void
    handle?: () => void
}

const CustomModal = ({
    isNotCloseModal,
    isNoButton,
    visible,
    children,
    buttonTitle,
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
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onClose}
                contentContainerStyle={{
                    backgroundColor: colors.background,
                    padding: 20,
                    borderRadius: 10,
                }}
                style={{ padding: 20, backgroundColor: colors.backdrop }}
            >
                <ScrollView>
                    {children}
                    {!isNoButton &&
                        <View className="flex flex-row justify-between w-full items-center my-2">
                            <Pressable
                                onPress={() => onClose()}>
                                <CustomText style={{ color: colors.onSurfaceDisabled }} className="text-sm">
                                    {t("cancel")}
                                </CustomText>
                            </Pressable>
                            <CustomButton
                                text={buttonTitle || t("confirm")}
                                handle={handleConfirm}
                                buttonClassName="p-3 py rounded-full"
                            />
                        </View>
                    }
                </ScrollView>
            </Modal>
        </Portal >
    )
}

export default CustomModal