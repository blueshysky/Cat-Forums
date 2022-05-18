<template>
  <div class="container">
    <Homepage-Header />
    <SearchBar />
    <div id="new-post"></div>
    <h1 class="section-title">Recent Posts</h1>
    <table>
      <tr v-for="(post, key) of posts" :key="key">
        <td><a v-bind:href='"/post?p=" + post.post_id' >{{ post.title }}</a></td>
        <td>{{ post.content }}</td>
        <td><img v-bind:src="post.image" /></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
      return {
        posts: []
      }
    },
    async asyncData({ $axios }) {
      let data = await $axios.get("/post");
      return { posts: data.data }
    },
  methods: {
    cookieCheck: function() {
      var cookies = document.cookie.split(';');
      console.log(cookies[0]);
      if (cookies[0] != "") {
        console.log("Welcome again " + cookies[0]);

        var btn = document.createElement("BUTTON");
        btn.innerHTML = "New Post"; 
        btn.id = "newpost"
        document.getElementById("new-post").appendChild(btn).addEventListener("click", newPost);
      } 
      function newPost() {
        window.location = "/newpost"
      }
    },
    reversePosts: function () {
      this.posts = this.posts.reverse()
    }
  },
  mounted: function() {
    this.cookieCheck()
    this.reversePosts()
  }
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

#new-post {
  background: #deeaff;
  color: #fff;
  cursor: pointer;
  padding: 1em 2.5em 1em 2.5em;
}

#newpost {
  background: #FFA400;
  border-radius: 0.5em;
  border-style: solid;
  color: #000;
  cursor: pointer;
  padding: 1em 2.5em 1em 2.5em;
  float: right
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
