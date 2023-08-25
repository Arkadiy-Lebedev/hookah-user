<script setup lang="ts">

const emit = defineEmits<{
  (e: 'closeModal', msg?: string): void
}>()

const ff = () => {
  console.log(456)
}

</script>

<template>
  <div @click.self="emit('closeModal')" class="modalaccountBackground">
    <div class="modalaccountActive">
      <div  class="modalaccountClose">      
        <img @click.self="emit('closeModal')"  src="../assets/image/clouse.svg" alt="зыкрыть" />
      </div>
       <div class="modalInfocontact">
            <a class="modalInfoheader">Контакты</a>
            <a href="tel:+79882316611" class="modalInfonumber contactstyle"
              >8918-152-52-55</a
            >
            <a class="modalInfoinstagramm contactstyle">Instagram</a>
            <a class="modalInfoadres contactstyle">Сочи ул. Горького д. 75</a>
          </div>
          <div class="modalInfomap">
            <div style="position: relative">
              <a
                href="https://yandex.ru/maps/239/sochi/?utm_medium=mapframe&utm_source=maps"
                style="
                  color: #eee;
                  font-size: 12px;
                  position: absolute;
                  top: 0px;
                "
                >Сочи</a
              ><a
                href="https://yandex.ru/maps/239/sochi/house/moskovskaya_ulitsa_27/Z0AYcQVkSUUCQFppfXl4cn5gYg==/?indoorLevel=1&ll=39.724005%2C43.593236&utm_medium=mapframe&utm_source=maps&z=17.65"
                style="
                  color: #eee;
                  font-size: 12px;
                  position: absolute;
                  top: 14px;
                "
                >Московская улица, 27 — Яндекс Карты</a
              ><iframe class="modalmap" 
                src="https://yandex.ru/map-widget/v1/?indoorLevel=1&ll=39.724005%2C43.593236&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgk3NzI5OTYxMzUSjQHQoNC-0YHRgdC40Y8sINCa0YDQsNGB0L3QvtC00LDRgNGB0LrQuNC5INC60YDQsNC5LCDQodC-0YfQuCwg0LzQuNC60YDQvtGA0LDQudC-0L0g0KbQtdC90YLRgNCw0LvRjNC90YvQuSwg0JzQvtGB0LrQvtCy0YHQutCw0Y8g0YPQu9C40YbQsCwgMjciCg1h5R5CFXpfLkI%2C&z=17.65"
                frameborder="1"
                allowfullscreen="true"
                style="position: relative"
              ></iframe>
            </div>
          </div>
    </div>
  </div>
</template>

<style scoped>

.modalaccountClose{
  display: flex;
  justify-content: right;
  padding-right: 2.9vh;
  position: relative;
  z-index: 999;
}
.modalInfoBackground {
  position: relative;
  overflow: hidden;
  height: 100vh;
}

.modalaccountActive {
  position: relative;
  z-index: 999;
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
  background-image: url('../assets/image/bg.jpg');
  background-position: 50% 0;
}

.modalaccountActive {
  width: 576px;
  background-color: #2d2d2d;
  cursor: default;
  padding-top: 1.5vh;
  padding-bottom: 3vh;
  border-radius: 5px;
}
.modalInfoClose, .modalInfocontact, .modalInfomap {

  position:relative;
  z-index: 2;
}

.modalInfoActive:before {
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
.modalInfoActive {
  width: 576px;
  background-color: #2d2d2d;
  cursor: default;
  padding-top: 1.5vh;
  padding-bottom: 3vh;
  border-radius: 5px;
}

.modalInfoClose {
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
.modalInfocontact {
  display: flex;
  flex-direction: column;
  padding-left: 2.9vh;
  padding-right: 2.9vh;
}
.modalInfoheader {
  color: #C69A5B;
  font-size: 22px;
  font-family: Roboto;
  margin-bottom: 4.6vh;
}
.contactstyle {
  color: #FFF;
  font-size: 18px;
  font-family: Roboto;
  margin-bottom: 2.5vh;
  margin-left:44px;
  position: relative;
}

.modalInfonumber::before{
  content: "";
  width: 24px;
  height: 24px;
  background: url('../assets/image/tel.svg');
  top: -4px;
  left:-42px;
  position: absolute;
}
.modalInfoinstagramm::before{
  content: "";
  width: 24px;
  height: 24px;
  background: url('../assets/image/instagramm.svg');
  top: -4px;
  left:-42px;
  position: absolute;
}
.modalInfoadres::before{
  content: "";
  width: 24px;
  height: 24px;
  background: url('../assets/image/map.svg');
  top: -4px;
  left:-42px;
  position: absolute;
}
.modalInfomap {
  margin-top: 2vh;
}
.modalmap {
  width:100%;
  height: 35vh;
}





.over {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.inscription {
  height: 4.8vh;
  width: 100%;
  background: #01010c;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-between;
}
.menu {
  background: #01010c;
  position: relative;
  height: 4.4vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  align-items: center;
}
.menu::after {
  content: "";
  width: 100%;
  height: 2px;
  background: #414141;
  bottom: 0;
  position: absolute;
}

.menu__exit {
  height: 2vh;
  margin-left: 3%;
}
.menu__question {
  height: 2vh;
  margin-right: 3%;
}
.inscription {
  position: relative;
}
.inscription::before {
  content: "";
  width: 100%;
  height: 2px;
  background: #414141;
  bottom: 0;
  left: 0;
  position: absolute;
}
.inscription__rowleft {
  rotate: 180deg;
  height: 2vh;
  margin-left: 3%;
}
.inscription__rowright {
  height: 2vh;
  margin-right: 3%;
}
.inscription__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.inscription__hall {
  font-size: 18px;
  text-align: center;
  color: aliceblue;
  font-family: Roboto;
  font-weight: 400;
  margin-left: 14px;
}

.main {
  flex: 1;
  background: #000;
  overflow: hidden;
  overflow-y: scroll;
  position: relative;
}

.footer {
  background: #1f1f1f;
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
  background: #c69a5b;
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

  .contactstyle {
    font-size: 16px;
  }
 .modalInfoheader {
  font-size: 20px;
 }
}
</style>
