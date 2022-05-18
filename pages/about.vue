<template>
  <div class="container">
    <Homepage-Header />
    <h1 class="section-title">About</h1>
    <ol class="main-list">
      <li class="about">
        <figure>
          <img class="post-image" src="#null" alt="Post Image." />
          <figcaption>
            <h3 class="post-title">Who We Are</h3>
            <ul class="post-preview">
              <li>Cat Overflow is a Stack Overflow inspired website that and will allow users to post
                cat pictures so that other individuals can help identify what type of cat is in the image.
              </li>
            </ul>
          </figcaption>
        </figure>
      </li>
    </ol>
  </div>
</template>

<script>
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
  li {
    padding-right: 1em;
  }

  display: flex;
  flex-flow: row;
  font-size: 0.75em; /* 12px / 16px = 0.75em */
  justify-content: space-between;
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
}
</style>
