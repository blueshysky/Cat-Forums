<template>
  <div class="container">
    <section v-if="!isAdmin">
      <Homepage-Header />
      <SearchBar />
      <h1 class="section-title">401 Unauthorized</h1>
      <p>
        You are not an admin user. Please contact the site admin if you believe
        this to be an error. If you are the site admin, make yourself an admin.
        If you are already an admin, then we have a much bigger problem and it's
        time to cry out in frog emojis.
      </p>
    </section>
    <section v-if="isAdmin">
      <Admin-Header />
      <SearchBar />
      <h1 class="section-title">Flagged Posts</h1>
      <table>
        <tr v-for="(post, key) of posts" :key="key" v-if="post.flag == 1">
          <td>
            <a v-bind:href="'/post?p=' + post.post_id">{{ post.title }}</a>
          </td>
          <td>{{ post.content }}</td>
          <td><button v-on:click="unflag(post.post_id)">UNFLAG</button></td>
          <td><button v-on:click="delPost(post.post_id)">DELETE</button></td>
        </tr>
      </table>
      <h1 class="section-title">Users</h1>
      <tr v-for="(user, key) of users" :key="key">
        <td>{{ user.user_id }}</td>
        <td>{{ user.u_name }}</td>
        <td v-if="user.is_admin == 0">
          <button v-on:click="banUser(user.user_id)">BAN</button>
        </td>
        <td v-if="user.is_admin == 1">An admin user cannot be banned.</td>
        <td v-if="user.is_admin == 2">
          <button v-on:click="unBanUser(user.user_id)">UNBAN</button>
        </td>
        <td v-if="user.is_admin == 0">
          <button v-on:click="makeAdmin(user.user_id)">MAKE ADMIN</button>
        </td>
      </tr>
    </section>
  </div>
</template>

<script>
const axios = require('axios')
const delay = (ms) => new Promise((res) => setTimeout(res, ms))
export default {
  data() {
    return {
      posts: [],
      isAdmin: false,
      users: [],
    }
  },
  async asyncData({ $axios }) {
      let post = await $axios.get("/post");
      let user = await $axios.get("/user");
      return {
        posts: post.data,
        users: user.data
      }
    },
  methods: {
    cookieCheck: function () {
      var cookies = document.cookie.split(';')
      console.log(cookies[0])
      if (cookies[0].substring(0, 5) == 'admin') {
        this.isAdmin = true
      }
    },
    async banUser(uid) {
      this.loading = true;
      try {
        await this.$axios.post("/user/banuser", { userId: uid });
        this.$router.push("/admin");
        this.loading = false;
        console.log("User banned!")
        await delay(2000)
        window.location = '/admin'
      } catch (error) {
        this.loading = false;
        console.error("Error", error)
      }
    },
    async unBanUser(uid) {
      this.loading = true;
      try {
        await this.$axios.post("/user/unbanuser", { userId: uid });
        this.$router.push("/admin");
        this.loading = false;
        console.log("User unbanned!")
        await delay(2000)
        window.location = '/admin'
      } catch (error) {
        this.loading = false;
        console.error("Error", error)
      }
    },
    async makeAdmin(uid) {
      this.loading = true;
      try {
        await this.$axios.post("/user/makeadmin", { userId: uid });
        this.$router.push("/admin");
        this.loading = false;
        console.log("User is now an admin!")
        await delay(2000)
        window.location = '/admin'
      } catch (error) {
        this.loading = false;
        console.error("Error", error)
      }
    },
    async unflag(pid) {
      this.loading = true;
      try {
        await this.$axios.post("/post/unflagpost", { postId: pid });
        this.$router.push("/admin");
        this.loading = false;
        console.log("Post is no longer flagged.")
        await delay(2000)
        window.location = '/admin'
      } catch (error) {
        this.loading = false;
        console.error("Error", error)
      }
    },
    async delPost(pid) {
      this.loading = true;
      try {
        await this.$axios.post("/post/delpost", { postId: pid });
        this.$router.push("/admin");
        this.loading = false;
        console.log("Post deleted.")
        await delay(2000)
        window.location = '/admin'
      } catch (error) {
        this.loading = false;
        console.error("Error", error)
      }
    },
  },
  mounted: function () {
    this.cookieCheck()
  },
}
</script>

<style lang="scss">
.container {
  background-color: #deeaff;
  color: #000;
  font-size: 1.125em; /* 18px / 16px = 1.125em */
  font-family: 'Source Sans Pro', sans-serif;
  line-height: 1.5em; /* 24px / 16px */
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

#form {
  ol,
  ul {
    list-style-type: none;
  }

  display: grid;
  place-items: center;
  text-align: center;
}

#search {
  background: #000;
  color: #fff;
  cursor: pointer;
  border-style: solid;
  border-radius: 0.5em;
  padding: 1em 2.5em 1em 2.5em;
}

#query {
  background: #000;
  color: #fff;
  cursor: pointer;
  border-style: solid;
  border-radius: 0.5em;
  padding: 1em 2.5em 1em 2.5em;
}

#post-title {
  background: #000;
  color: #fff;
  cursor: pointer;
  border-style: solid;
  border-radius: 0.5em;
  padding: 1em 2.5em 1em 2.5em;
}

#post-preview {
  background: #000;
  color: #fff;
  cursor: pointer;
  border-style: solid;
  border-radius: 0.5em;
  padding: 1em 2.5em 1em 2.5em;
}
</style>