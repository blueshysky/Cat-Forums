<template>
  <div class="header">
    <nav id="navigation">
      <ul class="pages" id="pages">
        <li><a href="/">Home</a></li>
        <li><a href="">About</a></li>
        <li id="login"><a href="/login">Login</a></li>
        <li id="signup"><a href="/signup">Sign Up</a></li>
      </ul>
    </nav>
    <h1 id="site-name">CAT OVERFLOW</h1>
  </div>
</template>

<script>
export default {
  methods: {cookieCheck: function() {
    var cookies = document.cookie.split(';');
    let itemsarr = cookies[0].split('=') 
    if (cookies[0] != "") {
      console.log("Welcome again " + cookies[0]);
  
      document.getElementById("login").style.visibility = "hidden";
      document.getElementById("signup").style.visibility = "hidden";

      var btn = document.createElement("BUTTON");
      btn.innerHTML = "Logout"; 
      btn.id = "logout"
      document.getElementById("pages").appendChild(btn).addEventListener("click", logout);
      if (itemsarr[0] == "admin") {
        console.log(cookies[0]);
        var adminBtn = document.createElement("BUTTON");
        adminBtn.innerHTML = "Admin"; 
        adminBtn.id = "admin"
        document.getElementById("pages").appendChild(adminBtn).addEventListener("click", admin);
      }
  }
    function logout() {
      console.log("logging out")
      document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.getElementById("login").style.visibility = "visible";
      document.getElementById("signup").style.visibility = "visible";
      document.getElementById("logout").style.visibility = "hidden";
      window.location = "/login"
    }
    function admin() {
      console.log("redirecting to admin page")
      window.location = "/admin"
    }
  }

  },
  mounted() {
    this.cookieCheck();
  },
  updated() {
    this.cookieCheck();
  }
}
</script>

<style lang="scss">
/* import font statement */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
/*-----Module/Modular & Base Styles (class or descendent selectors; elements)-----*/
.header {
  background-color: #1462E7;
  color: #FFFFFF;
  height: 22vh;
  margin-bottom: .25em; /* 72px / 16px = 4.5em */
}

/*-----Layout (id selectors)-----*/
#pages, .pages {
  a, #logout {
    background: #FFC253;
    border-color: #FFC253;
    border-radius: 0.7em;
    border-style: solid;
    color: #000000;
    display: block;
    margin-right: 1em; /* 16px = 1em */
    margin-top: 1em; /* 16px = 1em */
    padding: 0.625em; /* 10px / 16px = 0.625em */
    text-align: center;
    text-decoration: none;
    width: 6vw;
  }

  display: flex;
  flex-flow: row;
  justify-content: left;
}

#navigation {
  ul,
  ol {
    list-style-type: none;
  }
}

#site-name {
  font-family: 'Open Sans', serif;
  font-size: 4.5em; /* 72px / 16px = 4.5em */
  text-align: center;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
