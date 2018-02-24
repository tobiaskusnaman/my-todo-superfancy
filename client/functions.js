document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }
});

Vue.component('login-component', {
  template: '#login-template'
  // created: function () {
  //   console.log('ANAK');
  //   let token = localStorage.getItem('tokenJwt')
  //   console.log(token);
  //   if (token) {
  //     console.log('ankanak');
  //     this.loginPage = true
  //   }
  // }
})

Vue.component('home-component', {
  template : '#home-template',
  data: function () {
    return {
      buckets : [],
      user : '',
      quotes : '',
      todos: [],
      todoName : '',
      todoId : '',
      styleToDo : {
        'text-decoration':'line-through'
      }
    }
  },
  methods : {
    logOut () {
      localStorage.clear();
      console.log('ini log out');
    },
    getQuotes(){
      let self = this
      axios.get('http://localhost:3000/quotes',{})
      .then(function (response) {
        self.quotes = response.data.data.text
      })
      .catch(err => {
        res.send(err)
      })
    },
    getInfo(){
      let self = this
      axios.post('http://localhost:3000/users',{},{
        headers : {
          token : localStorage.getItem('tokenJwt')
        }
      })
      .then(response => {
        self.buckets = response.data.data.bucket
        self.user = response.data.data
      })
      .catch(err => {
        console.log(err);
      })
    },
    create() {
      let self = this
      axios.post('http://localhost:3000/todo',{}, {
        headers : {
          token : localStorage.getItem('tokenJwt'),
          newToDo : this.todoName
        }
      })
      .then(function (response) {
        let result = response.data.data
        self.todos.push(result)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    deleteToDo(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this to do",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your to do has been deleted!", {
            icon: "success",
          });
          let self = this
          let indexDeletedToDo = self.todos.findIndex(todo => {
              return todo._id == id
          })
          self.todos.splice(indexDeletedToDo,1)
          axios.delete('http://localhost:3000/todo',{
            headers : {
              token : localStorage.getItem('tokenJwt'),
              todoId : id
            }
          })
          .then(response => {
            console.log(response);
          })
          .catch(err => {
            console.log(err);
          })
        } else {
          swal("Your to do is safe!");
        }
      });
    },
    complete(id){
      let self = this
      let indexCompletedToDo = self.todos.findIndex(todo => {
        return todo._id == id
      })
      self.todos[indexCompletedToDo].status = !self.todos[indexCompletedToDo].status
      if (self.todos[indexCompletedToDo].status) {
        axios.get('http://localhost:3000/todo/complete',{
          headers : {
            token : localStorage.getItem('tokenJwt'),
            todoId : id
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        axios.get('http://localhost:3000/todo/incomplete',{
          headers : {
            token : localStorage.getItem('tokenJwt'),
            todoId : id
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        })
      }

    },
    getModalEdit(id){
      let self = this
      document.getElementById('modalEdit').classList.add('is-active')
      let editedToDo = self.todos.find(todo => {
        return todo._id == id
      })
      this.todoName = editedToDo.name
      this.todoId = editedToDo._id
    },
    closeModalToDo(){
      document.getElementById('modalEdit').classList.remove('is-active')
    },
    editToDo(){
      this.closeModalToDo()
      let self = this
      let indexEditToDo = self.todos.findIndex(todo => {
        return todo._id == this.todoId
      })
      self.todos[indexEditToDo].name = this.todoName
      axios.put('http://localhost:3000/todo/', {}, {
        headers : {
          token : localStorage.getItem('tokenJwt'),
          id : self.todoId,
          name : self.todoName
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
    },
    submitToDo(todo){
      this.deleteAfterSubmit(todo._id)
      let self = this
      this.buckets.push(todo.name)
      console.log('INI TODO NAME', todo.name);
      axios.post('http://localhost:3000/users/bucket',{}, {
        headers : {
          token : localStorage.getItem('tokenJwt'),
          itemName : todo.name
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
    },
    deleteAfterSubmit(id){
      swal("Good job!", "You did it!", "success", {
        button: "Aww yeaa!",
      });
      let self= this
      let indexDeletedToDo = self.todos.findIndex(todo => {
          return todo._id == id
      })
      self.todos.splice(indexDeletedToDo,1)
      axios.delete('http://localhost:3000/todo',{
        headers : {
          token : localStorage.getItem('tokenJwt'),
          todoId : id
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  created: function () {
    axios.get('http://localhost:3000/todo/findBy_userId',{
      headers : {
        token : localStorage.getItem('tokenJwt')
      }
    })
    .then(response => {
      this.getInfo()
      this.getQuotes()
      this.todos = response.data.data
    })
    .catch(err => {
      console.log(err);
    })
  }
})

var app = new Vue({
  el: '#app',
  data: function () {
    return {
      isLogin   : false
    }
  },
  created: function () {
    let token = localStorage.getItem('tokenJwt')
    if (token) {
      this.isLogin = true
    }
  },
  methods: {

  }
})
