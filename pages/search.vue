<template>
  <div class="container">
    <Homepage-Header />
    <SearchBar />
    <div id="new-post"></div>
    <h1 class="section-title">Possible Results..</h1>
    <table>
      <tr v-for="(post, key) of posts" :key="key">
        <section v-if="searchData(post.title.toLowerCase(), post.content.toLowerCase())" >
          <td>
            <a v-bind:href="'/post?p=' + post.post_id">{{ post.title }}</a>
          </td>
          <td>{{ post.content }}</td>
          <td><img v-bind:src="post.image" /></td>
        </section>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      query: []
    }
  },
  async asyncData({ $axios }) {
      let data = await $axios.get("/post");
      return { posts: data.data }
    },
  async fetch() {
    this.query = this.$route.query.q
    this.query = this.$route.query.q.trim().split(" ")
    this.posts = this.posts.reverse()
    console.log(this.query)
  },
  methods: {
    searchData(title, content) {
      var results = false;
      this.query.forEach(function checkContent(q) {
        var q = q.toString().toLowerCase()
        console.log(content.includes(q.toLowerCase()))
        if (title.includes(q.toLowerCase()))
          results = true;
        if (content.includes(q.toLowerCase()))
          results = true
      })

      return results
    }
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
