import { io } from "socket.io-client";
import { useDateStore } from "./dateStore"

import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { useUserStore } from './userStore'

import { apiMain } from "../api/api"
import { ITables } from "../types/ITables"




export const useTablesList = defineStore('tablesList', () => {
  const userStore = useUserStore();

  const dateStore = useDateStore();
  const tables = ref<ITables[]>([])
  const ordersInBooking = ref([])
  const isLoadTablList = ref(false)

  const getAllTables = async () => {
    try {
      console.log(5656)
      const { data } = await axios.get(`${apiMain}api/work/booking`)
      tables.value = data.data
      console.log(tables.value)
      console.log(56)
    } catch (e) {
      console.log(e)
    }
  }

  const getTablesInDate = async (dates: string) => {
    console.log(dates)
    
    console.log(userStore.userInfo)
    try {
      isLoadTablList.value = true
      console.log(dates)
      const { data } = await axios.post(`${apiMain}api/client/booking/table_list`, { date: dates })
      tables.value = data.data
      userStore.userInfo.table = undefined
      userStore.userInfo.order = ''
      userStore.userInfo.bookingId = undefined
      
      isLoadTablList.value = false
    } catch (e) {
      console.log(e)
      isLoadTablList.value = false
    }

  }

  const getOrderInBooking = async (id: number | undefined) => {
    console.log(56756756)
    console.log(id)
    if (id) {
      try {
        console.log(id)
        const { data } = await axios.post(`${apiMain}api/orders/booking`, { id: id })
        ordersInBooking.value = data.data
        console.log(data.data)
      } catch (e) {
        console.log(e)
      }
    } else {
      ordersInBooking.value = []
    }

  }

  const addOrderForBooking = async (idBooking: number, idProduct: number, count: number) => {
    try {
      const { data } = await axios.post(`${apiMain}api/orders/add`, {
        idBooking: idBooking,
        idProduct: idProduct,
        count: count
      })
      getOrderInBooking(idBooking)
      console.log(data.data)
    } catch (e) {
      console.log(e)
    }
  }



  const activeTables = computed((): ITables[] => {
    const newArray = tables.value.filter((el) => el.status == "active")
    return newArray
  })
  const busyTables = computed(() => {
    const newArray = tables.value.filter((el) => el.status == "busy")
    const dataGodeGroup = newArray.reduce((acc, c) => (c.timeStart.split(' ')[0] in acc ? acc[c.timeStart.split(' ')[0]].push(c) : acc[c.timeStart.split(' ')[0]] = [c], acc), {});
    console.log(dataGodeGroup)
    return dataGodeGroup
  })

  const activeBooking = async (id: number) => {
    const item = tables.value.find(el => el.id == id)
    item.status = "active"
    try {
      const { data } = await axios.post(`${apiMain}api/admin/action_table`, {
        id: id
      })

      if (data) {
        const item = tables.value.find(el => el.id == id)
        item.status = "active"
      }
    } catch (e) {
      console.log(e)
    }

  }


  watch(tables, () => {

    const busyTableForClient = tables.value.find(el => el.client_id == userStore.userInfo.id && el.status == "busy")
    console.log(busyTableForClient)
    if (busyTableForClient) {
      userStore.userInfo.table = busyTableForClient.number
      userStore.userInfo.order = busyTableForClient.order_client
      userStore.userInfo.bookingId = busyTableForClient.id
    }
  })


  const table1Info = computed(() => (n): { tables: ITables[], status: string } => {
    let status = "free"

    const newArray = tables.value.filter((el) => el.number == n)
    const active = newArray.find(el => el.status == "active")    

    if (active) {
      status = "active"
    } else {
      if (newArray.find(el => el.status == "busy")) {
        status = "busy"
      }
    }   

    return {
      "tables": newArray,
      "status": status
    }

  })
  



  // const URL = "http://localhost:8000";
  const URL = "https://myhookah.ru";
  const socket = io(URL);
  socket.on("update", () => {
    getTablesInDate(dateStore.dateInBooking)

  });

  socket.on("connect", (socket) => {
    console.log("connect", socket)
  
  });

  socket.on("disconnect", () => {
  
  });

  socket.on("foo", (...args) => {
   
  });

  socket.on("bar", (...args) => {
   
  });


  return { socket, tables, getAllTables, activeTables, busyTables, activeBooking, getTablesInDate, table1Info, getOrderInBooking, ordersInBooking, addOrderForBooking, isLoadTablList }
})
