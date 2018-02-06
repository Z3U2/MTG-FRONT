<template>
  <div>

    <v-container v-if="this.movies">
      <v-layout row wrap>
        <v-flex md4 sm6 xs12 v-for="movie in movies" :key="movie.id">
          <router-link tag="div" :to="{ name: 'movie', params: {id: movie.id} }">
          <Movie v-bind:movie="movie"></Movie>
          </router-link>
        </v-flex>
      </v-layout>
      <v-btn fixed
             dark
             fab
             bottom
             right
             color="teal"
             class="white--text elevation-5"
             to="/new"
             >
        <v-icon>add</v-icon>
      </v-btn>
    </v-container>
    <v-container>
      <v-layout justify-center>
        <v-flex>
          <v-card>
            <v-card-text>
              <v-pagination color="indigo" class="pink--text" v-bind:length.number="pageNumber" v-model="page" ></v-pagination>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Movie from '@/components/Movie'

export default {
  name: 'Home',
  components: {
    Movie
  },
  data () {
    return {
      movies: null,
      page: parseInt(this.$route.params.id),
      pageNumber: 15,
      err: null
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData',
    'page': 'goTo'
  },
  methods: {
    fetchData () {
      window.scrollTo(0, 0)
      this.$emit('startLoading')
      let p1 = this.getData('pageNumber')
      let p2 = this.getData('page/' + this.$route.params.id)
      Promise.all([p1, p2])
      .then((values) => {
        values[0].json().then((json) => {
          this.pageNumber = Math.ceil(Object.values(json)[0] / 9)
        })
        values[1].json().then((json) => {
          this.movies = json
          this.$emit('stopLoading')
        })
      })
      .catch((err) => {
        this.err = err
      })
    },
    getData (str) {
      return fetch(this.$url1 + str, this.$urlSettings)
    },
    goTo () {
      this.$router.push({
        name: 'page',
        params: {
          id: this.page
        }
      })
    }
  }

}
</script>
