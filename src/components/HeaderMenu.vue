<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from "vue-router";
import ModalSettings from "../components/ModalSettings.vue"
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const router = useRouter();
const logOut = () => {
  localStorage.removeItem('tokenUser')
  router.push({ name: 'auth' })
}

const isModalSetting = ref<boolean>()

const closeModal = (msg) => {
  if (msg == 'succes') {
    toast.add({ severity: 'success', summary: 'Успешно!', detail: 'Данные изменены', group: 'pt', life: 10000 });
  }
  isModalSetting.value = false
}

</script>

<template>
       <Toast group="pt" :pt="{
         container: { class: 'msg-succes' }
       }"/>
   <Teleport to="body">
        <TransitionGroup name="list">
          <ModalSettings v-if="isModalSetting" @closeModal="closeModal" />
        </TransitionGroup>
      </Teleport>
              <div class="menu">
                <img @click="logOut" src="../assets/image/question.svg" alt="exit" class="menu__exit">
                <p>Haradac</p>
                <img @click="isModalSetting = true" src="../assets/image/gear_f5mctti5777s 1.svg" alt="exit" class="menu__question">
              </div>
       
</template>

<style >
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}


.p-button.p-button-icon-only{
width: 1rem !important;
}
.calendar__wrapper{
  width: 116px !important;
}


.inscription__hall:focus {
  box-shadow: none !important;
}
</style>
