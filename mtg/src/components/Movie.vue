<template>
  <v-container>
  <v-layout>
  <v-flex >
    <v-card hover>
      <v-card-media :src="movie.image" height="500px" >

      </v-card-media>
      <v-card-title primary-title>
        <v-btn
          absolute
          dark
          fab
          bottom
          right
          color="blue"
          class="indigo--text"
          :to="'/movie/'+movie.id"
        >
          <v-icon>play_arrow</v-icon>
        </v-btn>
        <div style="margin: auto">
          <h3 class="headline mb-0">{{movie.name}}</h3>
          <p>{{movie.synopsis}}</p>
        </div>
      </v-card-title>

    </v-card>
  </v-flex>
</v-layout>
</v-container>

</template>

<script>
export default {
  name: 'Movie',
  props: [
    'movie'
  ],
  data () {
    return {}
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

img {
  width: 100%
}
</style>
