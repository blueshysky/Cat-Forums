<template>
  <div class="container">
    <Header />
    <h1 class="section-title">Sign Up</h1>
    <form
      action="#"
      method="post"
      id="form"
      @submit="checkForm()"
    >
      <ol>
        <li>
          <label for="email">Email:</label>
          <input
            class="input-field"
            type="email"
            name="email"
            id="email"
            v-model="email"
          />
        </li>
        <li>
          <label for="username">Username:</label>
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
          <label for="conf-pass">Confirm Password:</label>
          <input
            type="password"
            name="conf-pass"
            id="conf-pass"
            v-model="confPass"
          />
        </li>
        <li>
          <input type="checkbox" id="agree" name="agree" value="agree" />
          <label id="agree-label" for="agree">
            <a href="">I agree to the Terms of Service and Privacy Policy</a>
          </label>
        </li>
      </ol>
    </form>
    <button id="sign-up" v-on:click="checkForm()">Sign Up</button>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  methods: {
    async checkForm() {
      if (document.getElementById('agree').checked) {
        let data = {
          email: this.email,
          username: this.username,
          password: this.password,
          confPass: this.confPass,
        }
        this.loading = true;
        try {
          await this.$axios.post("/user/signup", data).then(function (response) {
            if (response.data == "user") {
                console.log('redirecting to index')
                window.location = '/'

                document.cookie =
                  'username= ' + JSON.parse(response.config.data).username
                console.log(document.cookie)
              }
              else if (response.data == "admin") {
                window.location = '/admin'

                document.cookie =
                  'admin= ' + JSON.parse(response.config.data).username
              }
              else {
                alert("Invalid.. Please double check your input. If you already have an account, please Log In instead.")
                window.location = '/signup'
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
      }
      else {
        alert('You must agree to TOS')
      }
    },
    data: {
      email: '',
      username: '',
      password: '',
      confPass: '',
    },
  },
}
</script>

<style lang="scss">
/*-----Module/Modular & Base Styles (class or descendent selectors; elements)-----*/
.container {
  background-color: #deeaff;
  color: #000;
  font-size: 1.125em; /* 18px / 16px = 1.125em */
  font-family: 'Source Sans Pro', sans-serif;
  height: 100vh;
  line-height: 1.5em; /* 24px / 16px */
}

.section-title {
  background: #7ef3e3;
  font-family: 'Source Sans Pro', serif;
  font-size: 2em; /* 32px / 16px = 2em */
  margin-bottom: 1em; /* 16px = 1em */
  padding: 1em; /* 16px = 1em */
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 70vw;
}

/*-----Layout (id selectors)-----*/
#agree-label {
  font-size: 0.75em; /* 12px / 16px = 0.75em */
}

#button-item {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

#form {
  ol,
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  display: grid;
  place-items: center;
  text-align: left;
}

#sign-up {
  background: #000;
  border-style: solid;
  border-radius: 0.5em;
  color: #fff;
  cursor: pointer;
  padding: 1em 2.5em 1em 2.5em;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
