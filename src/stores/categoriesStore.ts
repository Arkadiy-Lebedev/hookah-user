import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { apiMain } from "../api/api"

interface ICategories {
  id: number
  type: string
  image: string
}


export const useCategoriesStore = defineStore('useCategories', () => {
  const categories = ref<ICategories>() 

  const getCategories = async () => {

  try {
    const { data } = await axios.get(`${apiMain}api/client/categories`)
    categories.value = data.data
  } catch (e) {
    console.log(e)
  }

  }


  return { categories, getCategories }
})
