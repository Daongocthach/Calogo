export const toastList = {
  login_success: {
    type: "success",
    text1: "login success",
    text2: "welcome back",
  },
  login_failed: {
    type: "error",
    text1: "login failed",
    text2: "please check your credentials",
  },
  sign_up_success: {
    type: "success",
    text1: "sign up success",
    text2: "created account successfully",
  },
  logout_success: {
    type: "success",
    text1: "logout success",
    text2: "see you later",
  },
  validation_failed: {
    type: "error",
    text1: "validation failed",
    text2: "failed to validate image",
  },
  update_success: {
    type: "success",
    text1: "update success",
    text2: "updated successfully",
  },
  update_failed: {
    type: "error",
    text1: "update failed",
    text2: "please try again",
  },
  result_saved: {
    type: "success",
    text1: "result saved",
    text2: "result has been saved successfully",
  },
  save_failed: {
    type: "error",
    text1: "save failed",
    text2: "failed to save result",
  },
  omega_already_added: {
    type: "error",
    text1: "omega already added",
    text2: "",
  },
  omega_item_added: {
    type: "success",
    text1: "omega item added successfully",
    text2: "",
  },
  omega_removed: {
    type: "success",
    text1: "omega removed successfully",
    text2: "",
  },
  fill_all_fields: {
    type: "error",
    text1: "please fill all fields",
    text2: "",
  },
  data_saved: {
    type: "success",
    text1: "data saved successfully",
    text2: "",
  },
  error_all_fields_required: {
    type: "error",
    text1: "error",
    text2: "all fields are required",
  },
  scan_barcode: {
    type: "error",
    text1: "please scan barcode",
    text2: "",
  },
  select_foundry: {
    type: "error",
    text1: "please select foundry",
    text2: "",
  },
  scan_all_work_orders: {
    type: "error",
    text1: "please scan all work orders",
    text2: "",
  },
  save_data_successfully: {
    type: "success",
    text1: "save data successfully",
    text2: "",
  },
  error_missing_info: {
    type: "error",
    text1: "error",
    text2: "please fill all fields",
  },
  logout_machine_success: {
    type: "success",
    text1: "success",
    text2: "logout machine successfully",
  },
  nfc_tag_detected: {
    type: "success",
    text1: "nfc tag detected",
    text2: "added successfully",
  },
  added_fail: {
    type: "error",
    text1: "added fail",
    text2: "",
  },
} as const

export type ToastType = keyof typeof toastList