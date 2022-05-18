<template>
  <div class="header">
    <nav id="navigation">
      <ul id="site-pages">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
      <ul id="auth-pages">
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
    console.log(cookies[0]);
    if (cookies[0] != "") {
      console.log("Welcome again " + cookies[0]);
  
      document.getElementById("login").style.visibility = "hidden";
      document.getElementById("signup").style.visibility = "hidden";

      var btn = document.createElement("BUTTON");
      btn.innerHTML = "Logout"; 
      btn.id = "logout"
      document.getElementById("auth-pages").appendChild(btn).addEventListener("click", logout);
      if (cookies[0] == "admin=admin") {
        console.log(cookies[0]);
        var adminBtn = document.createElement("BUTTON");
        adminBtn.innerHTML = "Admin"; 
        adminBtn.id = "admin"
        document.getElementById("auth-pages").appendChild(adminBtn).addEventListener("click", admin);
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
ul a:hover, 
#logout:hover, #admin:hover {
  background-color: pink;
  border-color: pink;
  color: #FFFFFF;
  cursor: pointer;
}

.header {
  background-color: #ff6a00;
  height: 22vh;
}

/*-----Layout (id selectors)-----*/
#site-pages,
#auth-pages {
  display: flex;
  flex-flow: row;
  justify-content: left;
}

ul a,
#logout, #admin {
  background: #ffc253;
  border-color: #ffc253;
  border-radius: 0.7em;
  border-style: solid;
  color: inherit;
  display: block;
  margin-right: 1em; /* 16px = 1em */
  margin-top: 1em; /* 16px = 1em */
  padding: 0.625em; /* 10px / 16px = 0.625em */
  text-align: center;
  text-decoration: none;
  width: 8vw;
}

#navigation {
  display: flex;
  justify-content: space-between;

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
