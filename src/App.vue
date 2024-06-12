<script>
import axios from 'axios'

export default {
  name: 'App',
  data(){
    return{
      base_api_url: 'http://127.0.0.1:8000', //creo una variabile con il link(base) della mia API in questo caso del l'api creata nell file(laravel-boolpress-live-73)
      photos_endpoint: '/api/photos', // creo variabile con il resto dell URL della api, 
      photos: ''
    }
  },

  mounted(){
    const url = this.base_api_url + this.photos_endpoint
      console.log(url);

      axios.get(url)
      .then(resp => {
      //console.log(resp); 
      this.photos = resp.data.results
      console.log(this.photos); //direttamente { >data {oggeti del'api}}
        })
      .catch(err => {
      console.error(err);
        })
  }
  
  }
</script>

<template>
  
</template>

<style scoped>

</style>
