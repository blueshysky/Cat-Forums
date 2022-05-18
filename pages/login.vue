<template>
  <div class="container">
    <Header />
    <h1 class="section-title">Login</h1>
    <form
      action="#"
      method="post"
      id="form"
    >
      <ol>
        <li>
          <label for="username">Username or Email:</label>
          <input type="text" name="username" id="username" v-model="username" />
        </li>
        <li>
          <label for="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
          />
        </li>
        <li>
          <input type="checkbox" id="remember-me" v-model="checked" />
          <label id="remember-label" for="remember-me">Remember Me</label>
        </li>
      </ol>
    </form>
    <button id="sign-in" v-on:click="checkForm()">Sign In</button>
      <section class="log-options">
          <a href="./signup">Sign Up Instead</a>
      </section>
  </div>
</template>

<script>
const axios = require('axios')
const session = require('express-session')
export default {
  methods: {
    async checkForm() {
      console.log({ name: this.username, password: this.password })
      let data = {
        username: this.username,
        password: this.password
      }
      this.loading = true;
        try {
          await this.$axios.post("/user/login", data).then(function (response) {
            let stringarr = response.data.split(',')
            let condition = stringarr[0] //this should either be admin/true/false
            let u_name = stringarr[1] // this is the loggined in user name
            if (condition == 'admin') {
              // if the condition is "admin"
              if (document.getElementById('remember-me').checked) {
                var date = new Date()
                date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000)
                document.cookie =
                  'admin= ' + u_name + '; expires=' + date.toUTCString()
              } else {
                document.cookie = 'admin= ' + u_name
              }
              window.location = '/admin'
            } else if (condition == 'user') {
              // if the condition is a "user" a.k.a non admin
              if (document.getElementById('remember-me').checked) {
                var date = new Date()
                date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000)
                document.cookie =
                  'username= ' + u_name + '; expires=' + date.toUTCString()
              } else {
                document.cookie = 'username= ' + u_name
              }
              window.location = '/'
            } else if (condition == 'banned') {
              alert('You are banned, and cannot log in.') //if the condition of user is banned.
              window.location = '/login'
            } else {
              //wrong user name or password
              alert('Username or Password is incorrect. Please try again.')
              window.location = '/login'
            }
          });
          this.$router.push("/");
          this.loading = false;
          console.log("User created.")
          await delay(2000)
          window.location = "/"
        } catch (error) {
          this.loading = false;
          console.log("Error", error)
        }
    },
  },
  data: {
    username: '',
    password: '',
  },
}
</script>

<style lang="scss">
/*-----Module/Modular & Base Styles (class or descendent selectors; elements)-----*/
.container {
  background-color: #deeaff;
  color: #000;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.125em; /* 18px / 16px = 1.125em */
  height: 100vh;
  line-height: 1.5em; /* 24px / 16px */
}

.log-options {
  display: flex;
  flex-flow: row;
  font-size: 0.75em; /* 12px / 16px = 0.75em */
  justify-content: center;
}

.section-title {
  background: #7ef3e3;
  font-family: 'Source Sans Pro', serif;
  font-size: 2em; /* 32px / 16px = 2em */
  margin-bottom: 1em; /* 16px = 1em */
  margin-left: auto;
  margin-right: auto;
  padding: 1em; /* 16px = 1em */
  text-align: center;
  width: 70vw;
}

/*-----Layout (id selectors)-----*/
#form {
  ol,
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  display: grid;
  place-items: center;
  text-align: center;
}

#password,
#username {
  display: block;
}

#remember-label {
  font-size: 0.75em; /* 12px / 16px = 0.75em */
}

#sign-in {
  background: #000;
  border-radius: 0.5em;
  border-style: solid;
  color: #fff;
  cursor: pointer;
  padding: 1em 2.5em 1em 2.5em;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
