<template>
  <div class="container">
    <Homepage-Header />
    <SearchBar />
    <form
      action="#"
      method="post"
      id="form"
      @submit="checkForm"
    >
      <ol>
        <li>
          <input
            type="text"
            name="post-title"
            id="post-title"
            placeholder="Post Title Here"
            v-model="posttitle"
            v-on:keyup="checkPost()"
          />
        </li>
        <li>
          <textarea
            type="text"
            name="post-content"
            id="post-content"
            placeholder="Start Typing Here"
            v-model="postcontent"
            v-on:keyup="checkPost()"
          />
        </li>
        <li>
          <input
            type="file"
            id="post-media"
            @change="uploadFile($event.target.files)"
            hidden
            accept=".jpg,.jpeg,.gif,.png,.tif,.tiff"
          />
          <input
            type="text"
            id="uploadedFile"
            disabled
            hidden
            v-model="postimage"
            v-on:change="checkPost()"
          />
          <label id="media-btn" for="post-media">Upload Media</label>
        </li>
      </ol>
    </form>
    <button id="create-post" value="Post" disabled v-on:click="checkForm()">Post</button>
  </div>
</template>
 
<script>
import S3 from 'aws-s3'
const axios = require('axios')
export default {
  computed: {
    config() {
      return {
        bucketName: 'cat-overflow-team02r',
        region: 'us-east-2',
        accessKeyId: 'AKIAVBVSX4K3I5XLII4T',
        secretAccessKey: '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',
        s3Url: this.S3BaseURL,
      }
    },
    S3BaseURL() {
      return 'https://cat-overflow-team02r.s3.us-east-2.amazonaws.com/'
    },
    S3Client() {
      return new S3(this.config)
    },
    newFileName() {
      return Math.random().toString().slice(2)
    },
  },
  methods: {
    uploadFile(files) {
      if (files != null) {
        let file = files[0]

        console.log('file name', this.newFileName)
        this.S3Client.uploadFile(file, this.newFileName)
          .then((data) => console.log(data))
          .catch((err) => console.error(err))
        let fileExtension = file.type.split('/')[1]
        let fileLocation =
          this.S3BaseURL + this.newFileName + '.' + fileExtension
        document.getElementById('uploadedFile').value =
          'File uploaded to: ' + fileLocation
        document.getElementById('uploadedFile').hidden = false
        document.getElementById('media-btn').hidden = true
        this.postimage = fileLocation
        this.checkPost()
      }
    },
    checkPost() {
      if (
        document.getElementById('post-title').value != '' &&
        document.getElementById('post-content').value != '' &&
        document.getElementById('uploadedFile').value != ''
      )
        document.getElementById('create-post').disabled = false
      else document.getElementById('create-post').disabled = true
    },
    async checkForm() {
      var cookie = document.cookie.split('=')
      var user = cookie[1]
      let data = {
          posttitle: this.posttitle,
          postcontent: this.postcontent,
          username: user,
          postimage: this.postimage,
        }
      this.loading = true;
        try {
          await this.$axios.post("/post/newpost", data).then(function (response) {
            if (!response.data) {
              alert(
                'You are banned, and cannot post. You will now be logged out. Goodbye.'
              )
              document.cookie =
                'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
              document.cookie =
                'admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            }
            window.location = '/'
          })
          this.$router.push("/");
          this.loading = false;
          console.log("Post created.")
          await delay(2000)
          window.location = "/"
        } catch (error) {
          this.loading = false;
          console.log("Error", error)
        }
      /*axios
        .post('http://localhost:3001/api/post/newpost', {
          posttitle: this.posttitle,
          postcontent: this.postcontent,
          username: user,
          postimage: this.postimage,
        })
        .then(function (response) {
          if (!response.data) {
            alert(
              'You are banned, and cannot post. You will now be logged out. Goodbye.'
            )
            document.cookie =
              'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            document.cookie =
              'admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          }
          window.location = '/'
        })
      //alert('Post made it');*/
    },
  },
  data: {
    posttitle: '',
    postcontent: '',
    username: '',
    postimage: '',
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

#media-btn {
  margin-top: 1em; /* 16px = 1em */
  background-color: orange;
  padding: 0.5em;
  border-radius: 0.3em;
  cursor: pointer;
}

#post-title {
  margin-top: 1em; /* 16px = 1em */
  width: 60em;
  font-size: 14pt;
}

#uploadedFile {
  margin-top: 1em; /* 16px = 1em */
  width: 60em;
  font-size: 14pt;
}

#post-content {
  margin-top: 1em; /* 16px = 1em */
  margin-bottom: 1em; /* 16px = 1em */
  height: 15em;
  width: 75em;
}

#create-post {
  background: #ffa400;
  border-radius: 0.5em;
  border-style: solid;
  color: #000;
  cursor: pointer;
  padding: 1em 2.5em 1em 2.5em;
  float: right;
}

#create-post:disabled {
  background: lightgray;
  cursor: not-allowed;
}
</style>