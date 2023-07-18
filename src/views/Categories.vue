<script setup lang="ts">
import HeaderMenu from "../components/HeaderMenu.vue"
import { ref } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios';
import { apiMain } from "../api/api"

const router = useRouter();

interface ICategories {
  id: number
  type: string
  image: string
}

const categories = ref<ICategories[]>([])


const getCategoriesList = async () => {
  try {
    const { data } = await axios.get(`${apiMain}api/client/categories`)
    categories.value = data.data
  } catch (e) {
    console.log(e)
  }
}
getCategoriesList()

</script>

<template>

   <div class="header">
     <!-- <HeaderMenu/> -->
 
          <div class="inscription">       
              <h3 class="inscription__hall">Меню</h3>
          </div>
        </div>
        <div class="main main-stylemenu">
          <div class="main__picture">
            <img src="../assets/image/picture.jpg" alt="меню" />
          </div>
          <div class="products">
            <div v-for="categoria in categories" :key="categoria.id" class="products__items" @click="router.push({ name: 'products', params: { id: categoria.id } })">
              <img :src="categoria.image" alt="кальян" />
              <p>{{ categoria.type }}</p>
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
.main-stylemenu {
  padding: 0 30px 0 30px;
  padding-bottom:20px;
}
.main__picture img{
  max-width: 100%;
}
.main__picture {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3vh;
  margin-top: 1vh;
}
.products{
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 1em;
  grid-template-columns: 1fr 1fr 1fr;

}
.products__items {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #262626;
  padding: 28px;
}
.products__items p {
  color: #898989;
  font-size: 20px;
  font-family: Roboto;    
}
.products__items img {
  max-width: 100%;
  margin-bottom: 20px;
}




@media (max-width: 460px) {
  .products__items p {
    font-size: 16px;   
  }
}
@media (max-width: 420px) {

  .products__items {
    padding: 15px;
  }
  .products__items img {
    max-width: 80%;
    margin-bottom: 15px;
  }
  .inscription__hall {
    font-size: 16px;
  }
  .inscription__wrapper img {
    width: 17px;
  }
}
@media (max-width: 340px) {

  .products__items {
    padding: 10px;
  }
  .products__items img {
    max-width: 70%;
    margin-bottom: 10px;
  }
  .products__items p {
    font-size: 14px;   
  
}
.inscription__hall {
  font-size: 14px;
}
.inscription__wrapper img {
  width: 15px;
}
}

</style>
