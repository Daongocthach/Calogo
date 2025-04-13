import { Dimensions } from 'react-native'

export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height

export const FoodTypes = {
    fastfood: { name: 'Thức ăn nhanh (Fast Food)', icon: '🍔' },
    vegetables: { name: 'Rau củ (Vegetables)', icon: '🥦' },
    fruits: { name: 'Trái cây (Fruits)', icon: '🍎' },
    meat_seafood: { name: 'Thịt & Hải sản (Meat & Seafood)', icon: '🍗' },
    beverages: { name: 'Đồ uống (Beverages)', icon: '🧋' },
    grains_carbs: { name: 'Ngũ cốc & Tinh bột (Grains & Carbs)', icon: '🍚' },
    snacks: { name: 'Đồ ăn nhẹ (Snacks)', icon: '🍪' },
    dairy: { name: 'Sữa & Chế phẩm từ sữa (Dairy)', icon: '🥛' },
    vegetarian: { name: 'Đồ chay (Vegetarian)', icon: '🌱' },
    desserts: { name: 'Đồ ngọt (Desserts)', icon: '🍰' },
    sauces: { name: 'Gia vị & Sốt (Sauces)', icon: '🧂' },
    traditional: { name: 'Món truyền thống (Traditional)', icon: '🍱' },
    supplements: { name: 'Thực phẩm chức năng (Supplements)', icon: '💊' },
} as const


export const FoodSamples = [
    {
        id: 'vegetables-001',
        type: 'vegetables',
        name: 'Cà chua',
        carbsWeight: 4,
        proteinsWeight: 1,
        fatsWeight: 0.2,
        calories: 18,
    },
    {
        id: 'fruits-001',
        type: 'fruits',
        name: 'Chuối',
        carbsWeight: 23,
        proteinsWeight: 1.1,
        fatsWeight: 0.3,
        calories: 89,
    },
    {
        id: 'fastfood-001',
        type: 'fastfood',
        name: 'Hamburger bò',
        carbsWeight: 30,
        proteinsWeight: 17,
        fatsWeight: 15,
        calories: 350,
    },
    {
        id: 'meat_seafood-001',
        type: 'meat_seafood',
        name: 'Ức gà luộc',
        carbsWeight: 0,
        proteinsWeight: 31,
        fatsWeight: 3.6,
        calories: 165,
    },
    {
        id: 'dairy-001',
        type: 'dairy',
        name: 'Sữa tươi không đường',
        carbsWeight: 5,
        proteinsWeight: 3.4,
        fatsWeight: 3.3,
        calories: 61,
    },
    {
        id: 'snacks-001',
        type: 'snacks',
        name: 'Bim bim khoai tây',
        carbsWeight: 15,
        proteinsWeight: 2,
        fatsWeight: 10,
        calories: 160,
    },
    {
        id: 'grains_carbs-001',
        type: 'grains_carbs',
        name: 'Cơm trắng',
        carbsWeight: 28,
        proteinsWeight: 2.7,
        fatsWeight: 0.3,
        calories: 130,
    },
    {
        id: 'desserts-001',
        type: 'desserts',
        name: 'Bánh flan',
        carbsWeight: 22,
        proteinsWeight: 3.2,
        fatsWeight: 3.5,
        calories: 150,
    },
    {
        id: 'beverages-001',
        type: 'beverages',
        name: 'Trà sữa',
        carbsWeight: 38,
        proteinsWeight: 1.5,
        fatsWeight: 3.5,
        calories: 220,
    },
    {
        id: 'vegetarian-001',
        type: 'vegetarian',
        name: 'Đậu phụ hấp',
        carbsWeight: 1.9,
        proteinsWeight: 8,
        fatsWeight: 4.8,
        calories: 98,
    }
]
