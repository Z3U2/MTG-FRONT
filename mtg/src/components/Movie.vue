<template>
  <v-container>
  <v-layout>
  <v-flex >
    <v-card>
      <v-card-media src="https://i.pinimg.com/736x/61/1c/60/611c608f777a4891cada23ef36572b6b--batman-vs-superman--batman-vs-superman-trailer.jpg" height="500px" >

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
        >
          <v-icon>play_arrow</v-icon>
        </v-btn>
        <div>
          <h3 class="headline mb-0">{{title}}</h3>
          <div>{{synopsis}}</div>
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
  data () {
    return {
      title: 'Batman vs Superman',
      synopsis: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do olore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea .'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


img {
  width: 100%
}
</style>
