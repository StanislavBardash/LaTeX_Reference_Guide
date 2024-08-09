<template>
  <div id="app">
    <navbar/>
    <router-view />
    <!-- <list-commands/> -->
    
  </div>
</template>

<script>
    import Navbar from './components/Navbar'
    // import ListCommands from './components/command/ListCommands'
    export default {
        name: 'App',
        components: {
            Navbar: Navbar
            // ListCommands: ListCommands
        }
    }
</script>

<!--определение стилей-->
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    margin-top: 20px;
  }
  /* body{
    background-image: url("../public/back.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  } */
  
</style>
