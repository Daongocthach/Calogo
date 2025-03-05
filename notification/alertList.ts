export const alertList = {
    validation_failed: {
        type: "ok",
        text1: "error",
        text2: "failed to validate image",
    },
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
    nfc_error_not_supported: {
        type: "ok",
        text1: "nfc error",
        text2: "nfc error not supported",
    },
    invalid_decoded_data: {
        type: "ok",
        text1: "error",
        text2: "invalid decoded data",
    },
    unable_check_another_machine: {
        type: "ok",
        text1: "error",
        text2: "unable to check another machine",
    },
    nfc_error_invalid_tag: {
        type: "ok",
        text1: "nfc error",
        text2: "nfc error invalid tag",
    },
    logout_machine_failed: {
        type: "ok",
        text1: "error",
        text2: "logout machine failed",
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
    open_apk_failed: {
        type: "ok",
        text1: "error",
        text2: "could not open apk file",
    },
    remove_knife_success: {
        type: "ok",
        text1: "success",
        text2: "removed knife successfully",
    },
    the_latest_version: {
        type: "ok",
        text1: "error",
        text2: "this is the latest version",
    },
    update_available: {
        type: "confirm",
        text1: "new version available",
        text2: "do you want to update",
    },
    network_error: {
        type: "ok",
        text1: "error",
        text2: "network error",
    },
    please_select_zoller: {
        type: "ok",
        text1: "error",
        text2: "please select a zoller first",
    },
    maximum_tabs_reached: {
        type: "ok",
        text1: "error",
        text2: "you can only open 10 tabs at a time",
    },
    call_main_proc: {
        type: "confirm",
        text1: "are you want to call main proc",
        text2: "press confirm",
    },
    all_fill_are_required: {
        type: "ok",
        text1: "error",
        text2: "all fields are required",
    },
    leave_screen: {
        type: "confirm",
        text1: "leave this screen",
        text2: "are you want to leave this screen",
    },
    get_tool_sucessfully: {
        type: "confirm",
        text1: "got tool successfully",
        text2: "are you sure you successfully got the tool",
    },
    permission_denied: {
        type: "ok",
        text1: "permission denied",
        text2: "please enable camera access in settings",
    },
    close_all_tabs: {
        type: "confirm",
        text1: "close all tabs",
        text2: "are you sure you want to close all tabs",
    },
    exit_gauge: {
        type: "confirm",
        text1: "exit confirmation",
        text2: "are you sure to exit the process checking",
    },
    login_again: {
        type: "ok",
        text1: "invalid user code",
        text2: "please login again",
    },
} as const

export type AlertType = keyof typeof alertList