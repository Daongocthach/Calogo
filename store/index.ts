import { create } from "zustand"
import { devtools, persist, createJSONStorage } from "zustand/middleware"
import { asyncStorage } from "@/store/storage"
import { FoodSamples, BodyProps, FoodProps, LogProps, FoodTypeProps, FoodTypeSamples } from "@/lib"
import { showAlert, showToast } from "@/notification"

type BodyDataStored = {
  bmr: number
  tdee: number
  body: BodyProps
}

type StoreState = {
  darkMode: boolean
  currentLanguage: "cn" | "en" | "vi"
  isLoading: boolean
  isLoggedIn: boolean
  todayCalories: number
  bmr: number | null
  tdee: number | null
  body: BodyProps | null
  foodTypes: FoodTypeProps[]
  foodList: FoodProps[]
  changeLanguage: (language: "cn" | "en" | "vi") => void
  setDarkMode: (payload: boolean) => void
  signUp: (payload: any) => void
  signIn: (payload: any) => void
  signOut: () => void
  addFood: (payload: FoodProps) => void
  editFood: (payload: FoodProps) => void
  deleteFood: (payload: string) => void
  saveBody: (payload: BodyDataStored) => void
  addDaily: (payload: LogProps) => void
  editDaily: (payload: LogProps) => void
  deleteDaily: (payload: string) => void
  clearDaily: () => void
  clearAllData: () => void
}

const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        darkMode: false,
        currentLanguage: "vi",
        isLoading: false,
        isLoggedIn: false,
        todayCalories: 0,
        todayLogs: [],
        historyFoodLogs: [],
        weekCalories: [0, 0, 0, 0, 0, 0, 0],
        bmr: null,
        tdee: null,
        body: null,
        foodTypes: FoodTypeSamples,
        foodList: FoodSamples,
        changeLanguage: (language) => set({ currentLanguage: language }),
        setDarkMode: (payload) => set({ darkMode: payload }),
        signUp: async (payload) => {},
        signIn: async (payload) => {},
        signOut: () => {},
        addFood: (payload) => {
          set((state) => ({
            foodList: [...state.foodList, payload],
          }))
          showToast("add_food_success")
        },
        editFood: (payload) => {
          set((state) => ({
            foodList: state.foodList.map((food) =>
              food.id === payload.id ? { ...food, ...payload } : food
            ),
          }))
          showToast("update_food_success")
        },
        deleteFood: (payload) => {
          showAlert("delete_food", () => {
            set((state) => ({
              foodList: state.foodList.filter((food) => food.id !== payload),
            }))
            showToast("delete_food_success")
          })

        },

        saveBody: (payload) => {
          set({
            bmr: payload.bmr,
            tdee: payload.tdee,
            body: payload.body,
          })
        },
        addDaily: (payload) => {},
        editDaily: (payload) => {},
        deleteDaily: (payload) => {},
        clearDaily: () => {
          set({})
        },
        clearAllData: () => {
          set({
            bmr: null,
            tdee: null,
            body: null,
            todayCalories: 0,
            foodTypes: FoodTypeSamples,
            foodList: FoodSamples,
          })
          showToast('clear_data_success')
        },
      }),
      {
        name: "calogo-storage",
        storage: createJSONStorage(() => asyncStorage),
        partialize: (state) => ({
          darkMode: state.darkMode,
          currentLanguage: state.currentLanguage,
          isLoggedIn: state.isLoggedIn,
          bmr: state.bmr,
          tdee: state.tdee,
          body: state.body,
          todayCalories: state.todayCalories,
          foodTypes: state.foodTypes,
          foodList: state.foodList,
        }),
      }
    )
  )
)

export default useStore
