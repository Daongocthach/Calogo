import { Dimensions } from 'react-native'
import { FoodProps } from '@/lib'

export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height

export const FoodTypeSamples = [
    { id: 'fastfood', name: 'Thức ăn nhanh (Fast Food)', icon: '🍔' },
    { id: 'vegetable', name: 'Rau củ (Vegetable)', icon: '🥦' },
    { id: 'fruit', name: 'Trái cây (Fruit)', icon: '🍎' },
    { id: 'meat', name: 'Thịt (Meat)', icon: '🍗' },
    { id: 'seafood', name: 'Hải sản (Seafood)', icon: '🦐' },
    { id: 'drink', name: 'Đồ uống (Drink)', icon: '🧋' },
    { id: 'bread', name: 'Ngũ cốc & Tinh bột (Bread/Carbs)', icon: '🍚' },
    { id: 'snack', name: 'Đồ ăn nhẹ (Snack)', icon: '🍪' },
    { id: 'sweet', name: 'Đồ ngọt (Sweet)', icon: '🍰' },
    { id: 'dairy', name: 'Sữa & Chế phẩm từ sữa (Dairy)', icon: '🥛' },
    { id: 'vegetarian', name: 'Đồ chay (Vegetarian)', icon: '🌱' },
    { id: 'sauce', name: 'Gia vị & Sốt (Sauce)', icon: '🧂' },
    { id: 'traditional', name: 'Món truyền thống (Traditional)', icon: '🍱' },
    { id: 'supplement', name: 'Thực phẩm chức năng (Supplement)', icon: '💊' },
];

export const getFoodType = (id: string) => FoodTypeSamples.find((item) => item.id === id)!

export const FoodSamples: FoodProps[] = [
    {
        id: 'vegetable-001',
        food_type: getFoodType('vegetable'),
        name: 'Cà chua',
        carb_weight: 4,
        protein_weight: 1,
        fat_weight: 0.2,
        calorie: 18,
    },
    {
        id: 'fruit-001',
        food_type: getFoodType('fruit'),
        name: 'Chuối',
        carb_weight: 23,
        protein_weight: 1.1,
        fat_weight: 0.3,
        calorie: 89,
    },
    {
        id: 'fastfood-001',
        food_type: getFoodType('fastfood'),
        name: 'Hamburger bò',
        carb_weight: 30,
        protein_weight: 17,
        fat_weight: 15,
        calorie: 350,
    },
    {
        id: 'meat-001',
        food_type: getFoodType('meat'),
        name: 'Ức gà luộc',
        carb_weight: 0,
        protein_weight: 31,
        fat_weight: 3.6,
        calorie: 165,
    },
    {
        id: 'dairy-001',
        food_type: getFoodType('dairy'),
        name: 'Sữa tươi không đường',
        carb_weight: 5,
        protein_weight: 3.4,
        fat_weight: 3.3,
        calorie: 61,
    },
    {
        id: 'snack-001',
        food_type: getFoodType('snack'),
        name: 'Bim bim khoai tây',
        carb_weight: 15,
        protein_weight: 2,
        fat_weight: 10,
        calorie: 160,
    },
    {
        id: 'bread-001',
        food_type: getFoodType('bread'),
        name: 'Cơm trắng',
        carb_weight: 28,
        protein_weight: 2.7,
        fat_weight: 0.3,
        calorie: 130,
    },
    {
        id: 'sweet-001',
        food_type: getFoodType('sweet'),
        name: 'Bánh flan',
        carb_weight: 22,
        protein_weight: 3.2,
        fat_weight: 3.5,
        calorie: 150,
    },
    {
        id: 'drink-001',
        food_type: getFoodType('drink'),
        name: 'Trà sữa',
        carb_weight: 38,
        protein_weight: 1.5,
        fat_weight: 3.5,
        calorie: 220,
    },
    {
        id: 'vegetarian-001',
        food_type: getFoodType('vegetarian'),
        name: 'Đậu phụ hấp',
        carb_weight: 1.9,
        protein_weight: 8,
        fat_weight: 4.8,
        calorie: 98,
    }
];