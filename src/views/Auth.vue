<script setup lang="ts">
import { ref, reactive } from 'vue'
import InputMask from 'primevue/inputmask';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useRouter } from "vue-router";
import axios from 'axios';
import { apiMain } from "../api/api"
import ModalRegistration from "../components/ModalRegistration.vue"
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore();

const router = useRouter();

const toast = useToast();


const isModalRegistration = ref<boolean>()

interface IUser {
  login: string,
  password: string,
}

const user = reactive<IUser>({
  login: "",
  password: "",
})

 const errors = ref({
  isError: false,
  text: ""
})


const closeModal = (msg) => {
  if (msg == 'succes') {
    toast.add({ severity: 'success', summary: 'Успешная регистрация', detail: 'Войдите под своими данными',  group: 'pt', life: 10000 });
  }
  isModalRegistration.value = false
}

const submitForm = () => {
  
  errors.value.isError = false

  axios
    .post(`${apiMain}api/client/auth`, user, {
      onUploadProgress: (e) => {
        console.log(e)
      },
    })
    .then((data) => {
      console.log(data.data)
      if (data.data.user) {
        localStorage.setItem('tokenUser', data.data.token)
        userStore.userInfo.id = data.data.user.id
        userStore.userInfo.name = data.data.user.name
        userStore.userInfo.phone = data.data.user.phone

        router.push({ name: 'holl' })
      
      }

    }).catch((error) => {
      console.log(error);
      errors.value.isError = true
      errors.value.text = error.response?.data?.message
    })
    .finally(() => {
      // loading.value = false;


    });


}


</script>

<template>
  <section>
      <Toast group="pt" :pt="{
        container: { class: 'msg-succes' }
      }"/>
    <Teleport to="body">
      <TransitionGroup name="list">
        <ModalRegistration v-if="isModalRegistration" @closeModal="closeModal" />
      </TransitionGroup>
    </Teleport>

    <div class="centerblock">
      <div class="logo">
        <img class="logo__img" src="../assets/image/logo2.png" alt="логотип" />
      </div>
      <div class="text_enter">
        <p class="text_vh text_vh_log">Вход в личный кабинет</p>
      </div>
      <div class="center">
        <form class="form" @submit.prevent="submitForm">
          <div class="inputbox">
            <div class="inputlogin">
              <img src="../assets/image/manferst.svg" alt="иконка лиготипа">
              <!-- <input id="phone" type="tel" name="login" placeholder="+7-999-999-99-99"> -->
              <InputMask id="basic" v-model="user.login" mask="+7999-999-99-99" placeholder="Телефон" :pt="{
                root: { class: '--input-active' }
              }" />
            </div>
            <div class="inputpasword">
              <img src="../assets/image/pasword.svg" alt="иконка пароля">
              <input v-model="user.password" type="password" placeholder="Пароль">

            </div>
            <div class="enterblock">
              <button type="submit" class="bottom">Войти</button>
              <p class="error-text" v-if="errors.isError">{{ errors.text }}</p>
              <a @click="isModalRegistration = true" class="link_back link_rec">Зарегистрироваться</a>
   
            </div>
          </div>
        </form>

      </div>
    </div>
    <p class="reserv2">ООО "Моя Кальянная"</p>
  </section>
</template>

<style scoped>
.error-text {
  color: #ff0000
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.--input-active {
  border-radius: 0 !important;
}

.inputpasword input:focus {
  box-shadow: 0 0 0 0.1rem #938d8d !important;
  border-color: #5d5d5e !important;
  outline: 0 none;
  outline-offset: 0;
}

.inputpasword input {
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.--input-active:focus {
  box-shadow: 0 0 0 0.1rem #938d8d !important;
  border-color: #5d5d5e !important;
}

section {
  height: 100vh;
  background: #01010c;
  position: relative;
  overflow: hidden;
}

section:before {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 10%;
  background-image: url("../assets/image/bg.jpg");
  background-position: 50% 0;

}

input {
  width: 293px;
  background: #414141;
  border: none;
  height: 47px;
  margin-bottom: 16px;
  display: block;
  color: #fff;
  font-weight: 300;
  font-size: 18px;
  line-height: 24px;
  padding-left: 46px;
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

button {
  width: 293px;
  height: 47px;
  background: #4777A8;
  border: none;
  color: #fff;
  font-size: 18px;
  line-height: 24px;

}

.centerblock {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 10vh;
  left: calc(50vw - 147px);
  z-index: 2;
}

.logo {
  margin-bottom: 7vh;
}

.text_enter {
  margin-bottom: 20px;
}

.text_vh {
  font-family: 'Roboto';
  font-weight: 300;
  font-size: 18px;
  color: rgb(255, 255, 255);
}

.link_back {
  text-decoration: underline;
  color: #FFF;
  font-size: 14px;
  letter-spacing: 0.25px;

}

.reserv2 {
  bottom: 19px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-family: 'Roboto';
  font-size: 14px;
  color: rgb(255, 255, 255);
}

.inputlogin,
.inputpasword {
  position: relative;
}

.inputlogin img {
  position: absolute;
  left: 14px;
  top: 11px;
}

.inputpasword img {
  position: absolute;
  left: 14px;
  top: 11px;
}

.enterblock {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.bottom {
  margin-bottom: 20px;
  font-size: 18px;
}




@media (max-width: 460px) {

  .logo__img {
    width: 234px;
    height: 227px;
  }

  .text_enter {
    margin-bottom: 10px;
  }

  .text_vh {
    font-size: 16px;
  }

}

@media (max-width: 375px) {
  .logo__img {
    width: 214px;
    height: 207px;
  }

  input {
    height: 40px;
    font-size: 14px;
  }

  .logo {
    margin-bottom: 3.6vh;
  }

  .inputpasword img {
    top: 9px;
  }

  .inputlogin img {
    top: 8px;
  }
}

@media (max-width: 345px) {
  .reserv2 {
    bottom: 8px;
  }

  .logo__img {
    width: 154px;
    height: 147px;
  }

  .logo {
    margin-bottom: 0vh;
  }
}
</style>
