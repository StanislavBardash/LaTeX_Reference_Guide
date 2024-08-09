<template>
    <div>
        <h4>Добавление пользователя</h4>
        <div v-if="!submitted">
            <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
            Обработчик addUser определён в script-->
            <form @submit="addUser">
                <!--v-model - директива для связывания данных с элементами.
                Связь происходит при помощи переменных, которые определены в data()-->
                <input type="text" name="name" id="name" placeholder="ФИО" required v-model="user.name">
                <input type="checkbox" v-model="user.admin" :value="user.admin">
                <label>Администратор</label>
                <input type="submit" value="Добавить">
            </form>
        </div>
        <div v-else>
            <h4>Вы успешно добавили запись</h4>
            <div>
                <!--В v-on:click указывается обработчик, который выполниться после нажатия на кнопку "Добавить нового пользователя"
                Обработчик newUser определён в script-->
                <button v-on:click="newUser">Добавить нового пользователя</button>
            </div>
            <div>
                <router-link to="/listUsers">Вернуться к списку пользователей</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddUser",
        data() {
            return {
                user: {
                    name: "",
                    username: "username", // пока указываем значения по умолчанию. После реализации регистрации будем отправлять на сторону сервера "нормальные" логин и пароль
                    password: "password",
                    admin: false
                },
                submitted: false
            };
        },
        methods: {
            addUser(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.user.name,
                    username: this.user.username,
                    password: this.user.password,
                    admin: this.user.admin
                };
                // Либо var data = this.user;
                http
                    .post("/addUser", data)
                    .then(response => { // запрос выполнился успешно
                        this.user.id = response.data.id;
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });

                this.submitted = true;
            },
            newUser() {
                this.submitted = false;
                this.user = {
                    name: "",
                    username: "username",
                    password: "password",
                    admin: false
                };
            }
        }
    }
</script>