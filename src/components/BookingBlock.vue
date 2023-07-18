<template>
  <div class="modalActive">
              <div class="modalClose">
                <p>Стол № 4 основной зал</p>
                <img src="../assets/image/clouse.svg" alt="зыкрыть" />
              </div>
              <div class="modalpicture">
                <img src="../assets/image/imgtable/table4.jpg" alt="стол4" />
              </div>
              <div class="modalwraper">
                <div class="modaltime">
                  <p>Занят: с 21:00</p>
                </div>
                <div class="modalpik">
                  <p>12:00</p>
                </div>
                <div class="modaltext">
                  <textarea placeholder="Пожелания к заказу..." name="enter" id="modalenter"></textarea>
                </div>
                <div class="modalconfirm">
                  <div class="modalbuttonbron"><button class="modalbutton">забронировать</button></div>
                  <div class="modalbuttonchange">
                    <button class="modalbuttonno stylebut">отменить</button>
                    <button class="modalbuttonyes stylebut">изменить</button>
                  </div>
                </div>
              </div>
              <div class="modalWindow"></div>
            </div>
</template>

<style scoped>
/*--------------------*/

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
  align-items:center
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
  display: none;
}

.modalbuttonchange {
  display: flex;
  justify-content: space-between;
  gap: 10px;
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


</style>
