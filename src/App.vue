<script setup lang="ts">
import { ref } from 'vue';

import { RouterView } from 'vue-router'
import { useRouter } from "vue-router"
import axios from 'axios';
import { apiMain } from "./api/api"
import { useUserStore } from './stores/userStore'
import { useTablesList } from './stores/tablesStore'
import { useDateStore } from './stores/dateStore'
const userStore = useUserStore();
const router = useRouter()


const tablesList = useTablesList();
const dateStore = useDateStore();
const localToken = localStorage.getItem('tokenUser')

window.addEventListener("load", () => document.querySelector(".preloader")?.remove());


const loading = ref(true)

console.log(localToken)
if (localToken) {
  const auth = async () => {
    axios
      .post(`${apiMain}api/client/auth/token`, { token: localToken }, {
        onUploadProgress: (e) => {
          console.log(e)
        },
      })
      .then((data) => {
       
        userStore.userInfo.id = data.data.user[0].id
        userStore.userInfo.name = data.data.user[0].name
        userStore.userInfo.phone = data.data.user[0].phone
       
         router.push({ name: 'holl' })
     

      }).catch((error) => {
        router.push({ name: 'auth' })
        console.log(error)
      })
      .finally(() => {
        // loading.value = false;

      });
  }

  auth()
} else {
  router.push({ name: 'auth' })
}

dateStore.entryDate(new Date())
tablesList.getTablesInDate(dateStore.dateInBooking)




// пуш firebase

var firebaseConfig = {
  apiKey: "AIzaSyB2bBdJWz8VQmIm74Sc3fXhceBd0ankfOA",
  authDomain: "elastic-skin.firebaseapp.com",
  projectId: "elastic-skin",
  storageBucket: "elastic-skin.appspot.com",
  messagingSenderId: "546865108327",
  appId: "1:546865108327:web:9809a64f9940bb04c78bc2",
  measurementId: "G-HB5H4R2Z0W"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


function IntitalizeFireBaseMessaging() {
  messaging
    .requestPermission()
    .then(function () {
      console.log("Notification Permission");
      return messaging.getToken();
    })
    .then(function (token) {
      console.log("Token : " + token);


      // let formData = new FormData();
      // formData.append('token', token);
      // formData.append('rr', "token");
      // fetch("http://localhost:8000/api/firebase", {
      //   method: 'POST',
      //   body: formData
      // })

       axios
        .post(`${apiMain}api/firebase`, { token: token }, {
          onUploadProgress: (e) => {
            console.log(e)
          },
        })
        .then((data) => {



        }).catch((error) => {
        
          console.log(error)
        })
        .finally(() => {
          // loading.value = false;

        });



    })
    .catch(function (reason) {
      console.log(reason);
    });
}



messaging.onMessage(function (payload) {
  console.log(payload);
  const notificationOption = {
    body: payload.notification.body,
    badge: '/logo-app.png',
    icon: payload.notification.icon
  };

  if (Notification.permission === "granted") {
    var notification = new Notification(payload.notification.title, notificationOption);

    notification.onclick = function (ev) {
      ev.preventDefault();
      window.open(payload.notification.click_action, '_blank');
      notification.close();
    }
  }
});
messaging.onTokenRefresh(function () {
  messaging.getToken()
    .then(function (newtoken) {
      console.log("New Token : " + newtoken);
      // отправляем токен в php
      // let formData = new FormData();
      // formData.append('token', newtoken);
      // fetch("test2.php", {
      // 	method: 'POST',
      // 	body: formData
      // })
    })
    .catch(function (reason) {
      console.log(reason);
    })
})


console.log('разрешение ' + Notification.permission);
console.log(('Notification' in window));

// проверка на поддержку пуш и согласился или нет


IntitalizeFireBaseMessaging();

</script>

<template>
  

  <RouterView />
</template>

<style scoped>

</style>
