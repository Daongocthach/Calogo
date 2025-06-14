import { useState, useMemo } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native"
import { RadioButton, useTheme } from "react-native-paper"
import Slider from "@react-native-community/slider"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useTranslation } from "react-i18next"

import useStore from "@/store"
import { CustomText, ProgressStep, ProgressSteps } from "@/components"
import { Gender, ActivityLevel, Goal } from "@/lib"
import { showToast } from "@/notification"
import IMAGES from "@/assets/images"

const intensityOptions = ["inactive", "light", "moderate", "active", "very_active"]
const imageSources: { [key: string]: any } = {
  inactive: IMAGES.INACTIVE,
  light: IMAGES.LOW,
  moderate: IMAGES.MEDIUM,
  active: IMAGES.HIGH,
  very_active: IMAGES.SUPER,
}
const descriptions: { [key: string]: React.ReactNode } = {
  inactive: (
    <Text style={{ fontSize: 16 }}>
      Thể dục ít{"\n"}
      <Text style={{ fontSize: 12, color: "#6b7280" }}>
        (Hoặc không tập thể dục)
      </Text>
    </Text>
  ),
  light: (
    <Text style={{ fontSize: 16 }}>
      Nhẹ nhàng{"\n"}
      <Text style={{ fontSize: 12, color: "#6b7280" }}>
        (Thể dục 1–3 ngày/tuần)
      </Text>
    </Text>
  ),
  moderate: (
    <Text style={{ fontSize: 16 }}>
      Vừa phải{"\n"}
      <Text style={{ fontSize: 12, color: "#6b7280" }}>
        (Thể dục 3–5 ngày/tuần)
      </Text>
    </Text>
  ),
  active: (
    <Text style={{ fontSize: 16 }}>
      Năng động{"\n"}
      <Text style={{ fontSize: 12, color: "#6b7280" }}>
        (Thể dục 6–7 ngày/tuần)
      </Text>
    </Text>
  ),
  very_active: (
    <Text style={{ fontSize: 16 }}>
      Cường độ cao{"\n"}
      <Text style={{ fontSize: 12, color: "#6b7280" }}>
        (Thể dục hơn 90p/ngày,{"\n"}công việc nặng)
      </Text>
    </Text>
  ),
}

const goalOptions = ["fast", "medium", "maintain", "gain"]
const imageGoalSources: { [key: string]: any } = {
  fast: IMAGES.LOOSE_FAST,
  medium: IMAGES.LOOSE_MEDIUM,
  maintain: IMAGES.MAINTAIN,
  gain: IMAGES.GAIN,
}
const goalDescriptions: { [key: string]: React.ReactNode } = {
  fast: (
    <>
      <Text style={{ fontSize: 16 }}>
        Giảm cân nhanh{"\n"}
        <Text style={{ fontSize: 12, color: "#6b7280" }}>(0,75kg/tuần)</Text>
      </Text>
    </>
  ),
  medium: (
    <>
      <Text style={{ fontSize: 16 }}>
        Giảm trung bình{"\n"}
        <Text style={{ fontSize: 12, color: "#6b7280" }}>(0,5kg/tuần)</Text>
      </Text>
    </>
  ),
  maintain: (
    <>
      <Text style={{ fontSize: 16 }}>
        Giữ nguyên cân nặng{"\n"}
        <Text style={{ fontSize: 12, color: "#6b7280" }}>
          (Tối ưu sức khỏe của bạn)
        </Text>
      </Text>
    </>
  ),
  gain: (
    <>
      <Text style={{ fontSize: 16 }}>
        Tăng cân{"\n"}
        <Text style={{ fontSize: 12, color: "#6b7280" }}>(0,5kg/tuần)</Text>
      </Text>
    </>
  ),
}

