<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer
        id="v-navigation-drawer"
        fixed
        v-model="drawer"
        app
        disable-route-watcher
      >
        <v-list dense>
          <v-list-tile @click="" v-for="category in allCategories" :key="category.id" :to="{ name: 'category', params:{id: category.id} }">
            <v-list-tile-content>
              <v-list-tile-title >{{category.category}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    <v-toolbar id="v-toolbar" color="indigo"  dark fixed app>
      <v-toolbar-side-icon v-on:click.stop="draw"></v-toolbar-side-icon>
      <v-btn icon large @click="isSearching = true">
        <v-icon>search</v-icon>
      </v-btn>
      <router-link tag="v-toolbar-title" to="/"> <span id="title">Movie Trailer Gallery</span> </router-link>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-toolbar
      id="searchbar"
      color="indigo"
      dark
      fixed
      app
      :manual-scroll="!isSearching"
      ref="toolbar"
      flat>
      <v-btn icon dark large @click="isSearching = false">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-text-field
        autocomplete="off"
        placeholder="Search"
        prepend-icon="search"
        id="search"
        clearable
        single-line
        solo
        key="search"
        v-model="search"
        ref="search"
        light>

      </v-text-field>

    </v-toolbar>
    <v-content>
    <v-container v-if="loading">
      <Loading></Loading>
    </v-container>
    <v-container>
      <v-list  class="elevation-1" v-if="searchList.length != 0" two-line >
        <template v-for="(result,index) in searchList"  >
          <v-list-tile :key="result.id" :to="{ name: 'movie', params: {id: result.id} }" @click="clear">
            <v-list-tile-avatar>
              <img :src="result.image"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-text="result.name"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="index  < searchList.length"></v-divider>
        </template>
        <v-list-tile @click="clear" :to="{ name: 'name', params: {name: this.search} }" class="blue white--text">
          <v-list-tile-title >
            <div >
              <h3 style="text-align: center"> VIEW ALL</h3>
            </div>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-container>
    <router-view v-on:startLoading="loading=true" v-on:stopLoading="loading=false" >
    </router-view>
    </v-content>
    </v-app>
  </div>
</template>

<script>
import Loading from '@/components/Loading'

export default {
  name: 'app',
  components: {
    Loading
  },
  created () {
    this.fetchData()
  },
  data () {
    return {
      isSearching: false,
      search: '',
      drawer: false,
      loading: false,
      allCategories: null,
      searchList: []
    }
  },
  watch: {
    isSearching (val) {
      this.$refs.toolbar.isScolling = !val

      if (val) {
        this.$nextTick(() => {
          this.$refs.search.focus()
        })
      } else {
        this.search = null
      }
    },
    search (val) {
      if (!val) {
        this.searchList = []
      } else {
        this.query(val).then(value => {
          value.json().then(json => {
            this.searchList = json
          })
        })
      }
    }
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
    draw () {
      this.drawer = !this.drawer
    },
    query (str) {
      return fetch(this.$url1 + 'search?name=' + str, this.$urlSettings)
    },
    clear (event) {
      this.searchList = []
      this.isSearching = false
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #v-toolbar {
    margin-bottom: 20px;
    z-index: 20;
  }


  #title:hover{
    cursor: pointer;
  }

  #v-navigation-drawer{
    z-index: 21;
  }

  #searchbar {
    z-index: 20;
  }


</style>
