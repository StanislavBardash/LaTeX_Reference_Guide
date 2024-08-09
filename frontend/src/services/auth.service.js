import http from "../http-common";

function login(user) {
    
    var data = {
        login: user.login,
        password: user.password
    };
    console.log(user);
    return http
            .post("/login", data)
            .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data)); // записываем данные пользователя в локальное хранилище, которое хранится в браузере
                
            }
            console.log(response.data)
            
        });
    
}

function logout() {
    localStorage.removeItem('user'); // при нажатии кнопки "Выйти" удаляем данные пользователя из локального хранилища
}

function register(user) {
    var data = {
        login: user.login,
        username: user.username,
        password: user.password
    };
    return http.post("/register", data);
}

export default {
    login: login,
    logout: logout,
    register: register
};