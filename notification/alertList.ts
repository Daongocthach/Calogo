export const alertList = {
    update_success: {
        type: "ok",
        text1: "success",
        text2: "updated successfully",
    },
    update_failed: {
        type: "ok",
        text1: "error",
        text2: "failed to update parameter",
    },
    save_success: {
        type: "ok",
        text1: "success",
        text2: "saved successfully",
    },
    save_failed: {
        type: "ok",
        text1: "error",
        text2: "save failed",
    },
    logout: {
        type: "confirm",
        text1: "logout",
        text2: "are you sure you want to logout",
    },
    clear_data: {
        type: "confirm",
        text1: "clear data",
        text2: "are you sure you want to clear data",
    },
    network_error: {
        type: "ok",
        text1: "error",
        text2: "network error",
    },
    all_fill_are_required: {
        type: "ok",
        text1: "error",
        text2: "all fields are required",
    },
} as const

export type AlertType = keyof typeof alertList