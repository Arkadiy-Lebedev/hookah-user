<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderMenu from "../components/HeaderMenu.vue"

import Footer from '../components/Footer.vue'
</script>


<template>
     <section class="over">
<HeaderMenu/>
           <RouterView/>
    
           
           <Footer/>        
        </section>
        
</template>
<style >
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>