<template>
    <div id="app">
        <div class="container">
  <table class="table table-striped table-bordered">
    <thead>
      <tr align="center">
        <th class="col-2">Command Name</th>
        <th class="col-6">Description</th>

        <th class="col-2">Author</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(command, index) in displayedCommands" :key="index">
        <td><router-link :to="{
                        name: 'command-details',
                        params: { id: command.id }
                    }">
                    {{ command.name }} 
        </router-link>
          <div v-for="(cat, i) in category[index]" :key="i">
        Category: {{cat.name}}
      </div>
    </td>
        
        <td>{{ command.description }}</td>
        <td>
            <ul>
                <li v-for="(author, i) in authors[index]" :key="i">
                  {{author.username}}
                </li>
                <div>
                {{new Date(command.date).toLocaleString()}}
                </div>
              </ul>
        </td>
      </tr>
    </tbody>
  </table>
  <nav>
      <div class="pagination justify-content-center">
  <ul class="pagination">
    <li class="page-item" :class="{ disabled: currentPage <= 1 }">
      <button class="page-link" @click="prevPage">Prev</button>
    </li>
    <li v-for="page in pages" :key="page" class="page-item" :class="{ active: currentPage === page }">
      <button class="page-link" @click="changePage(page)">{{ page }}</button>
    </li>
    <li class="page-item" :class="{ disabled: currentPage >= pageCount }">
      <button class="page-link" @click="nextPage">Next</button>
    </li>
  </ul>
</div>
    </nav>
</div>
    </div>
</template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
    export default {
        name: "ListFavourite", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                commands: [],
                authors: [],
                category: [],
                currentPage: 1, // the current page number
                pageSize: 3 // maximum rows per page
            };
        },
        computed: {
            pageCount() {
                // calculate the total number of pages based on pageSize and commands.length
                return Math.ceil(this.commands.length / this.pageSize);
        },
        currentUser() {
                return this.$store.state.auth.user;
            },
            
        pages() {
      // calculate an array of page numbers to display in the pagination
      let pagesArray = [];
      for (let i = 1; i <= this.pageCount; i++) {
        pagesArray.push(i);
      }
      return pagesArray;
    },
    displayedCommands() {
      // slice the commands array based on the currentPage and pageSize
      let start = (this.currentPage - 1) * this.pageSize;
      let end = start + this.pageSize;
      return this.commands.slice(start, end);
    },
    },
        methods: { // методы компонента
            getCommands() {
                http
                    .get(`/findFavouriteForUser/userId=${this.currentUser.id}`) // обращаемся к серверу для получения списка пользователей
                    .then(response => { // запрос выполнен успешно
                        this.commands = response.data;
                        this.populateAuthors();
                        this.populateCategory();
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            async getCategory(commandId) {
                try {
                    const response = await http.get(`/findCategoryForCommand/commandId=${commandId}`);
                    if (response.data.length != 0) return response.data;
                } catch (error) {
                    console.log(error);
                }
            },
            async getAuthors(commandId) {
                try {
                    const response = await http.get(`/findUsersForCommand/commandId=${commandId}`);
                    if (response.data.length != 0) return response.data;
                } catch (error) {
                    console.log(error);
                }
            },
        
            async populateAuthors() {
                const authorPromises = this.displayedCommands.map((command) => this.getAuthors(command.id));
                const authorArrays = await Promise.all(authorPromises);
                this.authors = authorArrays;
                },
            async populateCategory() {
              const categoryPromise = this.displayedCommands.map((command) => this.getCategory(command.id));
              const categoryresolved = await Promise.all(categoryPromise);
              this.category = categoryresolved;
            },
                changePage(page) {
      // set the currentPage to the selected page number
      this.currentPage = page;
      this.populateAuthors();
      this.populateCategory();
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
    },
    },  
        mounted() { // загружаем данные пользователей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getCommands();
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>