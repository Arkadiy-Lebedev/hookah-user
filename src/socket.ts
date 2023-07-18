import { createPinia } from 'pinia'

// add a property named `secret` to every store that is created
// after this plugin is installed this could be in a different file
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// give the plugin to pinia
pinia.use(SecretPiniaPlugin)

pinia.useTablesList

import { reactive } from "vue";
import { io } from "socket.io-client";
// import { useTablesList } from './stores/tablesStore'
// import { useDateStore } from './stores/dateStore'
const dateStore = pinia.useDateStore();

const tablesList = pinia.useTablesList();



export const state = reactive({
    connected: false,
    fooEvents: [],
  barEvents: []
});

const upLoad = async () => {
    await tablesList.getTablesInDate(dateStore.dateInBooking)

}

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:8000";

export const socket = io(URL);

socket.on("update", () => {
    upLoad()
  
});

socket.on("connect", (socket) => {
    console.log("connect", socket)
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("foo", (...args) => {
  state.fooEvents.push(args);
});

socket.on("bar", (...args) => {
  state.barEvents.push(args);
});