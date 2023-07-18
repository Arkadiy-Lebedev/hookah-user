<script setup lang="ts">
import { ref, reactive } from 'vue'
import ModalPwa from "../components/ModalPwa.vue"

const isModalRegistration = ref<boolean>()

const closeModal = (msg) => {
  if (msg == 'succes') {
    // toast.add({ severity: 'success', summary: 'Успешная регистрация', detail: 'Войдите под своими данными', group: 'pt', life: 10000 });
    install()
  }
  isModalRegistration.value = false
}


let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA

  // Optionally, send analytics event that PWA install promo was shown.
  console.log(`'beforeinstallprompt' event was fired.`);

});

const install = async () => {

  deferredPrompt.prompt();

  const { outcome } = await deferredPrompt.userChoice;

  console.log(`User response to the install prompt: ${outcome}`);

  deferredPrompt = null;
}

window.addEventListener('appinstalled', () => {
  // Hide the app-provided install promotion

  // Clear the deferredPrompt so it can be garbage collected
  deferredPrompt = null;
  // Optionally, send analytics event to indicate successful install
  console.log('PWA was installed');
  localStorage.setItem('PWA', "true")
});



if (!localStorage.getItem('PWA')) {
  setTimeout(() => isModalRegistration.value = true, 1000)
}

