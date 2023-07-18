<script setup lang="ts">
import { ref, reactive } from 'vue';
import InputMask from 'primevue/inputmask';
import axios from 'axios';
import { apiMain } from "../api/api"

const value = ref()

interface IUser {
  login: string,
  password: string,
  repeaPassword: string,
}

const emit = defineEmits<{
  (e: 'closeModal', msg?: string): void

}>()






</script>

<template>
  <div @click.self="emit('closeModal')" class="modalregBackground">

    <div class="modalregActive">
      <div @click="emit('closeModal')" class="modalregClose">
        <img src="../assets/image/clouse.svg" alt="зыкрыть" />
      </div>
      <div class="modalreglogin">
        <a class="modalregheader">Для вашего удобства установите приложение.</a>

      </div>
      <button @click="emit('closeModal', 'succes')" class="save">Установить</button>
    </div>

  </div>
</template>

<style scoped>
.error-text {
  color: #ff0000
}

.--input-active {
  border-radius: 0 !important;
}


.--input-active:focus {
  box-shadow: 0 0 0 0.1rem #938d8d !important;
  border-color: #5d5d5e !important;
}

.modalregActive {
  position: relative;
  overflow: hidden;
}

.modalregClose,
.modalreglogin,
.save {

  position: relative;
  z-index: 2;
}

.modalregActive:before {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 6%;
  background-image: url("../assets/image/bg.jpg");
  background-position: 50% 0;

}



.modalregBackground {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 3;
  background: rgba(255, 255, 255, 0.13);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.8px);
  -webkit-backdrop-filter: blur(5.8px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.modalregActive {
  width: 375px;
  background-color: #2d2d2d;
  cursor: default;
  padding-top: 1.5vh;
  padding-bottom: 3vh;
  border-radius: 5px;
}

.modalregClose {
  display: flex;
  padding-left: 2.9vh;
  padding-right: 2.9vh;
  justify-content: flex-end;
}


.modalreglogin {
  display: flex;
  flex-direction: column;
  padding-left: 2.9vh;
  padding-right: 2.9vh;
}

.modalregheader {
  color: #C69A5B;
  font-size: 22px;
  font-family: Roboto;
  margin-bottom: 4vh;
}

.modalregloginaaaaaa {
  display: flex;
  flex-direction: column;
  gap: 1.8vh;
  margin-bottom: 9vh;

}

.modalregname {
  flex: 1;
}

.modalreglog {
  flex: 1;
}

.stylereg p {
  color: #FFF;
  font-size: 14px;
  font-family: Roboto;
  font-weight: 300;
  margin-bottom: 8px;
}

.stylereg input {
  width: 100%;
  height: 32px;
  background: #777777;
  color: #fff;
  font-size: 14px;

}

#sertificat {
  color: #FFF;
  font-size: 12px;
  font-family: Roboto;
  margin-top: 10px;

}

.save {
  width: 100%;
  height: 31px;
  border-radius: 0px 0px 5px 5px;
  background: #C69A5B;
  color: #fff;
  font-size: 14px;
  font-family: Roboto;
  position: absolute;
  bottom: 0;

}

input {
  width: 293px;
  background: #414141;
  border: none;
  height: 47px;
  padding: 0.75rem 0.75rem;
  display: block;
  color: #fff;
  font-weight: 300;
  font-size: 18px;
  line-height: 24px;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  letter-spacing: 0.07em;
}

input::placeholder {
  color: #fff;
}

input::-webkit-input-placeholder {
  color: #fff;
}

input::-ms-input-placeholder {
  color: #fff;
}

input::-ms-input-placeholder {
  color: #fff;
}

input:focus {
  box-shadow: 0 0 0 0.1rem #938d8d !important;
  border-color: #5d5d5e !important;
  outline: 0 none;
  outline-offset: 0;
}
</style>
