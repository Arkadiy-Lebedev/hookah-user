<script setup lang="ts">
import { ref, reactive } from 'vue';
import InputMask from 'primevue/inputmask';
import axios from 'axios';
import { apiMain } from "../api/api"
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore();

interface IUser {
  idUser: number,
  name: string,
  phoneUserNow: string,
  phone: string,
  nowPassword: string,
  password: string,
  repeaPassword: string,
}

const emit = defineEmits<{
  (e: 'closeModal', msg?: string): void

}>()

const user = reactive<IUser>({
  idUser: userStore.userInfo.id,
  name: userStore.userInfo.name,
  phoneUserNow: userStore.userInfo.phone,
  phone: userStore.userInfo.phone,
  nowPassword: "",
  password: "",
  repeaPassword: "",
})

const errors = ref({
  isError: false,
  text: ""
})

const submitForm = () => {
  errors.value.isError = false
  if (user.password != user.repeaPassword) {

    errors.value.isError = true
    errors.value.text = "Пароли не сопадают"
    return
  }
  
if (user.phone.length < 15) {
    errors.value.isError = true
    errors.value.text = "Не корректный номер телефона"
    return
  }

  axios
    .post(`${apiMain}api/client/auth/edit`, user,  {
      onUploadProgress: (e) => {
        console.log(e)
      },
    })
    .then((data) => {
      console.log(data.data)
      if (data.status ) {
       
        userStore.userInfo.name = user.name
         emit('closeModal', "succes")
      }  



    }).catch((error) => {
      console.log(error.response?.data);
      errors.value.isError = true
      errors.value.text = error.response?.data?.message

    })
    .finally(() => {
      // loading.value = false;


    });


}



</script>

<template>

  <div @click.self="emit('closeModal')" class="modalaccountBackground">         
    <div class="modalaccountActive">       
      
            <div class="modalaccountClose">
              <img @click="emit('closeModal')"  src="../assets/image/clouse.svg" alt="зыкрыть" />
            </div>
            <div class="modalaccountlogin">
               <form class="form" @submit.prevent="submitForm">
              <a class="modalaccountheader">Клиент</a>
              <div class="modallogin">
                <div class="modalname stylefilds">
                  <p> Ваше имя:</p>
                  <input v-model="user.name"  id="inputname" type="text">
                </div>
                <div class="modallog stylefilds">
                  <p> Телефон:</p>
                  <!-- <input id="inputtel" type="text"> -->
                  <InputMask id="basic" v-model="user.phone" mask="+7999-999-99-99" placeholder="Телефон" :pt="{
                    root: { class: '--input-active inputtel' }
                  }" />
                </div>
              </div>
              <div class="loginchange">
                <a class="modalaccountheader">Изменение пароля</a>
                <div class="fieldschange">
                  <div class="remodallogin stylefilds">
                    <p> Текущий пароль:</p>
                    <input v-model="user.nowPassword" type="text">
                  </div>
                  <div class="newmodallogin stylefilds">
                    <p> Новый пароль:</p>
                    <input v-model="user.password" type="text">
                  </div>
                  <div class="oknewmodallogin stylefilds">
                    <p> Подтверждение нового пароля:</p>
                    <input v-model="user.repeaPassword"  type="text">
                  </div>
                </div>
              </div>
              <p class="error-text" v-if="errors.isError">{{ errors.text }}</p>              
              <button class="save">Сохранить</button>
              </form>
            </div>
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

.modalaccountActive {
  position: relative;
  overflow: hidden;
}
.modalaccountlogin, .modalaccountClose {

  position:relative;
  z-index: 2;
}

.modalaccountActive:before {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 6%;
  background-image: url("../img/bg.jpg");  
  background-position: 50% 0;
 
}



.modalaccountBackground {
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
  bottom: 0;
  right: 0;
}
.modalaccountActive {
  width: 576px;
  background-color: #2d2d2d;
  cursor: default;
  padding-top: 1.5vh;
  padding-bottom: 3vh;
  border-radius: 5px;
}

.modalaccountClose {
  display: flex;
  padding-left: 2.9vh;
  padding-right: 2.9vh;
  justify-content: flex-end;
}

.modalpicture img {
  max-width: 100%;
}
.map {
   width:200px;
   height: 200px;
}
.modalaccountlogin {
  display: flex;
  flex-direction: column;
  padding-left: 2.9vh;
  padding-right: 2.9vh;
}
.modalaccountheader {
  color: #C69A5B;
  font-size: 22px;
  font-family: Roboto;
  margin-bottom: 4vh;
}
.modalaccountlogin {
  display: flex;
  flex-direction: column;
}
.modallogin {
  display: flex;
  gap: 3.5vh;
  margin-bottom: 3vh;

}
.modalname {
  flex:1;
}
.modallog {
  flex:1;
}
.stylefilds p{
  color: #FFF;
font-size: 16px;
font-family: Roboto;
font-weight: 300;
margin-bottom: 10px;
}
.stylefilds input {
  width:100%;
  height: 32px;
background: #777777;
color: #fff; 
font-size: 16px;

}
.loginchange{
padding: 2vh;
border-radius: 5px;
border: 1px solid #BFBFBF;
margin-bottom: 3vh;
}
.fieldschange{
margin-top: 4vh;
}
.newmodallogin, .remodallogin {
margin-bottom: 25px;
}
.save {
  width: 152px;
height: 31px;
border-radius: 5px;
background: #C69A5B;
color: #fff;
font-size: 14px;
font-family: Roboto;
}

@media (max-width: 576px) {
  .modalaccountActive {
    width: 100%;
    border-radius: 0;
  }
}

@media (max-width: 460px) {
  .modalaccountClose img {
    width: 9%;
  }
.modallogin{
  flex-direction: column;
}
#inputname {
  width: 200px;
}
.inputtel {
  width: 200px !important;
}
 .modalaccountheader {
  font-size: 18px;
 }
 .stylefilds p {
  font-size: 14px;
  margin-bottom: 5px;
 }
 .stylefilds input {
  height: 28px;
}
}
@media (max-width: 340px) {
  .newmodallogin, .remodallogin {
    margin-bottom: 13px;
}
.modalaccountheader {
  margin-bottom: 3vh;
}
.fieldschange {
  margin-top: 3vh;
}
.stylefilds input {
  height: 30px;
}
}


</style>
