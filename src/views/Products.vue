<script setup lang="ts">
import { ref } from 'vue'
import HeaderMenuProducts from "../components/HeaderMenuProducts.vue";
import Product from "../components/Product.vue";
import { useRoute } from "vue-router";
import axios from 'axios';
import { apiMain } from "../api/api"
import { IProduct } from "../types/Iproduct"

const route = useRoute();



const products = ref<IProduct[]>([])
const categories = ref<string>('')

const getProductsList = async (id: string) => {

  try {
    const { data } = await axios.post(`${apiMain}api/client/products`, {
      id: id
    })
    console.log(data)
    products.value = data.data
    categories.value = data.categories[0].type

  } catch (e) {
    console.log(e)
  }
}
console.log(route)
getProductsList(route.params.id)

</script>

<template>
  <HeaderMenuProducts :title="categories"/>
  <div class="main-menu main-menu-style">
    <Product v-if="products.length>0" v-for="product in products" :key="product.id" :header="product.name" :description="product.discription_product" :price="product.price" :img="product.image_product" />
   <p v-else  class="main-item__text">Товары скоро появятся</p>
    </div>
 
</template>

<style scoped>
.main-menu {
  flex: 1;
  background: #000;
  overflow: hidden;
  overflow-y: scroll;
  position: relative;
}

.main-items {
  position: relative;
  z-index: 2 !important;
  background: none;
}

.main-menu:before {
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

.main-menu-style {
  padding: 0 30px 0 30px;
  padding-bottom: 20px;
  padding-top: 20px;
}

.main-item__text{
  color: rgb(135, 135, 135);
}
</style>
