<script setup lang="ts">
import { useRouter } from "vue-router";


const router = useRouter();

interface Props {
  title: string,
  

}

defineProps<Props>()

</script>

<template>

        <div class="header-menu">
      <div class="inscription-menu">
        <img @click="router.go(-1)" src="../assets/image/rowleft.svg" alt="exit" class="inscription-menu__rowleft" />
        <div class="inscription-menu__wrapper">
          <h3 class="inscription-menu__hall">{{ title }}</h3>
        </div>
      </div>
    </div>
       
</template>

<style scoped>


.inscription-menu {
  height: 5.8vh;
  width: 100%;
  background: #01010c;
  display: flex;
  align-items: center;
  flex-direction: row;
  position: relative;
}


.inscription-menu::before {
  content: "";
  width: 100%;
  height: 2px;
  background: #414141;
  bottom: 0;
  left: 0;
  position: absolute;
}

.inscription-menu__rowleft {
  height: 2vh;
  margin-left: 3%;
}

.inscription-menu__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inscription-menu__hall {
  font-size: 18px;
  text-align: center;
  color: aliceblue;
  font-family: Roboto;
  font-weight: 400;
  margin-left: 70px;
}
</style>