</script>
<template>
  <Teleport to="body">
    <TransitionGroup name="list">
      <ModalPwa v-if="isModalRegistration" @closeModal="closeModal" />
    </TransitionGroup>
  </Teleport>
  <div class="footer">
    <div class="footer__hall size">
      <router-link :to="{ name: 'holl' }" exact class="menu__link">
        <svg viewBox="0 0 53 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_133_266)">
            <path
              d="M47.1369 -0.440918H5.86305L0 35.4409H41.848L45.3224 14.1776L48.119 31.2928H47.7595H46.8064L46.0267 35.4409H47.7594H48.1742H52.9999L47.1369 -0.440918ZM38.3227 31.2928H4.88097L9.38839 3.70727H42.8301L38.3227 31.2928ZM33.8965 20.3H12.8994L13.5772 16.1519H34.5743L33.8965 20.3Z"
              fill="#C69A5B" />
          </g>
          <defs>
            <clipPath id="clip0_133_266">
              <rect width="53" height="35" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </router-link>
    </div>

    <div class="footer__news size">
      <router-link :to="{ name: 'categories' }" class="menu__link">

        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M29.0625 18.4375H10.3125V20.9375H29.0625V18.4375Z" fill="#C69A5B" />
          <path d="M29.0625 12.8125H10.3125V15.3125H29.0625V12.8125Z" fill="#C69A5B" />
          <path d="M29.0625 24.0625H10.3125V26.5625H29.0625V24.0625Z" fill="#C69A5B" />
          <path d="M0 39.375H39.375V0H0V39.375ZM2.5 2.5H36.875V36.875H2.5V2.5Z" fill="#C69A5B" />
        </svg>

      </router-link>

    </div>

    <div class="footer__sales size">
      <router-link :to="{ name: 'sale' }" class="menu__link">
        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M23.8801 13.48L11.8001 23.08C11.5601 23.28 11.4801 23.68 11.7201 23.92C11.8401 24.08 12.0001 24.16 12.2001 24.16C12.3201 24.16 12.4801 24.12 12.5601 24.04L24.6401 14.44C24.8801 14.24 24.9601 13.84 24.7201 13.6C24.5201 13.32 24.1601 13.28 23.8801 13.48Z"
            fill="#C69A5B" />
          <path
            d="M15.0401 17.76C15.2001 17.76 15.3601 17.76 15.5201 17.72C17.1601 17.48 18.3201 15.92 18.0401 14.24C17.9201 13.44 17.4801 12.72 16.8401 12.24C16.2001 11.76 15.4001 11.56 14.6001 11.68C13.8001 11.8 13.0801 12.24 12.6001 12.88C12.1201 13.52 11.9201 14.32 12.0401 15.12C12.2801 16.68 13.6001 17.76 15.0401 17.76ZM14.7601 12.92C14.8401 12.92 14.9601 12.88 15.0401 12.88C15.9201 12.88 16.7201 13.52 16.8401 14.44C17.0001 15.44 16.3201 16.36 15.3201 16.52C14.3201 16.68 13.4001 16 13.2401 15C13.0801 14 13.8001 13.08 14.7601 12.92Z"
            fill="#C69A5B" />
          <path
            d="M21.4399 19.76C19.7599 19.76 18.3999 21.12 18.3999 22.8C18.3999 24.48 19.7599 25.84 21.4399 25.84C23.1199 25.84 24.4799 24.48 24.4799 22.8C24.4399 21.12 23.0799 19.76 21.4399 19.76ZM21.4399 24.6C20.4399 24.6 19.5999 23.76 19.5999 22.76C19.5999 21.76 20.4399 20.92 21.4399 20.92C22.4399 20.92 23.2799 21.76 23.2799 22.76C23.2399 23.8 22.4399 24.6 21.4399 24.6Z"
            fill="#C69A5B" />
          <path
            d="M36.4 18.36C36.4 18.32 36.44 18.24 36.44 18.2C36.44 16.48 34.64 15.6 33.08 14.84C31.96 14.28 30.76 13.68 30.44 12.96C30.12 12.2 30.56 10.96 31 9.8C31.6 8.16 32.2 6.48 31.08 5.36C29.96 4.24 28.36 4.64 26.76 5C25.64 5.24 24.48 5.52 23.72 5.2C22.96 4.88 22.32 3.88 21.72 2.92C20.84 1.56 19.88 0 18.2 0C16.52 0 15.56 1.56 14.72 2.96C14.12 3.96 13.52 4.96 12.76 5.28C12 5.6 10.8 5.32 9.68 5.04C8.08 4.64 6.44 4.24 5.36 5.32C4.24 6.44 4.8 8.12 5.32 9.76C5.72 10.96 6.08 12.16 5.76 12.96C5.44 13.72 4.32 14.28 3.24 14.84C1.72 15.64 0 16.52 0 18.2C0 18.24 -3.8743e-08 18.32 0.04 18.36C0.04 18.4 0 18.48 0 18.52C0 20.2 1.72 21.12 3.24 21.88C4.32 22.44 5.44 23 5.76 23.76C6.08 24.52 5.68 25.76 5.32 26.96C4.8 28.6 4.24 30.28 5.36 31.4C6.48 32.52 8.12 32.08 9.68 31.68C10.8 31.4 12 31.12 12.76 31.44C13.52 31.76 14.12 32.76 14.72 33.76C15.56 35.16 16.52 36.72 18.2 36.72C19.88 36.72 20.88 35.16 21.72 33.8C22.32 32.84 22.96 31.84 23.72 31.52C24.52 31.2 25.64 31.44 26.76 31.72C28.32 32.08 29.96 32.48 31.08 31.36C32.2 30.24 31.6 28.56 31 26.92C30.56 25.72 30.12 24.52 30.44 23.76C30.76 23 31.92 22.44 33.08 21.88C34.64 21.08 36.44 20.2 36.44 18.52C36.44 18.44 36.4 18.4 36.4 18.36ZM32.52 20.8C31.2 21.48 29.8 22.16 29.32 23.32C28.8 24.52 29.36 25.96 29.84 27.36C30.32 28.68 30.8 29.96 30.2 30.52C29.56 31.16 28.32 30.88 27 30.56C25.68 30.24 24.36 29.96 23.2 30.44C22.08 30.92 21.36 32.04 20.68 33.16C19.92 34.36 19.2 35.52 18.16 35.52C17.16 35.52 16.44 34.36 15.68 33.12C15 31.96 14.28 30.8 13.16 30.32C12 29.84 10.64 30.16 9.32 30.52C8 30.84 6.76 31.16 6.12 30.56C5.52 29.96 5.92 28.68 6.36 27.36C6.8 25.96 7.28 24.52 6.76 23.36C6.28 22.2 4.96 21.52 3.68 20.88C2.36 20.2 1.12 19.56 1.12 18.56C1.12 18.52 1.12 18.44 1.08 18.4C1.08 18.36 1.12 18.28 1.12 18.24C1.12 17.28 2.36 16.64 3.68 15.92C4.96 15.28 6.28 14.6 6.76 13.44C7.24 12.24 6.8 10.8 6.36 9.44C5.92 8.08 5.52 6.8 6.12 6.24C6.76 5.6 8 5.92 9.32 6.28C10.64 6.6 12 6.96 13.16 6.48C14.28 6 15 4.84 15.68 3.68C16.44 2.44 17.12 1.28 18.16 1.28C19.2 1.28 19.92 2.44 20.68 3.64C21.4 4.76 22.12 5.88 23.2 6.36C24.36 6.84 25.68 6.52 27 6.24C28.32 5.92 29.56 5.64 30.2 6.28C30.8 6.84 30.32 8.12 29.84 9.44C29.32 10.84 28.8 12.28 29.32 13.48C29.8 14.64 31.2 15.32 32.52 16C33.92 16.68 35.2 17.36 35.2 18.32C35.2 18.36 35.2 18.44 35.24 18.48C35.24 18.52 35.2 18.6 35.2 18.64C35.24 19.44 33.92 20.12 32.52 20.8Z"
            fill="#C69A5B" />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.menu__link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.router-link-exact-active {
  background: #C69A5B;
  transition: all 0.3s ease;
}

.router-link-exact-active path {
  fill: rgb(255, 255, 255);
}



.footer {
  background: #1F1F1F;
  height: 5.8vh;
  width: 100%;
  margin-top: auto;
  display: flex;
  flex-direction: row;
}

.footer__hall {
  display: flex;
  justify-content: center;
  align-items: center;

}

.footer__hall svg {
  width: 2.7vh;
}

.footer__news {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #292929;
  border-right: 1px solid #292929;
}

.footer__news svg {
  width: 2.7vh;
}

.footer__sales {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer__sales svg {
  width: 2.7vh;
}

.size {
  width: 33.3333%;
}</style>
