<template>
  <v-container v-if="movie">
  <v-layout row wrap>
  <v-flex lg4 md12 >
    <v-container>
    <v-card color="blue-grey darken-2">
      <v-card-media :src="movie.image" height="500px" contain>

      </v-card-media>

    </v-card>
  </v-container>
  </v-flex>
  <v-flex lg8 md12>

    <div class="mydiv">



    <v-card height="100%" >

      <v-card-title primary-title>
        <v-btn
          absolute
          dark
          fab
          top
          right
          color="blue"
          class="indigo--text"
          v-on:click="$router.push('/')"
        >
        <v-icon>close</v-icon>
      </v-btn>
        <h1 style="margin:auto">{{movie.name}}</h1>

      </v-card-title>
      <v-card-text>
        {{movie.synopsis}}
      </v-card-text>

      <v-card-text style="height:360px">
        <iframe class="myPad"
        :src="movie.trailer">
        </iframe>
      </v-card-text>
    </v-card>
  </div>
  </v-flex>
</v-layout>
</v-container>

</template>

<script>
export default {
  name: 'MovieDetail',
  data () {
    return {
      settings: {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      },
      movie: null
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      window.scrollTo(0, 0)
      this.$emit('startLoading')
      let p1 = this.getData(this.$route.params.id)
      p1.then((value) => {
        value.json().then((json) => {
          this.movie = json
          this.$emit('stopLoading')
        })
      })
      .catch((err) => {
        this.err = err
      })
    },
    getData (str) {
      return fetch(this.$url1 + str, this.$urlSettings)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


img {
  width: 100%
}

.mydiv {
    padding: 16px;
    height: 100%;
}
.myPad {
  height: 100%;
  width : 640px;
  max-width: 100%;

}

</style>
