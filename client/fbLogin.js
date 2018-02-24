function logOut(){
    FB.logout(response=>{
      localStorage.clear();
      document.getElementById('status').innerHTML = 'You have logged out';
      $('#logInPop').show()
      $('#logoutButton').hide()
    })
  }
  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log(response.status);
    if (response.status == 'connected') {
      $('#logInPop').hide()
      $('#logoutButton').show()
      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '131674560980349',
      cookie     : true,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });


    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', {fields : 'id,name,email,picture'},function(response) {
      console.log('Successful login for: ' + response.name);
        axios.post('http://localhost:3000/',{
          data:response,
          managerKey : $('#manager-key').val()
        })
        .then(response => {
          localStorage.setItem('tokenJwt',response.data.tokenJwt)
        })
        .catch(err=>{
          console.log(err);
        })
    });
  }
