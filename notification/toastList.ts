import { add } from "lodash"

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
  logout_failed: {
    type: "error",
    text1: "logout failed",
    text2: "please try again",
  },
  user_not_found: {
    type: "error",
    text1: "user not found",
    text2: "",
  },
  wrong_password: {
    type: "error",
    text1: "wrong password",
    text2: "",
  },
  invalid_email: {
    type: "error",
    text1: "invalid email",
    text2: "",
  },
  email_already_in_use: {
    type: "error",
    text1: "email already in use",
    text2: "",
  },
  weak_password: {
    type: "error",
    text1: "weak password",
    text2: "",
  },
  sign_up_failed: {
    type: "error",
    text1: "sign up failed",
    text2: "please try again",
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
  add_food_success: {
    type: "success",
    text1: "add food success",
    text2: "",
  },
  add_food_fail: {
    type: "error",
    text1: "add food fail",
    text2: "",
  },
  delete_food_success: {
    type: "success",
    text1: "delete food success",
    text2: "",
  },
  no_food_selected: {
    type: "error",
    text1: "no food selected",
    text2: "",
  },
  clear_data_success: {
    type: "success",
    text1: "clear data success",
    text2: "all data has been cleared",
  }
} as const

export type ToastType = keyof typeof toastList