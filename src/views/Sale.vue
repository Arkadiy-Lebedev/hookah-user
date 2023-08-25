<script setup lang="ts">
import HeaderMenu from "../components/HeaderMenu.vue"
import { ref } from 'vue'

import axios from 'axios';
import { apiMain } from "../api/api"
import SpinnerLoading from "../components/Spinner.vue";



interface ISaleList {
  id: number
  title: string
  description: string
  image: string
}

const saleList = ref<ISaleList[]>([])
  const spinner = ref<boolean>(true)

const getSaleList = async () => {
  spinner.value = true
  try {
    const { data } = await axios.get(`${apiMain}api/client/sale`)
    saleList.value = data.data
    spinner.value = false
  } catch (e) {
    console.log(e)
  }
}
getSaleList()

</script>

<template>

   <div class="header">
     <!-- <HeaderMenu/> -->
 
          <div class="inscription">       
              <h3 class="inscription__hall">Акции</h3>
          </div>
        </div>
     <div class="main main-style">
      <SpinnerLoading v-if="spinner" ></SpinnerLoading>
          <div v-else v-for="item in saleList" :key="item.id" class="main-sales ">
            <img :src="item.image" alt="акция" />
            <div class="main-sales__wrapper">
              <div class="main-sales__description">
                <p class="main-sales__name">{{ item.title }}</p>
                <p class="main-sales__explanation">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>    

</template>

<style scoped>

p{
  margin: 0;
}

.inscription {
  height: 4.8vh;
  width: 100%;
  background: #01010c;
  display: flex;
  align-items: center;
  justify-content: center;  
  flex-direction: row;
  justify-content: center;
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
.inscription{
  position:relative;
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

}

.main {
  flex: 1;
  background: #000;
  overflow: hidden;
  overflow-y: scroll;
  position: relative;
}



.main-sales {
  display: flex;
  align-items: center;
  padding: 2vh 1.2vh 2vh;
  background: #262626;
  margin-top:  1vh;
}
.main-sales img{
  width: 14vh;
}
.main-sales__description{
  display: flex;
  flex-direction: column;
  margin-left: 0.7vh;
}
.main-sales__name {
  color: #C69A5B;
font-size: 20px;
font-family: Roboto;
margin-bottom: 10px;
}
.main-sales__explanation {
  color: #898989;
font-size: 16px;
}


@media (max-width: 450px) {
  .main-sales__name {
  font-size: 18px;
  }
  .main-sales__explanation {
  font-size: 15px;
  }
}
@media (max-width: 420px) {
  .inscription__hall {
    font-size: 16px;
  }
}

@media (max-width: 376px) {
  .main-sales__name {
  font-size: 17px;
  }
  .main-sales__explanation {
  font-size: 14px;
  }
}
@media (max-width: 340px) {
  .main-sales__name {
    font-size: 15px;
    }
    .main-sales__explanation {
    font-size: 12px;
    }

.inscription__hall {
  font-size: 14px;
}

}

</style>
