import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import ListUsers from "./components/user/ListUsers";
import AddUser from "./components/user/AddUser";
import User from "./components/user/User";
import SearchUsers from "./components/user/SearchUsers";
import ListCommands from "./components/command/ListCommands";
import Login from "./components/authorization/Login";
import Profile from "./components/authorization/Profile";
import Register from "./components/authorization/Register";
import ListFavourite from "./components/favourite/ListFavourite";
import ListUserCommand from "./components/user_command/ListUserCommand";
import Command from "./components/command/Command";
import createCommand from "./components/command/createCommand";
import AdminCommand from "./components/command/AdminCommand";
import VerifyCommand from "./components/command/VerifyCommand";
import Search from "./components/search/search";
// определяем маршруты
const routes = [
    {
        path: "/listUsers", // указание маршрута, по которому будем переходить к списку пользователей
        name: "users", // имя маршрута
        alias: "/users", // указание дополнительного маршрута
        component: ListUsers, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список пользователей"
        }
    },
    {
        path: "/user/:id",
        name: "user-details",
        component: User,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные пользователя"
        }
    },
    {
        path: "/createCommand",
        name: "createCommand",
        component: createCommand,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Here you can create your own command"
        }
    },
    {
        path: "/command/:id",
        name: "command-details",
        component: Command,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные команды"
        }
    },
    {
        path: "/",
        name: "user-details",
        component: ListCommands,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные пользователя"
        }
    },
    {
        path: "/AdminCommand",
        name: "admin-details",
        component: AdminCommand,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Requested Commands"
        }
    },
    {
        path: "/search",
        name: "search",
        component: Search,
        props: (route) => ({
            nameSearchQuery: route.query.nameSearchQuery,
            categorySearchQuery: route.query.categorySearchQuery,
          }),
        meta: {
            title: "Search commands"
        }
    },
    {
        path: "/VerifyCommand/:id",
        name: "verify-command",
        component: VerifyCommand,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Requested Command"
        }
    },
    {
        path: "/addUser",
        name: "add-user",
        component: AddUser,
        meta: {
            title: "Добавление пользователя"
        }
    },
    {
        path: "/searchUsers",
        name: "search-users",
        component: SearchUsers,
        meta: {
            title: "Поиск пользователей"
        }
    },
    {
        path: "/login",
        name: "login-user",
        component: Login,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/register",
        name: "register-user",
        component: Register,
        meta: {
            title: "Регистрация"
        }
    },
    {
        path: "/profile",
        name: "profile-user",
        component: Profile,
        meta: {
            title: "Профиль пользователя"
        }
    },
    {
        path: "/favourite",
        name: "favourite-user",
        component: ListFavourite,
        meta: {
            title: "Избранное"
        }
    },
    {
        path: "/author",
        name: "command-user",
        component: ListUserCommand,
        meta: {
            title: "Команды сделанные текущим пользователем"
        }
    }
    // ListFavourite

];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach((to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';
    next();
});

export default router;