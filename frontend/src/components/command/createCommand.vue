<template>
    <div class="container3">
        
        <h1>Here you can suggest a command</h1>
        <form>
            <div class="form-group">
                <label for="usr">Command name:</label>
                <input type="text" class="form-control" id="usr" v-model="name" placeholder="Enter your command name">
            </div>
        <div class="form-group">
            <label for="description"><strong>Description:</strong></label>
            <textarea class="form-control" rows="5" id="description" v-model="description" placeholder="Enter your description"></textarea>  
        </div>
        <div class="form-group">
  <label for="sel1">Select category:</label>
  <select class="form-control" id="sel1" v-model="categoryname">
    <option v-for="(category,i) in categories" :key="i" :value="category.id">
        {{ category.name }}
    </option>
  </select>
</div>
        <div class="form-group">
            <label for="code">Type your code:</label>
            <VAceEditor
    v-model:value="codeInput"
    mode="latex"
    lang="latex"
    theme="monokai"
    :options="{ maxLines: 30,
        minLines: 15,
    //   enableBasicAutocompletion: true,
    //   enableLiveAutocompletion: true,
      fontSize: 14,
      highlightActiveLine: true,
    //   enableSnippets: true,
      showLineNumbers: true,
      tabSize: 2,
      showPrintMargin: false,
      showGutter: true }"
    ></VAceEditor>
    
  </div>
  <div class="form-group" @click="$router.push('/')">
        <button class="btn btn-primary" @click="onClick2(name, description, categoryname, codeInput)">
            <span>Submit</span>
        </button>
    </div>
        </form>
    </div>

</template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу

    import { VAceEditor } from 'vue3-ace-editor';
    import 'ace-builds/src-noconflict/mode-latex';
    import 'ace-builds/src-noconflict/theme-monokai';
    export default {
        name: "createCommand", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                categories: [],
                codeInput: ""   
            };
        },

    components: {
        VAceEditor
  },
  computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: { // методы компонента
            getCategories() {
                http
                    .get(`/categories`) // обращаемся к серверу для получения списка пользователей
                    .then(response => { // запрос выполнен успешно
                        this.categories = response.data;
                        
                        
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            //this.currentUser.id,
            async onClick2(a,b,c,d) {
                // console.log(a);
                // console.log(b);
                // console.log(c);
                // console.log(d);
                
                

                    await
                http
                    .post(`/addCodeExample`, {content:d})
                    .then((response) => {
                        
                        var data = {
                            name: a,
                            description : b,
                            code_example_id : response.data.id,
                            category_id : c,
                            date : new Date(),
                            verified : this.currentUser.admin
                        };
                        http
                            .post(`/addCommand`, data)
                            .then((response2) => {
                                //this.$router.push('/'); // переходим к списку пользователей
                                console.log(data);
                                    http
                                    .post(`/addUserCommand`, {user_id:this.currentUser.id, command_id:response2.data.id})
                                    .then(() => {
                                        
                                         // переходим к списку пользователей
                                        console.log(data);
                                    })
                                    .catch(e => {
                                        console.log(e);
                                    });
                            })
                            .catch(e => {
                                console.log(e);
                            });




                    })
                    .catch(e => {
                        console.log(e);
                    });

            
            this.$router.push('/');
            location.reload();
        },
            
        
    },
    mounted() { // загружаем данные пользователей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getCategories();
            
        },
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>