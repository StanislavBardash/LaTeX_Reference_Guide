<template>
    <div class="container">
        <h4>Команда {{ command.name }}</h4>
        <div v-if="haveFavourite">
        <button class="btn btn-primary" @click="addFavourite">
              <span>Add to Favourite</span>
          </button>
        </div>
        <div v-else>
            This command is in your Favourites
        </div>
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

    
    <div class="lower">
        <h1>Comments</h1>
        <form>
        <div class="form-group">
            <label for="comment"><strong>Add comment:</strong></label>
            <textarea class="form-control" rows="5" id="comment" v-model="textInput"></textarea>
                <button class="btn btn-primary" @click="onClick(textInput)">
                    <span>Submit</span>
                </button>
        </div>
        </form>
        <div v-for="(comment, i) in displayedComments" :key="i">
        <div v-for="(user, index) in user_comment[i]" :key="index">
        
        {{ user.username}}: {{comment.content}}
       
        <div> 
        {{new Date(comment.date).toLocaleString() }}
    </div>
        </div> 
        
        
      </div>
    </div>
    <nav>
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
    </nav>
    </div>

    
    
</template>

<script>
    import http from "../../http-common";
    import hljs from 'highlight.js';
    import 'highlight.js/styles/github.css';
    export default {
        name: "command-details",
        props: ['id'],
        data() {
            return {
                command: {},
                code_example: '',
                tags : [],
                category : '',
                comments: [],
                currentPage: 1, // the current page number
                pageSize: 3, // maximum rows per page
                user_comment : [],
                is_favourite : []
            };
        },
        computed: {
            pageCount() {
                // calculate the total number of pages based on pageSize and commands.length
                return Math.ceil(this.comments.length / this.pageSize);
        },
        pages() {
      // calculate an array of page numbers to display in the pagination
      let pagesArray = [];
      for (let i = 1; i <= this.pageCount; i++) {
        pagesArray.push(i);
      }
      return pagesArray;
    },
    displayedComments() {
      // slice the commands array based on the currentPage and pageSize
      let start = (this.currentPage - 1) * this.pageSize;
      let end = start + this.pageSize;
      return this.comments.slice(start, end);
    },
    currentUser() {
                return this.$store.state.auth.user;
            },
    haveFavourite(){
        return this.is_favourite.length == 0;
    }

    },
        methods: {
            getIsFavourite(){
                http
                    .get(`/findFavouriteForUserAndCommand/${this.currentUser.id}/${this.id}`) // обращаемся к серверу для получения списка пользователей, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        // if (response.data === []){
                        //     this.is_favourite = true;
                        // }
                        // else{
                        //     this.is_favourite = false;
                        // }
                        this.is_favourite = response.data;
                        
                        
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
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
            async getUserForComment(commentId) {
                try {
                    const response = await http.get(`/findUserForComment/commentId=${commentId}`);
                    if (response.data.length != 0) return response.data;
                } catch (error) {
                    console.log(error);
                }
            },
            async addFavourite() {
                
                var data = {
                            user_id: this.currentUser.id,
                            command_id: this.id,
                            date : new Date()
                        };    

                    await
                http
                    .post(`/addFavourite`, data)
                    .then(() => {
                        location.reload();
                    })
                    .catch(e => {
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
            getCommentsForCategory() {
                http
                    .get(`/findCommentForCategory/commandId=${this.id}?sort=desc`) // обращаемся к серверу для получения списка пользователей, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.comments = response.data;
                        
                        this.populateUserComment();
                        
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            async populateUserComment() {
              const userPromise = this.displayedComments.map((comment) => this.getUserForComment(comment.id));
              const userresolved = await Promise.all(userPromise);
              this.user_comment = userresolved;
            },
            async onClick(textInput) {
                var data = {
                    content: textInput,
                    user_id : this.currentUser.id,
                    command_id : this.id,
                    date : new Date()
                };
                await 
                http
                    .post(`/addComment`, data)
                    .then(() => {
                        //this.$router.push('/command/'+this.id); // переходим к списку пользователей
                        location.reload();
                    })
                    .catch(e => {
                        console.log(e);
                    });
                
            // await axios.post('/your-api-endpoint', { /* Your data here */ });
            // location.reload();
            
        },
            changePage(page) {
      // set the currentPage to the selected page number
      this.currentPage = page;
      this.populateUserComment();

    },
    nextPage() {
      // increment the currentPage if it's not already the last page
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    prevPage() {
      // decrement the currentPage if it's not already the first page
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
            
        },
        mounted() { // загружаем данные пользователя
            this.getCommand();
            this.getIsFavourite();
            this.getCodeExample();
            this.getTags();
            this.getCategory();
            this.getCommentsForCategory();
            
        }
    }
</script>

<style>
.listi{
    border: 1px solid #000000;
    background-color: rgb(237, 237, 237);
}
</style>
