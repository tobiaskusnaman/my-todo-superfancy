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

function findAlltodo() {
  axios.get('http://localhost:3000/todo/findAll')
  .then(function (response){
    console.log(response);
  })
  .catch(function(error){
    console.log(error);
  })
}

function findComplete() {
  axios.get('http://localhost:3000/todo/findComplete',{
    headers : {
      token : localStorage.getItem('tokenJwt')
    }
  })
  .then(response=>{
    console.log(response);
  })
  .catch(err=>{
    console.log(err);
  })
}

function findIncomplete() {
  axios.get('http://localhost:3000/todo/findComplete',{
    headers : {
      token : localStorage.getItem('tokenJwt')
    }
  })
  .then(response=>{
    console.log(response);
  })
  .catch(err=>{
    console.log(err);
  })
}
function findIncomplete() {
  axios.get('http://localhost:3000/todo/findIncomplete',{
    headers : {
      token : localStorage.getItem('tokenJwt')
    }
  })
  .then(response=>{
    console.log(response);
  })
  .catch(err=>{
    console.log(err);
  })
}

Vue.component('login-component', {
  template: '#login-template',
  methods : {
    getHomePage(){
      return console.log('--------');
      console.log('123');
    }
  }
})

Vue.component('home-component', {
  template : '#home-template',
  data: function () {
    return {
      todos: []
    }
  },
  methods : {
    create() {
      let self = this
      axios.post('http://localhost:3000/todo',{}, {
        headers : {
          token : localStorage.getItem('tokenJwt'),
          newToDo : document.getElementById('newToDo').value
        }
      })
      .then(function (response) {
        console.log(response);
        let result = response.data.data
        self.todos.push(result)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  created: function () {
    axios.get('http://localhost:3000/todo/findBy_userId',{
      headers : {
        token : localStorage.getItem('tokenJwt')
      }
    })
    .then(response => {
      this.todos = response.data.data
    })
    .catch(err => {
      console.log(err);
    })
  }
})

var app = new Vue({
  el: '#app',
  data: {
    loginPage   : true,
    homePage    : false
  },
  created: function () {
    let token = localStorage.getItem('tokenJwt')
    if (token) {
      this.loginPage = false,
      this.homePage = true
    }
  },
  methods: {

  }
})
