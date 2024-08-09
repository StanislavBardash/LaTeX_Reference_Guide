<template>
    <div id="app">
      <div style="display:flex; flex-direction: row; justify-content: center">
      <router-link to="/"><img src="../../public/home.png" width="50" height="50" float="left"/></router-link>
      <div v-if="currentUser" class="box div6">
        <router-link to="/profile" class="navbar-brand text-dark">

            <div class="enter-font" size="4" >
              <img src="../../public/profile.png" width="40" height="40"/>
            {{ currentUser.username }}
            </div>
        </router-link>
        
        <div class="box div6">
        <a href @click.prevent="logOut" class="navbar-brand text-dark">
            Выйти
        </a>
        
      </div>
        </div>
      <div v-else >
          <router-link to="/login" class="navbar-brand text-dark" text-align="right">
            <div class="box div6"><button class="btn btn-dark">Login</button></div>
              
          </router-link>
      </div>
    </div>
      <!-- <nav>
        <router-link class="item" to="/listUsers">Пользователи</router-link>
        <router-link class="item" to="/listCommands">Пользователи</router-link>
      </nav> -->

      
      <div class="container2">
        <div class="my-button">
          <img src="../../public/idea.png" width="50" height="50" float="left"/>
          <button class="btn btn-primary" :disabled="loading" @click="$router.push('/createCommand')">   
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Suggest a command!</span>
          </button>
        </div>
        <div class="my-label">
          <h6>Справочник по командам LaTex</h6>
        </div>
      </div>


    </div>
  </template>
  
  <script>
      export default {
    name: "NavBar",
    data() {
        return {};

    },
    computed: { // вычисляемые свойства
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
            window.location.href = '/login'; // // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
        }
    }
};
  </script>
  
  <style>
    .item {
      margin-right: 5px;
    }
    .div6 {
    position: absolute;
    right: 5%;
    
}
.container2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.my-button {
  position: relative;
  left: 5%;
}

.my-label {
  position: relative;
  right: 45%;
  /* Add any styles you want for the label */
}
  </style>