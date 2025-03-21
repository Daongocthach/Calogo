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
  save_failed: {
    type: "error",
    text1: "save failed",
    text2: "failed to save result",
  },
  fill_all_fields: {
    type: "error",
    text1: "please fill all fields",
    text2: "",
  },
  save_data_successfully: {
    type: "success",
    text1: "save data successfully",
    text2: "",
  },
  added_fail: {
    type: "error",
    text1: "added fail",
    text2: "",
  },
  
} as const

export type ToastType = keyof typeof toastList