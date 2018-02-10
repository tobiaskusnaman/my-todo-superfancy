function create() {
  axios.post('http://localhost:3000/todo',{}, {
    headers : {
      token : localStorage.getItem('tokenJwt')
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

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
