<template>
  <v-container v-if="this.allCategories">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        label="Title"
        v-model="title"
        :rules="titleRules"
        required
      ></v-text-field>
      <v-text-field
        label="Synopsis"
        v-model="synopsis"
        :rules="synopsisRules"
        required
      ></v-text-field>
      <v-text-field
        label="Trailer Link"
        v-model="link"
        :rules="linkRules"
        required
      ></v-text-field>
      <v-text-field
        label="Image"
        v-model="image"
        :rules="imageRules"
        required
      ></v-text-field>
      <v-select
        label="Categories"
        v-bind:items="allCategories.map( a => a.category )"
        v-model="categories"
        multiple
        hint="Pick the categories"
        persistent-hint
        :rules="categoryRules"
        required
      ></v-select>
      <v-btn
        @click="submit"
        :disabled="!valid"
      >
        submit
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'New',
  props: [
    'allCategoriesReady'
  ],
  data () {
    return {
      valid: true,
      title: '',
      titleRules: [
        (v) => !!v || 'Title is required'
      ],
      synopsis: '',
      synopsisRules: [
        (v) => !!v || 'Synopsis is required'
      ],
      link: '',
      linkRules: [
        (v) => !!v || 'Link is required',
        (v) => /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/.test(v) || 'Not a valid YouTube link'
      ],
      image: '',
      imageRules: [
        (v) => !!v || 'Image is required',
        (v) => /(((https:\/\/)|(http:\/\/)|(www))[-a-zA-Z0-9@:%_+.~#?&/=,]+)\.(jpg|jpeg|gif|png|bmp|tiff|tga|svg)/.test(v) || 'Not a valid Image'
      ],
      categories: [],
      allCategories: null,
      categoryRules: [
        (v) => !!(v.length) || 'Category is required'
      ]

    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      window.scrollTo(0, 0)
      this.$emit('startLoading')
      let p1 = this.getData('')
      p1.then((value) => {
        value.json().then((json) => {
          this.allCategories = json
          this.$emit('stopLoading')
        })
      })
        .catch((err) => {
          this.err = err
        })
    },
    getData (str) {
      return fetch(this.$url2 + str, this.$urlSettings)
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.$emit('startLoading')
        let postData = {
          title: this.title,
          synopsis: this.synopsis,
          trailer: this.link,
          categories: this.allCategories.filter(category => this.categories.includes(category.category)),
          image: this.image
        }
        let headers = new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Content-Type', 'application/json')
        console.log(postData)
        console.log(headers)
        fetch('http://localhost:3000/new', {
          method: 'POST',
          body: JSON.stringify(postData),
          headers: headers
        })
          .then(() => {
            this.$emit('stopLoading')
            this.$router.push('/')
          })
          .catch((e) => {
            this.$emit('stopLoading')
            console.log(JSON.stringify(e))
            this.err = e.message
          })
      }
    }
  }
}
</script>

