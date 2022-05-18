<template>
  <div class="header">
    <nav id="navigation">
      <ul class="pages">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
    <h1 id="site-name">CAT OVERFLOW</h1>
  </div>
</template>

<style lang="scss">
/* import font statement */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

/*-----Module/Modular & Base Styles (class or descendent selectors; elements)-----*/
ul a:hover {
  background-color: pink;
  border-color: pink;
  color: #FFFFFF;
}
.header {
  background-color: #ff6a00;
  height: 22vh;
  margin-bottom: 2em; /* 32px / 16px = 2em */
}

.pages {
  a {
    background: #FFC253;
    border-color: #FFC253;
    border-radius: 0.7em;
    border-style: solid;
    color: #000000;
    display: block;
    margin-top: 1em; /* 16px = 1em */
    margin-right: 1em; /* 16px = 1em */
    padding: 0.625em; /* 10px / 16px = 0.625em */
    text-align: center;
    text-decoration: none;
    width: 8vw;
  }

  display: flex;
  flex-flow: row;
  justify-content: right;
}

/*-----Layout (id selectors)-----*/
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
