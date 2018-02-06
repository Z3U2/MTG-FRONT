<template>
  <v-container>
    <v-list v-if="resultList.length != 0" two-line>
      <template v-for="(result,index) in resultList"  >
        <v-list-tile :key="result.id" :to="{ name: 'movie', params: {id: result.id} }">
          <v-list-tile-avatar>
            <img :src="result.image"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-text="result.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index + 1 < resultList.length"></v-divider>
      </template>
    </v-list>
  </v-container>
</template>

<script>
    export default {
      name: 'Query',
      data () {
        return {
          resultList: []
        }
      },
      watch: {
        '$route': 'fetchData'
      },
      created () {
        this.fetchData()
      },
      methods: {
        fetchData () {
          if (this.$route.name === 'name') {
            this.getData('name=' + this.$route.params.name).then(values => {
              values.json().then(json => {
                this.resultList = json
              })
            })
          } else if (this.$route.name === 'category') {
            this.getData('category=' + this.$route.params.id).then(values => {
              values.json().then(json => {
                this.resultList = json
              })
            })
          }
        },
        getData (str) {
          return fetch(this.$url1 + 'search?' + str + '&all=1', this.$urlSettings)
        }
      }
    }
</script>

<style scoped>

</style>
