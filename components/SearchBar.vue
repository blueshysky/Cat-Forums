<template>
  <div class="container">
    <form action="/search" method="get" id="form">
      <ol>
        <li>
          <input type="search" name="q" id="query" placeholder="Search.." />
          <button type="submit" id="search" v-on:submit="runSearch()">Search</button>
        </li>
      </ol>
    </form>
  </div>
</template>

<script>
export default {
  data: {
    query: ""
  },
  methods: {
    runSearch() {
      setQuery()
      window.location = "/search?q=" + this.query
    },
    setQuery() {
      this.query = document.getElementById("query").value
    }
  }
}
</script>


<style lang="scss">
#form {
  ol,
  ul {
    list-style-type: none;
  }

  background: #89B1F4;
  display: grid;
  padding: .5em 0 .5em 0;
  place-items: center;
  text-align: center;
}

#search {
  background: #FFFFFF;
  border-style: solid;
  border-radius: 0.5em;
  color: #000000;
  cursor: pointer;
  padding: 1em 2.5em 1em 2.5em;
}

#query {
  background: #FFFFFF;
  border-style: solid;
  border-radius: 0.5em;
  color: #000000;
  cursor: pointer;
  padding: 1em 2.5em 1em 2.5em;
  width: 30vw;
}
</style>
