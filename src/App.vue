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

  methods: {
    showPhoto(url){ //questo metodo ci porta al url
      console.log(url); // controlliamo in console se quando facciamo click sulle pagine, ci manda al url di ogni pagina
      this.callApi(url)
    },

    callApi(url){
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
  },

  mounted(){
    const url = this.base_api_url + this.photos_endpoint
    console.log(url);
    this.callApi(url)
  }
  
  }
</script>

<template>
  <h1>Photos</h1>  

<section class="photos py-5" v-if="photos">

  <div class="container">

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      <div class="col" v-for="photo in photos.data">
        <div class="card">

          <div v-if="photo.upload_image"> <!--Se la immagine ce allora-->
              <img class="card-img-top" :src="photo.upload_image.startsWith('https://') ? photo.upload_image : base_api_url + '/storage/' + photo.upload_image" alt="">
          </div>

          <div v-else> <!--Se la immagine NON ce allora mi fa vedere un'aimmagine di Lorem Picsum-->
            <img class="card-img-top" src="https://picsum.photos/400/200" alt="" >
          </div>
          
          <div class="card-body">
            {{ photo.title }}
          </div>

          <div class="card-footer"> <!---Modal per visualizzazione di un singola photo-->
            <!-- Modal trigger button -->
            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" :data-bs-target="`#post-${photo.id}`">
              Vedi
            </button>
            
            <!-- Modal Body -->
            <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
            <div class="modal fade" :id="`post-${photo.id}`" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" :aria-labelledby="`modal-title-${photo.id}`" aria-hidden="true">

              <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl" role="document">
                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title" :id="`modal-title-${photo.id}`">
                      {{photo.title}}
                    </h5>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div class="modal-body">
                    {{photo.description}}

                    <div v-if="photo.upload_image"> <!--Se la immagine ce allora-->
                      <img class="img-fluid w-75" :src="photo.upload_image.startsWith('https://') ? photo.upload_image : base_api_url + '/storage/' + photo.upload_image" alt="">
                    </div>

                    <div v-else> <!--Se la immagine NON ce allora mi fa vedere un'immagine di Lorem Picsum-->
                      <img src="https://picsum.photos/400/200" alt="" >
                    </div>
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                      Chiudi
                    </button>

                    <button type="button" class="btn btn-primary">Salva</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <nav aria-label="Page navigation" class="mt-4">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled' : !link.url, 'active': link.active}" v-for="link in photos.links">
          <button class="page-link" :href="link.url" type="button" @click="showPhoto(link.url)"> <!--ci manda al url di ogni pagina-->
            <span v-html="link.label"></span>
          </button>
        </li>
      </ul>
    </nav>
    

  </div>
</section>
</template>

<style scoped>

</style>
