<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex md4 v-for="x in movies">
          <Movie></Movie>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout justify-center>
        <v-flex>
          <v-card>
            <v-card-text>
              <v-pagination color="indigo" class="blue--text" v-bind:length.number="pageNumber" v-model="page"></v-pagination>
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
      url: 'http://localhost:3000/movies/',
      settings: {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      },
      loading: false,
      movies: null,
      page: parseInt(this.$route.params.id),
      pageNumber: 15
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
      this.movies = null
      this.loading = true
      let p1 = this.getData('pageNumber')
      let p2 = this.getData('page/' + this.$route.params.id)
      Promise.all([p1, p2])
      .then((values) => {
        values[0].json().then((json) => {
          this.pageNumber = Math.ceil(Object.values(json)[0] / 9)
        })
        values[1].json().then((json) => {
          this.movies = json
        })
      })
    },
    getData (str) {
      return fetch(this.url + str, this.settings)
    }
  }

}
</script>
