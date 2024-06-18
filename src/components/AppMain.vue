<script>
//import axios from 'axios';
import { store } from '../store';
//import ModalView from './ModalView.vue';
import CardPhoto from './CardPhoto.vue';
import FiltersButtons from './FiltersButtons.vue';
import LoadingIcon from './LoadingIcon.vue';
import AppHeader from './AppHeader.vue';

export default {
  name: 'AppMain.vue',
  //emits: ['search'], //'handleTrue', 'allphotos'

  components: {
   // ModalView,
    CardPhoto,
    //FilterCategories,
    FiltersButtons,
    LoadingIcon,
    AppHeader
  },

  data(){
    return{
        store,
        //search_tx: ''
      /*base_api_url: 'http://127.0.0.1:8000', //creo una variabile con il link(base) della mia API in questo caso del l'api creata nell file(laravel-boolpress-live-73)
      photos_endpoint: '/api/photos', // URL api photos,
      categories_endpoint: '/api/categories', // URL api categories,
      evidences_query: '?in_evidence',
      photos: '',
      categories: '',
      evidences: '',
      results_evidences: false,
      results_categories: false,
      show: false,
      loading: false*/
    }
  },

  methods: {
    goPage(url){ //questo metodo ci porta al url
      console.log(url); /*click -> url di ogni pagina*/
      store.callApiPhotos(url)
    },
/*
    callApiPhotos(url){
      axios.get(url)
      .then(resp => {
        this.loading = false;
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
        this.loading = false;
      //console.log(resp); 
      this.categories = resp.data
      console.log(this.categories);
        })
      .catch(err => {
      console.error(err);
        })
    },
    
    callApiEvidences(url){
      axios.get(url)
      .then(resp => {
        this.loading = false;
      //console.log(resp); 
      this.evidences = resp.data.results
      console.log(this.evidences); //direttamente { >data {oggeti del'api}}
        })
      .catch(err => {
      console.error(err);
        })
    },*/
    /*
    allPhotos(){
        const url_photos = store.base_api_url + store.photos_endpoint
        store.callApiPhotos(url_photos);
    },*/
/*
    filter(data){
        store.loading = true;
        //console.log('filter', data);
        const [filter_value, results_categories] = data;
        console.log(filter_value);
        store.results_categories = results_categories //results_categories é diventato vero
        
      const url_filter = store.base_api_url + store.photos_endpoint + `?filter=${filter_value}`
      console.log(url_filter); //http://127.0.0.1:8000/api/photos?filter=3
      store.callApiPhotos(url_filter)
    },*/

    /*filterDoppio(){
        //const url_filter_doppio = this.base_api_url + this.photos_endpoint + `?filter=${filter_value}` + `&${this.evidences_query}`
         for (let index = 0; index < this.photos.data.length; index++) {
            const element = this.photos.data[index];
            if (element.in_evidence == 1) {
                this.element_evidence.push()
            } 
         }
        console.log(this.element_evidence);
        //this.callApiPhotos(url_filter_doppio)
    },

    handleTrue(){
        store.show = true,
        store.results_evidences = true
    },*/

    /*handleFalse(){
        this.show = false,
        this.results_categories = false
    }*/

    
  },

  created(){
    // url photos
    const url_photos = store.base_api_url + store.photos_endpoint
    console.log(url_photos);

    // url categories
    const url_categories = store.base_api_url + store.categories_endpoint
    console.log(url_categories);

    // query in_evidence
    const url_evidences = store.base_api_url + store.photos_endpoint + store.evidences_query 
    console.log(url_evidences);

    // calls api
    store.callApiPhotos(url_photos); // chiamata api photos
    store.callApiCategories(url_categories)
    store.callApiEvidences(url_evidences)
    
    }
    
  }
</script>

<template>
    <main>
        <div class="jumbotron"></div>

        <div class="container">
            <section class="py-1"> <!----Al click en categories, true-->
                <FiltersButtons></FiltersButtons>
                <!--<div class="d-flex justify-content-between">

                    <div class="input-group filter-evidence" >
                        <button class="btn btn-outline-secondary" type="button" v-if="!store.show" @click="handleTrue" :disabled="store.loading"> <!--@click="filterDoppio"-->
                            <!--{{ store.loading ? 'Cercando...' : 'Vedi le foto in evidenza' }}
                        </button>-->
                        <!--<button class="btn btn-outline-secondary" type="button" v-if="store.show" @click="allphotos, store.show = false, store.results_evidences = false" :disabled="store.loading"> <!---->
                            <!--{{ store.loading ? 'Cercando...' : 'Torna indietro' }}
                        </button>
                    </div>

                    <div class="link-all-photos align-content-center" v-if="store.show, store.results_categories, !store.results_evidences">
                        <a href="#" @click="allPhotos" class="link-dark link-opacity-25-hover link-underline-opacity-0 link-underline-opacity-25-hover">Tutte le Foto:</a>
                    </div>

                    <div class="filter-categories" v-if="!store.results_evidences">
                        <FilterCategories @filter="filter" :categories="store.categories"  :loading="store.loading"></FilterCategories> <!--:filter_value="filter_value"-->
                    <!--</div>
                </div>-->
                
                
                <div v-if="store.show && store.results_evidences">
                    <h3>Foto in evidenza</h3>
                    <div class="row row-cols-sm-2 row-cols-md-3 g-4"> <!--row-cols-1  -->
                        <div v-for="photo in store.evidences">
                            <div class="col photoCard cont-cards">
                                <CardPhoto :photo="photo" :base_api_url="store.base_api_url"></CardPhoto>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="photos py-5" > <!--Se ci sono photos e se show é falso, allora vedere questo-->

                <div class="container" v-if="store.photos, !store.show">


                    <h3 class="m-auto">Foto:</h3> <!-- {{ this.filter ? 'Foto:categoria Nome' : 'Explora tutte le foto' }} -->
                    <!--<AppHeader @search="search"></AppHeader>--->
                    <div class="message" v-if="store.photos.data <= 0"> 
                        Non ci sono foto da vedere
                    </div>

                    <div class="row row-cols-sm-2 row-cols-md-3 g-4" v-if="!store.loading"> <!-- row-cols-1   -->
                        <div  v-for="photo in store.photos.data">
                            <CardPhoto :photo="photo" :base_api_url="store.base_api_url"></CardPhoto> 
                            <!--<ModalView :photo="photo" :base_api_url="base_api_url"></ModalView>-->
                        </div>
                    </div>
                    <LoadingIcon v-else></LoadingIcon>
                    <nav aria-label="Page navigation" class="mt-4" v-if="store.photos">
                        <ul class="pagination" >
                            <li class="page-item" :class="{'disabled' : !link.url, 'active': link.active}" v-for="link in store.photos.links">
                            <button class="page-link" :href="link.url" type="button" @click="goPage(link.url)"> <!--ci manda al url di ogni pagina-->
                                <span v-html="link.label"></span>
                            </button>
                            </li>
                        </ul>
                    </nav>
                    <div class="message" v-else> 
                        Non ci sono foto da vedere
                    </div>
                </div>
                
            </section>
        </div>
    </main>
</template>

<style scoped>
main {
    background-color: #87a1af;
}

.jumbotron {
    background-image: url('/img/tim-marshall-bvuwsIUCksA.jpg');
    height: 650px;
    background-size: cover;
    background-repeat: no-repeat;
    /*margin-top: -180px;*/
}

</style>
