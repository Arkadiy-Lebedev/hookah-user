import { ref } from 'vue'
import { defineStore } from 'pinia'

interface IUser {
  name: string,
  phone: string,
  id: number | undefined,
  table: number | undefined,
  order: string | undefined,
  bookingId: number | undefined

}


export const useUserStore = defineStore('userStore', () => {
  const userInfo = ref<IUser>({
    name: "",
    phone: "",
    id: undefined,
    table: 0,
    order: "",
    bookingId: undefined
}) 
//  здесь вставить {}  в скобках
 


  return { userInfo }
})
