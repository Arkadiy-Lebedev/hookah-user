import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import LoadScript from "vue-plugin-load-script";
import App from './App.vue'
import router from './router'

import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";

const pinia = createPinia()
const app = createApp(App)

app.use(LoadScript);




app.use(pinia)
app.use(createPinia);
app.use(router)
app.use(PrimeVue, {
    locale: {
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        weekDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        firstDayOfWeek: 1,
        dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        dayNamesShort: ["Вос", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб"],
        emptyFilterMessage: 'Не найдено',
    }
});
app.use(ToastService);

app.mount('#app')


