<script setup lang="ts">
import { ref, computed } from 'vue';
import { ITables, ITablesInfo } from "../types/ITables"
import Calendar from 'primevue/calendar';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
import { apiMain } from "../api/api"
import { useDateStore } from '../stores/dateStore'
import { useUserStore } from '../stores/userStore'

const toast = useToast();

import { useTablesList } from '../stores/tablesStore'
const tablesList = useTablesList();



// import { socket } from "../socket";

const userStore = useUserStore();
const dateStore = useDateStore();

const isStatusActive = computed(() => {
  return props.tableSingle.tables.find(el => el.status == 'active')
})

interface Props {
  tableSingle: {
    tables: ITables[],
    status: string
  },
  tableInfoSingle: ITablesInfo[],
  dateCalendar: string,
  header: number

}

const time = ref<string>(new Date())

const busyArray = computed(() => {
  return props.tableSingle.tables.filter(el => el.status == 'busy')
})

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'closeModal', msg?: string): void

}>()

const bookingTable = async (tableId: number) => {
  console.log(time.value)
  let date = new Date(time.value)

  let date3 = new Date(dateStore.dateInBooking)
  date3.setHours(date.getHours(), date.getMinutes(), date.getSeconds())


  let dateBase = `${dateStore.dateInBooking} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  let date2 = new Date(props.tableSingle.tables.filter(el => el.status == 'busy')[0]?.timeStart)


  if (date3.getTime() > date2.getTime()) {
    // errors.value.timebusy.error = true
    // errors.value.timebusy.text = "Это время занято, выберите другое время!"
    console.log(" в это время занято, выберите другое время", date2)
    toast.add({ severity: 'warn', summary: 'Выберите другое время', detail: 'На это время стол занят', life: 3000 });
    return
  }
  console.log(date2)
  console.log(props.tableSingle.tables.filter(el => el.status == 'busy')[0]?.timeStart)
  const { data } = await axios.post(`${apiMain}api/client/booking`,
    {
      tableId: tableId,
      timeStart: dateBase,
      timeFinish: null,
      clientId: userStore.userInfo.id,
      orderClient: userStore.userInfo.order,
      status: "busy",

    })


  tablesList.socket.emit("create", { name: "" }, (data) => {
    console.log(data)
    emit('closeModal', "succes")
  });
 
  console.log(data)

}

const deleteBooking = async () => {

  const { data } = await axios.delete(`${apiMain}api/work/booking`,
    {
      data: { id: userStore.userInfo.bookingId }
    })

 emit('closeModal', "cancel")
  tablesList.socket.emit("create", { name: "" }, (data) => {
    console.log(data)
  });

  console.log(data)
}


</script>

<template>
  <div @click.self="emit('closeModal')" class="modalBackground">
    <div class="modalActive">
      <!-- {{busyArray}}
             {{ userStore.userInfo }}
              {{ header }}             -->
      <div class="modalClose">
        <p>Стол № {{ header }}</p>
        <img @click="emit('closeModal')" src="../assets/image/clouse.svg" alt="зыкрыть" />
      </div>
      <div class="modalpicture">
        <img :src="tableInfoSingle[0].image" alt="стол4" />
      </div>
      <div v-if="isStatusActive" class="modalwraper">
        <div class="modaltime">
          <p>Стол уже занять, бронь не доступна</p>
        </div>
      </div>
      <div v-else class="modalwraper">

        <div v-if="userStore.userInfo.table && userStore.userInfo.table != header" class="modaltime">
          <p>Вы уже забронировали стол № {{ userStore.userInfo.table }}</p>
        </div>
        <div v-else class="modaltime">
          <p v-if="busyArray.length">Занят c: <span v-for="(item, index) in  busyArray " :key="item.id"> {{
            item.timeStart.split(' ')[1] }}{{ index + 1 == busyArray.length ? "" : "," }}</span></p>
          <p v-else>Стол свободен</p>
        </div>
        <div v-if="!isStatusActive">
          <div class="modalpik">

            <Calendar :disabled="userStore.userInfo.table && userStore.userInfo.table != header"
              class="modalpik datapicker" id="calendar-timeonly" v-model="time" timeOnly touchUI :stepMinute="10" :pt="{
                input: { class: 'datapicker' },

              }" />
          </div>
          <div class="modaltext">
            <textarea :disabled="userStore.userInfo.table && userStore.userInfo.table != header"
              placeholder="Пожелания к заказу..." name="enter" id="modalenter"
              v-model="userStore.userInfo.order"></textarea>
          </div>
          <div class="modalconfirm">
            <div v-if="!userStore.userInfo.table || userStore.userInfo.table !== header"
              @click="bookingTable(tableInfoSingle[0].id)" class="modalbuttonbron"><button
                :disabled="userStore.userInfo.table && userStore.userInfo.table != header"
                class="modalbutton">Забронировать</button></div>
            <div v-if="userStore.userInfo.table == header" class="modalbuttonchange">
              <button @click="deleteBooking()" class="modalbuttonno stylebut">Снять бронь</button>
            </div>
          </div>
        </div>
        <Toast />
      </div>
      <div class="modalWindow"></div>
    </div>
  </div>
</template>

<style >
/* .p-inputtext {
  border-radius: 10px !important;
  background: #898989 !important;
  color: #fff !important;
  font-size: 18px !important;
  font-family: Roboto !important;
  padding-top: 1vh !important;
  padding-bottom: 1vh !important;
  text-align: center !important;
  margin-top: 1.8vh !important;
  border: none !important;
  width: 100% !important;
} */

.datapicker {
  border-radius: 10px !important;
  background: #898989 !important;
  color: #fff !important;
  font-size: 18px !important;
  font-family: Roboto !important;
  /* padding-top: 1vh !important;
  padding-bottom: 1vh !important; */
  text-align: center !important;
  /* margin-top: 1.8vh !important; */
  border: none !important;
  width: 100% !important;
}

#calendar-timeonly {
  width: 100% !important;
  margin-top: 1.8vh !important;
}

/*--------------------*/
.modalBackground {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  z-index: 3;
  background: rgba(255, 255, 255, 0.13);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.8px);
  -webkit-backdrop-filter: blur(5.8px);
}

.modalActive {
  width: 576px;
  background-color: #2d2d2d;
  cursor: default;
  padding-top: 1.5vh;
  padding-bottom: 3vh;
  border-radius: 5px;
}

.modalWindow {
  position: relative;
}

.modalClose {
  display: flex;
  justify-content: space-between;
  padding-left: 2.9vh;
  padding-right: 2.9vh;
  margin-bottom: 1.8vh;
  align-items: end;
  align-items: center
}

.modalClose p {
  color: #c69a5b;
  font-size: 24px;
  font-family: Roboto;
}

.modalpicture img {
  max-width: 100%;
}

.modalwraper {
  display: flex;
  flex-direction: column;
  padding-left: 2.9vh;
  padding-right: 2.9vh;
}

.modaltime {
  position: relative;
  padding-top: 1.8vh;
  padding-bottom: 1.8vh;
}

.modaltime p {
  color: #898989;
  font-size: 18px;
  font-family: Roboto;
}

.modaltime::after {
  content: "";
  width: 100%;
  height: 2px;
  background: #414141;
  bottom: 0;
  position: absolute;
}

.modalpik p {
  border-radius: 10px;
  background: #898989;
  color: #fff;
  font-size: 18px;
  font-family: Roboto;
  padding-top: 1vh;
  padding-bottom: 1vh;
  text-align: center;
  margin-top: 1.8vh;
}

.modaltext textarea {
  margin-top: 1.3vh;
  width: 100%;
  height: 8.2vh;
  background: #898989;
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
  color: #fff;
  font-size: 18px;
  font-family: Roboto;
}

.modaltext textarea::placeholder {
  color: #9f9f9f;
  font-size: 16px;
  font-family: Roboto;
}

.modalbutton {
  width: 100%;
  height: 41px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #c69a5b;
  color: #fff;
  font-size: 18px;
  font-family: Roboto;
  margin-top: 1.6vh;
}

.modalbuttonbron {
  /* display: none; */
}

.modalbuttonchange {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  /* display: none; */
}

.modalbuttonno {
  background: #fb6536;
  color: #fff;
  font-size: 18px;
  font-family: Roboto;
  flex: 1;
}

.modalbuttonyes {
  background: #46ad35;
  color: #fff;
  font-size: 18px;
  font-family: Roboto;
  flex: 1;
}

.stylebut {
  height: 41px;
  flex-shrink: 0;
  border-radius: 10px;
  margin-top: 1.6vh;
  color: #fff;
  font-size: 18px;
  font-family: Roboto;
}

.modalbutton:disabled {
  background: #BEAC91;
}


@media (max-width: 576px) {
  .modalActive {
    width: 100%;
    border-radius: 0;
  }
}

@media (max-width: 460px) {
  .modalClose img {
    width: 9%;
  }

  .modalClose p {
    font-size: 18px;
  }

  .modalbutton {
    font-size: 16px;
  }

  .modalpik p {
    font-size: 16px;
  }

  .modaltime p {
    font-size: 16px;
  }

  .stylebut {
    font-size: 16px;
  }
}

@media (max-width: 420px) {
  .inscription__hall {
    font-size: 16px;
  }
}

@media (max-width: 376px) {
  .main-sales__name {
    font-size: 17px;
  }

  .main-sales__explanation {
    font-size: 14px;
  }
}

@media (max-width: 340px) {
  .main-sales__name {
    font-size: 15px;
  }

  .main-sales__explanation {
    font-size: 12px;
  }

  .stylebut {
    font-size: 14px;
  }

  .modalbutton {
    font-size: 14px;
  }

  .inscription__hall {
    font-size: 14px;
  }
}</style>
