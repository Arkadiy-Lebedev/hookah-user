import { ref } from 'vue'
import { defineStore } from 'pinia'

interface IUser {
  name: string,
  phone: string,
  id: number,
  table: number,
  order: string,
  bookingId: number

}


export const useUserStore = defineStore('userStore', () => {
  const userInfo = ref<IUser>({}) 
 
 


  return { userInfo }
})