export default function WelcomeScreen() {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const router = useRouter()
  const [height, setHeight] = useState<number>(170)
  const [weight, setWeight] = useState(65)
  const [age, setAge] = useState(17)
  const [gender, setGender] = useState<Gender>("male")
  const [intensity, setIntensity] = useState<ActivityLevel>("moderate")
  const [goal, setGoal] = useState<Goal>("maintain")

  const calculateBMR = useMemo(() => {
    const bmr = gender === "male"
      ? Math.round(66 + 13.75 * weight + 5 * height - 6.76 * age)
      : Math.round(655 + 9.56 * weight + 1.85 * height - 4.68 * age)
    return bmr
  }, [gender, weight, height, age])

  const calculateTdee = useMemo(() => {
    const activityMultipliers = {
      inactive: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    }
    const tdee = Math.round(calculateBMR * activityMultipliers[intensity])
    return tdee
  }, [calculateBMR, intensity])

  const adjustHeight = (delta: number) => {
    setHeight((prev) => Math.max(1, prev + delta))
  }

  const adjustWeight = (delta: number) => {
    setWeight((prev) => Math.max(1, prev + delta))
  }

  const adjustAge = (delta: number) => {
    setAge((prev) => Math.max(1, prev + delta))
  }

  const { saveBody } = useStore()

  const handleSubmit = () => {
    if (!weight || !height || !age) return

    saveBody({
      bmr: calculateBMR,
      tdee: calculateTdee,
      body: {
        height,
        weight,
        age,
        gender,
        activity_level: intensity,
      },
    })
    router.replace("/")
    showToast("save_data_successfully")
  }

  const renderIntensityOptions = () => {
    return intensityOptions.map((option, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => setIntensity(option as ActivityLevel)}
        className={`
          flex flex-row items-center gap-2 p-4 rounded-xl 
          ${intensity === option ? "bg-lime-100" : "border border-blue-100"}
        `}
      >
        <RadioButton.Android
          value={option}
          status={intensity === option ? "checked" : "unchecked"}
          onPress={() => setIntensity(option as ActivityLevel)}
          color="#3b82f6"
          uncheckedColor="#3b82f6"
        />
        <Image
          source={imageSources[option]}
          style={{ width: 100, height: 100, borderRadius: 20 }}
          resizeMode="contain"
        />
        <Text className="text-base text-center text-blue-500 font-semibold flex-1">
          {descriptions[option]}
        </Text>
      </TouchableOpacity>
    ))
  }

  const renderGoalOptions = () => {
    return goalOptions.map((option, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => setGoal(option as Goal)}
        className={`
          flex flex-row items-center gap-2 p-4 rounded-xl 
          ${goal === option ? "bg-lime-100" : "border border-blue-100"}
        `}
      >
        <RadioButton.Android
          value={option}
          status={goal === option ? "checked" : "unchecked"}
          onPress={() => setGoal(option as Goal)}
          color="#3b82f6"
          uncheckedColor="#3b82f6"
        />
        <Image
          source={imageGoalSources[option]}
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: "white",
          }}
          resizeMode="contain"
        />
        <Text className="text-base text-center text-blue-500 font-semibold flex-1">
          {goalDescriptions[option]}
        </Text>
      </TouchableOpacity>
    ))
  }
  return (
    <View className="relative flex-1 bg-white">
      <SafeAreaView
        className="flex flex-row justify-between items-center px-4"
        style={{ paddingBottom: 10 }}
      >
        <Image
          source={IMAGES.LOGO_HEADER_LIGHT}
          style={{ width: 250, height: 75 }}
          resizeMode="contain"
        />
      </SafeAreaView>
      <ProgressSteps
        activeStepIconBorderColor="#3b82f6"
        completedStepIconColor="#3b82f6"
        activeLabelColor="#3b82f6"
        completedProgressBarColor="#3b82f6"
        activeStepNumColor="#3b82f6"
        disabledStepIconColor="#eff6ff"
        labelColor="#475569"
        disabledStepNumColor="#3b82f6"
        completedLabelColor="#3b82f6"
      >
        <ProgressStep>
          <View className="flex-1 p-1">
            <View style={[styles.containerShadow, { backgroundColor: colors.background }]}>
              <Text className="text-xl font-semibold text-gray-500 w-full text-center mb-4">
                Chọn giới tính của bạn
              </Text>
              <View className="flex flex-row gap-2 ">
                <TouchableOpacity
                  className={`flex-1 flex flex-row items-center justify-center gap-2 py-8 rounded-xl 
                    ${gender === "male" ? "bg-blue-50" : "border border-blue-50"
                    }`}
                  onPress={() => setGender("male")}
                >
                  <RadioButton.Android
                    value="male"
                    status={gender === "male" ? "checked" : "unchecked"}
                    onPress={() => setGender("male")}
                    color="#3b82f6"
                    uncheckedColor="#3b82f6"
                  />
                  <View>
                    <Image
                      source={IMAGES.MALE}
                      style={{ width: 50, height: 50, borderRadius: 25 }}
                    />
                    <Text className="text-xl text-center font-semibold text-blue-500">
                      Nam
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex-1 flex flex-row items-center justify-center gap-2 py-8 rounded-xl 
                    ${gender === "female"
                      ? "bg-blue-50"
                      : "border border-blue-50"
                    }`}
                  onPress={() => setGender("female")}
                >
                  <RadioButton.Android
                    value="female"
                    status={gender === "female" ? "checked" : "unchecked"}
                    onPress={() => setGender("female")}
                    color="#3b82f6"
                    uncheckedColor="#3b82f6"
                  />
                  <View>
                    <Image
                      source={IMAGES.FEMALE}
                      style={{ width: 50, height: 50, borderRadius: 25 }}
                    />
                    <Text className="text-xl text-center font-semibold text-blue-500">
                      Nữ
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.containerShadow, { backgroundColor: colors.background }]} className="mt-6">
              <View className="flex flex-row items-center justify-between w-full mb-4">
                <Text className="text-xl font-semibold text-gray-500">
                  Chiều cao
                </Text>
                <View className="px-2 py-1 rounded-md bg-lime-100">
                  <Text className="text-lime-500 font-bold">cm</Text>
                </View>
              </View>
              <TextInput
                className="text-blue-500 text-5xl font-bold text-center"
                keyboardType="numeric"
                value={height.toString()}
                onChangeText={(text) => setHeight(parseFloat(text) || 0)}
              />
              <View className="flex flex-row justify-between items-center gap-2">
                <TouchableOpacity
                  style={{ flex: 0 }}
                  onPress={() => adjustHeight(-1)}
                >
                  <MaterialCommunityIcons
                    name="minus"
                    size={20}
                    color={"#9ca3af"}
                  />
                </TouchableOpacity>
                <Slider
                  style={{ flex: 1, height: 35 }}
                  minimumValue={100}
                  maximumValue={250}
                  minimumTrackTintColor="#3b82f6"
                  maximumTrackTintColor="#6b7280"
                  thumbTintColor="#3b82f6"
                  value={height}
                  step={1}
                  onSlidingComplete={(e) => {
                    setHeight(e)
                  }}
                />
                <TouchableOpacity
                  style={{ flex: 0 }}
                  onPress={() => adjustHeight(1)}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={20}
                    color={"#9ca3af"}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex flex-row justify-center gap-4 mt-6">
              {/* Cân nặng */}
              <View style={[styles.containerShadow, { backgroundColor: colors.background }]} className="flex-1">
                <View className="flex flex-row items-center justify-between w-full">
                  <Text className="text-gray-500 text-xl font-semibold">
                    Cân nặng
                  </Text>
                  <View className="px-2 py-1 rounded-md bg-lime-100">
                    <Text className="text-lime-500 font-bold">kg</Text>
                  </View>
                </View>
                <TextInput
                  className="text-blue-500 text-5xl font-bold text-center mt-4"
                  keyboardType="numeric"
                  value={weight.toString()}
                  onChangeText={(text) => setWeight(parseFloat(text) || 0)}
                />
                <View className="flex flex-row justify-between w-full mt-2">
                  <TouchableOpacity onPress={() => adjustWeight(-1)}>
                    <MaterialCommunityIcons
                      name="minus"
                      size={28}
                      color={"#9ca3af"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => adjustWeight(1)}>
                    <MaterialCommunityIcons
                      name="plus"
                      size={28}
                      color={"#9ca3af"}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Tuổi */}
              <View style={[styles.containerShadow, { backgroundColor: colors.background }]} className="flex-1">
                <View className="flex flex-row items-center justify-between w-full">
                  <Text className="text-gray-500 text-xl text-center font-semibold">
                    Tuổi
                  </Text>
                  <View className="px-2 py-1 rounded-md bg-lime-100">
                    <Text className="text-lime-500 font-bold">age</Text>
                  </View>
                </View>
                <TextInput
                  className="text-blue-500 text-5xl font-bold text-center mt-4"
                  keyboardType="numeric"
                  value={age.toString()}
                  onChangeText={(text) => setAge(parseInt(text) || 0)}
                />
                <View className="flex flex-row justify-between w-full mt-2">
                  <TouchableOpacity onPress={() => adjustAge(-1)}>
                    <MaterialCommunityIcons
                      name="minus"
                      size={28}
                      color={"#9ca3af"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => adjustAge(1)}>
                    <MaterialCommunityIcons
                      name="plus"
                      size={28}
                      color={"#9ca3af"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ProgressStep>

        {/* Mức độ vận động */}
        <ProgressStep>
          <Text className="text-gray-500 text-xl font-semibold w-full text-center mb-4">
            Mức độ vận động của bạn thế nào?
          </Text>
          <View className="flex flex-col gap-2">
            {renderIntensityOptions()}
          </View>
        </ProgressStep>

        {/* Chọn chế độ tăng/giảm cân */}
        <ProgressStep>
          <Text className="text-gray-500 text-xl font-semibold w-full text-center mb-4">
            Mục tiêu của bạn là gì?
          </Text>
          <View className="flex flex-col gap-2">{renderGoalOptions()}</View>
        </ProgressStep>

        {/* Hoàn tất */}
        <ProgressStep onSubmit={handleSubmit}>
          <View
            style={{
              alignItems: "center",
              paddingTop: 20,
              paddingHorizontal: 20,
            }}
          >
            <View style={{
              backgroundColor: colors.background,
              padding: 12,
              borderRadius: 12,
              elevation: 2,
            }}>
              <CustomText>
                TDEE =
                <Text className="text-lime-600 font-bold"> {calculateTdee} </Text>
                ({t('calories/day')})
              </CustomText>
              <CustomText>
                BMR =
                <Text className="text-lime-600 font-bold"> {calculateBMR} </Text>
                ({t('calories/day')})
              </CustomText>
            </View>

            <Image
              source={IMAGES.THUC_DON_THUAN_VIET}
              style={{
                width: 200,
                height: 200,
                borderRadius: 20,
                marginTop: 10,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                marginTop: 20,
                color: "#374151",
              }}
            >
              Kế hoạch calo tối ưu cho bạn đã{" "}
              <Text style={{ fontWeight: "bold", color: "#3b82f6" }}>
                "Sẵn sàng!"
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                marginTop: 6,
                color: "#374151",
              }}
            >
              Nhấn nút{" "}
              <Text style={{ fontWeight: "bold", color: "#3b82f6" }}>
                "Hoàn tất"
              </Text>{" "}
              để lưu thông tin.
            </Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View >
  )
}

const styles = StyleSheet.create({
  containerShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    padding: 10,
    borderRadius: 10,
  },
})
