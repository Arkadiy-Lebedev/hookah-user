<script setup lang="ts">

interface Props {
  header: string,
  description: string,
  price: number,
  img: string

}

const props = defineProps<Props>()



</script>

<template>

  <div class="main-items">        
        <img :src="props.img" alt="кальян классический" />      
        <div class="main-items__wrapper">
          <div class="main-items__description">
            <p class="main-items__name">{{props.header}}</p>
            <p class="main-items__explanation">
              {{ props.description }}
            </p>
          </div>
          <div class="main-items__price">
            <p>{{ props.price }} руб.</p>
          </div>
        </div>
      </div>
</template>

<style scoped>
p {
  margin: 0;
}


.main-items {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  margin-bottom: 4.3vh;
}

.main-items__wrapper {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-left: 15px;

}

.main-items img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  
}

.main-items__name {
  color: #FFF;
  font-size: 20px;
  font-family: Roboto;
  margin-bottom: 10px;

}

.main-items__explanation {
  color: #898989;
  font-size: 16px;
  font-family: Roboto;

}

.main-items__price {
  color: #C69A5B;
  font-size: 18px;
  font-family: Roboto;

}

@media (max-width: 490px) {
  .main-items__name {
    font-size: 16px;
  }

  .main-items__explanation {
    font-size: 14px;
    margin-top: 5px;
  }

  .main-items__price {
    color: #C69A5B;
    font-size: 15px;
  }
  .main-items__name{
    margin-bottom: 0;
  }

}

@media (max-width: 450px) {
  .main-items__wrapper {
    flex-direction: column;
    align-items: flex-start;
  }

  .main-items__description {
    margin-bottom: 1.5vh;
  }

  .inscription-menu__hall {
    font-size: 16px;

  }
}

@media (max-width: 360px) {
  .main-items__name {
    font-size: 17px;
  }

  .main-items__explanation {
    font-size: 13px;
  }

  .main-items__price {
    color: #C69A5B;
    font-size: 15px;
  }

  .inscription-menu__hall {
    font-size: 15px;

  }
}

</style>
