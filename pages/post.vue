<template>
  <div class="container">
    <Homepage-Header />
    <button v-if="isLoggedIn" v-on:click="flag()">Flag Post</button>
    <button v-if="isAdmin" v-on:click="delPost(postId)">Delete Post</button>
    <section
      v-for="(post, key) of posts"
      :key="key"
      v-if="post.post_id == postId"
    >
      <section
        v-for="(user, key) of users"
        :key="key"
        v-if="post.userCredentialUserId == user.user_id"
      >
        <h1>{{ post.title }}</h1>
        <h2>{{ user.u_name }}</h2>
        <p>{{ post.content }}</p>
        <img v-bind:src="post.image" />
        <section
          v-for="(comment, key) of comments"
          :key="key"
          v-if="comment.postPostId == postId"
        >
          <section
            v-for="(user, key) of users"
            :key="key"
            v-if="comment.userCredentialUserId == user.user_id"
          >
            <p>{{ user.u_name }}</p>
            <p>{{ comment.com_content }}</p>
          </section>
        </section>
      </section>
    </section>
    <section v-if="isLoggedIn">
      <form action="" method="post" id="form" @submit="checkForm">
        <ol>
          <li>
            <textarea
              type="text"
              name="comment"
              id="comment"
              placeholder="Post Comment Here"
              v-model="comment"
            />
          </li>
        </ol>
      </form>
      <button id="create-comment" v-on:click="checkForm()">Comment</button>
    </section>
  </div>
</template>

<script>
const axios = require('axios')
const delay = (ms) => new Promise((res) => setTimeout(res, ms))
export default {
  methods: {
    async checkForm() {
      var cookie = document.cookie.split('=')
      var user = cookie[1]
      var args = {
        comment: this.comment,
        postID: this.postId,
        username: user,
      }
      this.loading = true;
      try {
        await this.$axios.post("/comment/newcomment", args);
        this.$router.push("/post?p=" + this.postId);
        this.loading = false;
        await delay(2000)
        window.location = "/post?p=" + this.postId
      } catch (error) {
        this.loading = false;
        console.log("Error", error)
      }
    },
    cookieCheck: function () {
      var cookies = document.cookie.split(';')
      console.log(cookies[0])
      if (cookies[0] != '') {
        this.isLoggedIn = true
        if (cookies[0].substring(0, 5) == 'admin') {
          this.isAdmin = true
        }
      }
    },
    async flag() {
      this.loading = true;
      try {
        await this.$axios.post("/post/flagpost", { postId: this.postId });
        alert("Post flagged, we will review it shortly. Thank you.")
        this.$router.push("/");
        this.loading = false;
        console.log("Post is flagged.")
        await delay(2000)
        window.location = '/'
      } catch (error) {
        this.loading = false;
        console.error("Error", error)
      }
    },
    async delPost(pid) {
      this.loading = true;
      try {
        await this.$axios.post("/post/delpost", { postId: pid });
        this.$router.push("/");
        this.loading = false;
        console.log("Post deleted.")
        await delay(2000)
        window.location = '/'
      } catch (error) {
        this.loading = false;
        console.error("Error", error)
      }
    },
    data: {
      comment: '',
      postID: '',
      username: '',
    },
  },
  data() {
    return {
      posts: [],
      postId: this.postId,
      comments: [],
      users: [],
      isLoggedIn: false,
      isAdmin: false,
    }
  },
  async asyncData({ $axios }) {
      let post = await $axios.get("/post");
      let comment = await $axios.get("/comment");
      let user = await $axios.get("/user");
      return {
        posts: post.data,
        comments: comment.data,
        users: user.data
      }
    },
  async fetch() {
    this.postId = this.$route.query.p
    console.log(this.postId)
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
  line-height: 1.5em; /* 24px / 16x = 1.5em */
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

#new-post {
  background: #deeaff;
  color: #fff;
  cursor: pointer;
  padding: 1em 2.5em 1em 2.5em;
}

#newpost {
  background: #ffa400;
  border-radius: 0.5em;
  border-style: solid;
  color: #000;
  cursor: pointer;
  padding: 1em 2.5em 1em 2.5em;
  float: right;
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
