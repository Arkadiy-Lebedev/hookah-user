<script setup lang="ts">
import { ref } from 'vue'
import HeaderMenuProducts from "../components/HeaderMenuProducts.vue";
import Product from "../components/Product.vue";
import { useRoute } from "vue-router";
import axios from 'axios';
import { apiMain } from "../api/api"
import { IProduct } from "../types/Iproduct"
import SpinnerLoading from "../components/Spinner.vue";


const route = useRoute();



const products = ref<IProduct[]>([])
const categories = ref<string>('')
  const spinner = ref<boolean>(true)

const getProductsList = async (id: string) => {
  spinner.value = true
  try {
    const { data } = await axios.post(`${apiMain}api/client/products`, {
      id: id
    })
    console.log(data)
    products.value = data.data
    categories.value = data.categories[0].type
    spinner.value = false

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
  <SpinnerLoading v-if="spinner" ></SpinnerLoading>
    <Product v-else-if="products.length>0" v-for="product in products" :key="product.id" :header="product.name" :description="product.discription_product" :price="product.price" :img="product.image_product" />
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

.main-menu-style {
  padding: 0 30px 0 30px;
  padding-bottom: 20px;
  padding-top: 20px;
}

.main-item__text{
  color: rgb(135, 135, 135);
}
</style>
