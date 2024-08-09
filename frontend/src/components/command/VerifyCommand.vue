<template>
    
    <div class="container">
        <h4>Команда {{ command.name }}</h4>

    <p>
        <strong>About: </strong>{{ command.description }}
    </p>

    <div
        class="row align-items-center"
        style="min-height: 15vh; display:flex; flex-direction: row; justify-content: center; width: 50%;">
        <div class="col-md-15 ">


    <pre class="listi">
    <code v-html="code_example"></code>
  </pre>
        </div>
        

        




    </div>
    <div style="display:flex; flex-direction: row; justify-content: space-between;">
        <div>
        Категория: {{ category.name }}
    </div>
    <div >
        Теги:
        <ul>
                <li v-for="(tag, i) in tags" :key="i">
                  {{tag.tag.name}}
                </li>
                
        </ul>
    </div>



    </div>

    
    <!-- <div class="lower">
        <h1>Comments</h1>
        <form>
        <div class="form-group">
            <label for="comment"><strong>Add comment:</strong></label>
            <textarea class="form-control" rows="5" id="comment" v-model="textInput"></textarea>
                <button class="btn btn-primary" :disabled="loading" @click="onClick(textInput)">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Submit</span>
                </button>
        </div>
        </form>
        <div v-for="(comment, i) in displayedComments" :key="i">
        <div v-for="(user, index) in user_comment[i]" :key="index">
        
        {{ user.username}}: {{comment.content}}
       
        <div> 
        {{ Date(comment.date).toLocaleString() }}
    </div>
        </div> 
        
        
      </div>
    </div> -->
    <!-- <nav>
      <div class="pagination justify-content-center">
  <ul class="pagination">
    <li class="page-item" :class="{ disabled: currentPage <= 1 }">
      <button class="page-link" @click="prevPage">Prev</button>
    </li>
    <li v-for="page in pages" :key="page" class="page-item" :class="{ active: currentPage === page }">
      <button class="page-link" @click="changePage(page)">{{ page }}</button>
    </li>
    <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
      <button class="page-link" @click="nextPage">Next</button>
    </li>
  </ul>
</div>
    </nav> -->
    <div class="container4">
        <div class="my-button2">
          <img src="../../../public/approve.png" width="50" height="50" float="left"/>
          <button class="btn btn-primary" @click="approve()">   
              <span class="spinner-border spinner-border-sm"></span>
              <span>Approve</span>
          </button>
        </div>
        <div class="my-button3">
          <img src="../../../public/decline.png" width="50" height="50" float="left"/>
          <button class="btn btn-primary" @click="decline()">   
              <span class="spinner-border spinner-border-sm"></span>
              <span>Decline</span>
          </button>
        </div>
    </div>
    </div>
    
    
</template>

<script>
    import http from "../../http-common";
    import hljs from 'highlight.js';
    import 'highlight.js/styles/github.css';
    export default {
        name: "verify-command",
        props: ['id'],
        data() {
            return {
                command: {},
                code_example: '',
                tags : [],
                category : '',
            };
        },
        computed: {

    currentUser() {
                return this.$store.state.auth.user;
            },
    },
        methods: {
            
            getCommand() {
                http
                    .get("/command/" + this.id) // обращаемся к серверу для получения списка пользователей, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.command = response.data;
                        
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getCodeExample() {
                http
                    .get(`/findCodeExampleForCommand/commandId=${this.id}`) // обращаемся к серверу для получения списка пользователей, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.code_example = hljs.highlight('latex', response.data[0].content).value;
                        // this.code_example = hljs.highlight('latex', response.data.content).value;
                        
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getTags() {
                http
                    .get(`/findTagsForCommand/commandId=${this.id}`) // обращаемся к серверу для получения списка пользователей, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.tags = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getCategory() {
                http
                    .get(`/findCategoryForCommand/commandId=${this.id}`) // обращаемся к серверу для получения списка пользователей, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.category = response.data[0];
                        
                        
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },

            async approve() {
                
                console.log("Approve!!!!!")
                var data = {
                    name: this.command.name,
                    description : this.command.description,
                    code_example_id : this.command.code_example_id,
                    category_id : this.command.category_id,
                    date : this.command.date,
                    verified : 1
                };
                await 
                http
                    .post("/updateCommand/" + this.command.id, data)
                    .then(() => {
                        this.$router.push('/AdminCommand'); // переходим к списку пользователей
                        // location.reload();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            
        },
        async decline() {
                await 
                http
                    .post(`/deleteCommand/` + this.command.id)
                    .then(() => {
                        this.$router.push('/AdminCommand');
                        
                    })
                    .catch(e => {
                        console.log(e);
                    });
                
            // await axios.post('/your-api-endpoint', { /* Your data here */ });
            // location.reload();
            
        },

            
        },
        mounted() { // загружаем данные пользователя
            this.getCommand();
            this.getCodeExample();
            this.getTags();
            this.getCategory();
        }
    }
</script>

<style>
.listi{
    border: 1px solid #000000;
    background-color: rgb(237, 237, 237);
}
.container4 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.my-button2 {
  position: relative;
  left: 25%;
}
.my-button3 {
  position: relative;
  right: 25%;    
}
</style>
