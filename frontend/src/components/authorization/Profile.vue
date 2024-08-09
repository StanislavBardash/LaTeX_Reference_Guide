<template>
    <div class="container">
        
            <div
        class="row align-items-center"
        style="min-height: 30vh; text-align: center;">
        <div class="col-md-12">
            <header>


            <h3>
                Личный Кабинет
            </h3>
            <img src="../../../public/profile.png" width="100" height="100"/>   
            <h1 > Name: <strong>{{currentUser.username}}</strong></h1>
            
        <p>
            <strong>Registration Date:</strong>
            {{new Date(currentUser.register_date).toLocaleString()}}
        </p>
        </header>


        <router-link to="/favourite" class="navbar-brand text-dark">

            <div class="enter-font" size="4" >
            <img src="../../../public/favourite.png" width="40" height="40"/>
            Favourite commands
            </div>
        </router-link>

            <router-link to="/author" class="navbar-brand text-dark">

                <div class="enter-font" size="4" >
                <img src="../../../public/pen.png" width="40" height="40"/>
                Your commands
                </div>
            </router-link>
            
            <router-link v-if="currentUser.admin" to="/AdminCommand" class="navbar-brand text-dark">

            <div class="enter-font" size="4" >
            <img src="../../../public/admin.png" width="40" height="40"/>
            Requested commands
            </div>
            </router-link>

            
        </div>
            </div>
        

        
    </div>
</template>
<script>
    export default {
        name: 'ProfileUser',
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        mounted() {
            if (!this.currentUser) {
                this.$router.push('/login');
            }
        }
    };
</script>