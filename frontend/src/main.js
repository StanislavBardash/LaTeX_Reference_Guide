import { createApp } from 'vue' // Импорт метода для создания приложения
import App from './App.vue' // Импорт главного компонента
import router from './router' // Маршрутизация
// Подключение Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import Pagination from 'v-pagination-3';
import store from './store';
import { BButton } from 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App); // Создание экземпляра приложения
app.use(router); // Подключение маршрутизации
app.use(store);

app.component(`pagination`, Pagination);
app.component('b-button', BButton);
app.mount('#app'); // Привязка экземпляра приложения к странице HTML (находится в public)
