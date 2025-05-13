import { ref as dbRef, set, push, get, remove } from "firebase/database"
import { ref as storageRef, deleteObject } from "firebase/storage"
import { database, storage } from '@/firebase'

import { FoodProps } from "@/lib"
import { showToast } from "@/notification"

export async function addFood(food: FoodProps) {

}

export async function updateFood(foodData: FoodProps) {

}

export async function deleteFood(foodId: string) {
  
}

export async function getFoodById(foodId: string) {
 
}

export async function getFoods() {
 
}
export async function getFoodsByName(name: string) {
  
}
export async function getFoodsByCategory(slug: string) {
 
}
