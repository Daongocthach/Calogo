import type { ScrollViewProps, ViewProps } from 'react-native'

export type ActivityLevel =
  | 'inactive'
  | 'light'
  | 'moderate'
  | 'active'
  | 'very_active'

export type BodyProps = {
  height: number
  weight: number
  age: number
  gender: Gender
  activity_level: ActivityLevel
}

export type UserProps = {
  id: string
  userName: string
  displayName: string
  email: string
  avatar: string
  gender: string
  birthday: string
}

export type CategoryProps = {
  id: string
  name: string
  icon: string
}

export type FoodProps = {
  id: string
  name: string
  carb_weight: number
  protein_weight: number
  fat_weight: number
  calorie: number
  food_type: CategoryProps
}

export type LogProps = {
  id: string
  name: string
  carb_weight: number
  protein_weight: number
  fat_weight: number
  calorie: number
  food_type: CategoryProps
  eaten_at: string
}

export type Gender = 'male' | 'female'



export interface ProgressStepsProps
  extends Omit<StepIconProps, 'stepNum' | 'isFirstStep' | 'isLastStep' | 'isActiveStep' | 'isCompletedStep' | 'label'> {
  isComplete?: boolean
  activeStep?: number
  topOffset?: number
  marginBottom?: number
  children: React.ReactElement<ProgressStepProps>[]
}

export interface ProgressStepsState {
  stepCount: number
  activeStep: number
}

export interface ProgressStepProps {
  setActiveStep?: (step: number) => void
  activeStep?: number
  stepCount?: number
  label?: string
  onNext?: () => void
  onPrevious?: () => void
  onSubmit?: () => void
  scrollViewProps?: ScrollViewProps
  scrollable?: boolean
  viewProps?: ViewProps
  errors?: boolean
  removeBtnRow?: boolean
  children?: React.ReactNode
  buttonNextText?: string
  buttonPreviousText?: string
  buttonFinishText?: string
  buttonNextDisabled?: boolean
  buttonPreviousDisabled?: boolean
  buttonFinishDisabled?: boolean
  buttonTopOffset?: number
  buttonBottomOffset?: number
  buttonHorizontalOffset?: number
  buttonFillColor?: string
  buttonBorderColor?: string
  buttonNextTextColor?: string
  buttonPreviousTextColor?: string
  buttonFinishTextColor?: string
  buttonDisabledColor?: string
  buttonDisabledTextColor?: string
}

export interface StepIconProps {
  stepNum: number
  isFirstStep: boolean
  isLastStep: boolean
  isActiveStep: boolean
  isCompletedStep: boolean
  label?: string
  borderWidth?: number
  activeStepIconBorderColor?: string
  progressBarColor?: string
  completedProgressBarColor?: string
  activeStepIconColor?: string
  disabledStepIconColor?: string
  completedStepIconColor?: string
  labelFontFamily?: string
  labelColor?: string
  labelFontSize?: number
  activeLabelColor?: string
  activeLabelFontSize?: number
  completedLabelColor?: string
  activeStepNumColor?: string
  completedStepNumColor?: string
  disabledStepNumColor?: string
  completedCheckColor?: string
}
