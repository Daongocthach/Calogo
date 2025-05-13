import { create } from "zustand"
import { devtools, persist, createJSONStorage } from "zustand/middleware"
import { asyncStorage } from "@/store/storage"
import { BodyProps, FoodProps, LogProps } from "@/lib/types"
import { FoodSamples } from "@/lib"

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
        foodLibrary: FoodSamples,
        bmr: null,
        tdee: null,
        body: null,
        changeLanguage: (language) => set({ currentLanguage: language }),
        setDarkMode: (payload) => set({ darkMode: payload }),
        signUp: async (payload) => {
        },
        signIn: async (payload) => {
        },
        signOut: () => {
        },
        addFood: (payload) => {
          
        },
        editFood: (payload) => {
          
        },
        deleteFood: (payload) => {
          
        },

        saveBody: (payload) => {
          set({
            bmr: payload.bmr,
            tdee: payload.tdee,
            body: payload.body
          })
        },
        addDaily: (payload) => {
        },
        editDaily: (payload) => {
          
        },
        deleteDaily: (payload) => {
          
        },
        clearDaily: () => {
          set({
          })
        },
        clearAllData: () => {
          
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

        }),
      },
    )
  )
)

export default useStore
