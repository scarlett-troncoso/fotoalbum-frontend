<script>
import axios from 'axios';
//import ModalView from './components/ModalView.vue'

export default {
  name: 'AppMain.vue',

  components: {
    //ModalView,
  },

  data(){
    return{
      base_api_url: 'http://127.0.0.1:8000', //creo una variabile con il link(base) della mia API in questo caso del l'api creata nell file(laravel-boolpress-live-73)
      photos_endpoint: '/api/photos', // URL api photos,
      categories_endpoint: '/api/categories', // URL api categories,
      photos: '',
      categories: '',
      filter_value: ''
    }
  },

  methods: {
    goPage(url){ //questo metodo ci porta al url
      console.log(url); //click -> url di ogni pagina
      this.callApiPhotos(url)
    },

    callApiPhotos(url){
      axios.get(url)
      .then(resp => {
      //console.log(resp); 
      this.photos = resp.data.results
      console.log(this.photos); //direttamente { >data {oggeti del'api}}
        })
      .catch(err => {
      console.error(err);
        })
    },

    callApiCategories(url){
      axios.get(url)
      .then(resp => {
      //console.log(resp); 
      this.categories = resp.data
      console.log(this.categories);
        })
      .catch(err => {
      console.error(err);
        })
    },

    filter(){
      //console.log('FUNZIONA BUTTON');
      // console.log(this.filter_value);
      const url_filter = this.base_api_url + this.photos_endpoint + `?filter=${this.filter_value}`
      console.log(url_filter); //http://127.0.0.1:8000/api/photos?filter=3
      this.callApiPhotos(url_filter)
    }
  },

  mounted(){
    // url photos
    const url_photos = this.base_api_url + this.photos_endpoint
    console.log(url_photos);

    // url categories
    const url_categories = this.base_api_url + this.categories_endpoint
    console.log(url_categories);

    // calls api
    this.callApiPhotos(url_photos); // chiamata api photos
    this.callApiCategories(url_categories)
  }
  
  }
</script>

<template>
    <section class="filters py-5">
        <div class="input-group"> <!--   @keyup.enter="filter()"-->
            <select class="form-select" name="filter_category" id="filter_category" v-model="filter_value"> <!--id="inputGroupSelect04" aria-label="Example select with button addon"--->
            <option value="" selected disabled>Filtra Per...</option>
            <option :value="category.id" v-for="category in categories"> {{category.name}} </option>
            </select>
            <button class="btn btn-outline-secondary" type="button" @click="filter()">
            Filtra
            </button>
        </div>
    </section>
  

    <section class="photos py-5" v-if="photos">

        <div class="container">

            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                <div class="col" v-for="photo in photos.data">
                    <div class="card">

                        <div class="cont-img card-img-top" type="button" data-bs-toggle="modal" :data-bs-target="`#photo-${photo.id}`">
                            <div v-if="photo.upload_image"> <!--Se la immagine ce allora-->
                                <img class="card-img-top" :src="photo.upload_image.startsWith('https://') ? photo.upload_image : base_api_url + '/storage/' + photo.upload_image" alt="">
                            </div>

                            <div v-else> <!--Se la immagine NON ce allora mi fa vedere un'aimmagine di Lorem Picsum-->
                                <img class="card-img-top" src="https://picsum.photos/400/200" alt="" >
                            </div>
                        </div>
                        
                        <div class="card-body card-foto-body">
                            <div >
                                <div class="info-card">
                                    <h5>{{ photo.title }}</h5>
                                    <div class="d-flex justify-content-between">
                                        <span class="badge text-bg-secondary">{{ photo.category ? photo.category.name : 'Senza Categoria' }}</span>
                                        <div class="evidence d-flex align-items-end" v-if="photo.in_evidence">
                                            <i class="fa-solid fa-circle-check symbol_check"></i>
                                            <span class="ev_text">In evidenza</span> 
                                        </div>
                                        <div class="btn-modal">
                                            <!-- Modal trigger button -->
                                            <button type="button" class="btn btn-sm" data-bs-toggle="modal" :data-bs-target="`#photo-${photo.id}`">
                                                <i class="fa-solid fa-eye"></i> <!--Vedi Foto-->
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        

                        <div class=""> <!---Modal per visualizzazione di un singola photo-->
                            <!--<ModalView :photo="photo" v-for="photo in photos.data"></ModalView>-->
                            <!-- Modal Body -->
                            <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
                            <div class="modal fade" :id="`photo-${photo.id}`" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" :aria-labelledby="`modal-title-${photo.id}`" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl" role="document">
                                    <div class="modal-content">

                                        <div class="modal-header">
                                            <h5 class="modal-title" :id="`modal-title-${photo.id}`">
                                                {{photo.title}}
                                            </h5>

                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>

                                        <div class="modal-body d-flex">
                                            <div>
                                                <div v-if="photo.upload_image"> <!--Se la immagine ce allora-->
                                                <img class="img-fluid w-100" :src="photo.upload_image.startsWith('https://') ? photo.upload_image : base_api_url + '/storage/' + photo.upload_image" alt="">
                                                </div>

                                                <div v-else> <!--Se la immagine NON ce allora mi fa vedere un'immagine di Lorem Picsum-->
                                                <img src="https://picsum.photos/400/200" alt="" >
                                                </div>
                                            </div>
                        
                                            <div>
                                                <p>{{photo.description}}</p>
                                        
                                                <div>
                                                    Categoria: {{ photo.category ? photo.category.name : 'Senza Categoria' }}
                                                </div>

                                                <div class="in_evidence" v-if="photo.in_evidence">
                                                    <i class="fa-solid fa-circle-check"></i> Foto in evidenza
                                                </div>

                                                <div>
                                                    <i class="fa-solid fa-user"></i> <span> {{ photo.user? photo.user.name : '' }} </span>  
                                                </div>
                                            </div>
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
                    <button class="page-link" :href="link.url" type="button" @click="goPage(link.url)"> <!--ci manda al url di ogni pagina-->
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
