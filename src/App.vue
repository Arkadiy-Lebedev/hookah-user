<script setup lang="ts">
import { ref } from 'vue'

import axios from 'axios'
import { RouterView, useRouter } from 'vue-router'
import { apiMain } from './api/api'
import { useDateStore } from './stores/dateStore'
import { useTablesList } from './stores/tablesStore'
import { useUserStore } from './stores/userStore'
import GlobalImageLoader from "./components/GlobalImageLoader.vue";
const userStore = useUserStore()
const router = useRouter()

const tablesList = useTablesList()
const dateStore = useDateStore()
const localToken = localStorage.getItem('tokenUser')

window.addEventListener('load', () => document.querySelector('.preloader')?.remove())

const loading = ref(true)

console.log(localToken)
if (localToken) {
  const auth = async () => {
    axios
      .post(
        `${apiMain}api/client/auth/token`,
        { token: localToken },
        {
          onUploadProgress: (e) => {
            console.log(e)
          }
        }
      )
      .then((data) => {
        userStore.userInfo.id = data.data.user[0].id
        userStore.userInfo.name = data.data.user[0].name
        userStore.userInfo.phone = data.data.user[0].phone

        router.push({ name: 'holl' })
      })
      .catch((error) => {
        router.push({ name: 'auth' })
        console.log(error)
      })
      .finally(() => {
        // loading.value = false;
      })
  }

  auth()
} else {
  router.push({ name: 'auth' })
}

dateStore.entryDate(new Date())
tablesList.getTablesInDate(dateStore.dateInBooking)

// // пуш firebase

// var firebaseConfig = {
//   apiKey: "AIzaSyB2bBdJWz8VQmIm74Sc3fXhceBd0ankfOA",
//   authDomain: "elastic-skin.firebaseapp.com",
//   projectId: "elastic-skin",
//   storageBucket: "elastic-skin.appspot.com",
//   messagingSenderId: "546865108327",
//   appId: "1:546865108327:web:9809a64f9940bb04c78bc2",
//   measurementId: "G-HB5H4R2Z0W"
// };

// firebase.initializeApp(firebaseConfig);
// // @ts-ignore
// const messaging = firebase.messaging();

// function IntitalizeFireBaseMessaging() {
//   messaging
//     .requestPermission()
//     .then(function () {
//       console.log("Notification Permission");
//       return messaging.getToken();
//     })
//     .then(function (token: string) {
//       console.log("Token : " + token);

//       // let formData = new FormData();
//       // formData.append('token', token);
//       // formData.append('rr', "token");
//       // fetch("http://localhost:8000/api/firebase", {
//       //   method: 'POST',
//       //   body: formData
//       // })

//       axios
//         .post(`${apiMain}api/firebase`, { token: token }, {
//           onUploadProgress: (e) => {
//             console.log(e)
//           },
//         })
//         .then((data) => {

//         }).catch((error) => {

//           console.log(error)
//         })
//         .finally(() => {
//           // loading.value = false;

//         });

//     })
//     .catch(function (reason:any) {
//       console.log(reason);
//     });
// }

// // messaging.onMessage(function (payload:any) {
// //   console.log(payload);
// //   const notificationOption = {
// //     body: payload.notification.body,
// //     badge: '/logo-app.png',
// //     icon: payload.notification.icon
// //   };

// //   if (Notification.permission === "granted") {
// //     var notification = new Notification(payload.notification.title, notificationOption);

// //     notification.onclick = function (ev) {
// //       ev.preventDefault();
// //       window.open(payload.notification.click_action, '_blank');
// //       notification.close();
// //     }
// //   }
// // });

// messaging.onMessage(function (payload: any) {
//   // play();
//   navigator.serviceWorker.register("/firebase-messaging-sw.js");
//   Notification.requestPermission(function (result) {
//     if (result === "granted") {
//       navigator.serviceWorker.ready
//         .then(function (registration) {
//           const data = { ...payload.notification, ...payload.data };
//           const notificationTitle = data.title;
//           const notificationOptions = {
//             body: data.body,
//             icon: data.icon,
//             image: data.image,
//             click_action: data.click_action,
//             requireInteraction: true,
//             data
//           };
//           return registration.showNotification(
//             notificationTitle,
//             notificationOptions
//           );
//         })
//         .catch(function (error) {
//           console.log("ServiceWorker registration failed", error);
//         });
//     }
//   });
// });

// messaging.onTokenRefresh(function () {
//   messaging.getToken()
//     .then(function (newtoken:string) {
//       console.log("New Token : " + newtoken);
//       // отправляем токен в php
//       // let formData = new FormData();
//       // formData.append('token', newtoken);
//       // fetch("test2.php", {
//       // 	method: 'POST',
//       // 	body: formData
//       // })
//     })
//     .catch(function (reason:any) {
//       console.log(reason);
//     })
// })

// console.log('разрешение ' + Notification.permission);
// console.log(('Notification' in window));

// // проверка на поддержку пуш и согласился или нет

// IntitalizeFireBaseMessaging();
</script>

<template>
  <router-view />
  <GlobalImageLoader></GlobalImageLoader>
</template>

<style scoped></style>
