<script setup lang="ts">
import HeaderMenu from "./HeaderMenu.vue"
import { ref, watch } from 'vue';
import Calendar from 'primevue/calendar';
import { useTablesList } from '../stores/tablesStore'
import { useDateStore } from '../stores/dateStore'


const tablesList = useTablesList();
const dateStore = useDateStore();

const date = ref(new Date())


watch(date, () => {

  dateStore.entryDate(date.value)
  tablesList.getTablesInDate(dateStore.dateInBooking)
})

</script>

<template>
  <div class="header">
         <!-- <HeaderMenu/> -->
              <div class="inscription">
                <img src="../assets/image/rowright.svg" alt="exit" class="inscription__rowleft">   
                <div class="inscription__wrapper">
                  <!-- <img src="../assets/image/calendar.svg" alt="календарь"> -->
                 <!-- <h3 class="inscription__hall">23.06.2023</h3>         -->
                 <div class="calendar__wrapper">
                   <Calendar  v-model="date" dateFormat="dd.mm.yy" showIcon touchUI :minDate="new Date()" :pt="{
                    input: { class: 'inscription__hall' },
                    dropdownButton: {
                      root: { class: 'inscription__hall' }
                    }
                  } "/> 
                 </div>
                 
                </div>
                <img src="../assets/image/rowright.svg" alt="exit" class="inscription__rowright">
              </div>
            </div>
</template>

<style >

.p-button.p-button-icon-only{
width: 1rem !important;
}
.calendar__wrapper{
  width: 116px !important;
}

.inscription__hall {
  font-size: 18px !important;
  text-align: center !important;
  color: aliceblue !important;
  font-family: Roboto;
  font-weight: 400 ;  
padding: 0 !important;
  background-color: rgb(0, 0, 0) !important;
  border: none !important;
}

.inscription__hall:focus {
  box-shadow: none !important;
}
</style>
