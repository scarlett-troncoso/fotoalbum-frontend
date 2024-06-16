<script>
import axios from 'axios';
import ModalView from './ModalView.vue';
import CardPhoto from './CardPhoto.vue';
import FilterCategories from './FilterCategories.vue';

export default {
  name: 'AppMain.vue',
  emits: 'filter',

  components: {
    ModalView,
    CardPhoto,
    FilterCategories
  },

  data(){
    return{
      base_api_url: 'http://127.0.0.1:8000', //creo una variabile con il link(base) della mia API in questo caso del l'api creata nell file(laravel-boolpress-live-73)
      photos_endpoint: '/api/photos', // URL api photos,
      categories_endpoint: '/api/categories', // URL api categories,
      evidences_query: '?in_evidence',
      photos: '',
      categories: '',
      evidences: '',
      results_evidences: false,
      results_categories: false,
      show: false,
      loading: false
    }
  },

  methods: {
    goPage(url){ //questo metodo ci porta al url
      console.log(url); /*click -> url di ogni pagina*/
      this.callApiPhotos(url)
    },

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
    },

    filter(data){
        this.loading = true;
        //console.log('filter', data);
        const [filter_value, show] = data;
        console.log(filter_value);
        this.results_categories = show //trasforma il show in true
      const url_filter = this.base_api_url + this.photos_endpoint + `?filter=${filter_value}`
      console.log(url_filter); //http://127.0.0.1:8000/api/photos?filter=3
      this.callApiPhotos(url_filter)
    },

    handleTrue(){
        this.show = true,
        this.results_evidences = true
    },

    handleFalse(){
        this.show = false,
        this.results_categories = false
    }
  },

  mounted(){
    // url photos
    const url_photos = this.base_api_url + this.photos_endpoint
    console.log(url_photos);

    // url categories
    const url_categories = this.base_api_url + this.categories_endpoint
    console.log(url_categories);

    // query in_evidence
    const url_evidences = this.base_api_url + this.photos_endpoint + this.evidences_query 
    console.log(url_evidences);

    // calls api
    this.callApiPhotos(url_photos); // chiamata api photos
    this.callApiCategories(url_categories)
    this.callApiEvidences(url_evidences)
    }
  }
</script>

<template>
    <main>
        <div class="jumbotron"></div>

        <div class="container">
            <div class="filters">
                <FilterCategories @filter="filter" :categories="categories" :loading="loading"></FilterCategories> <!--:filter_value="filter_value"-->
            </div>

            <section class="py-1"> <!----Al click en categories, true-->
                <div class="input-group m-auto" >
                <!--<div v-if="!results_categories">-->
                    <button class="btn btn-outline-secondary" type="button" v-if="!show" @click="handleTrue" :disabled="loading">
                        {{ loading ? 'Cercando...' : 'Vedi le foto in evidenza' }}
                    </button>
                    <button class="btn btn-outline-secondary" type="button" v-if="show" @click="show = false" :disabled="loading">
                        {{ loading ? 'Cercando...' : 'Torna indietro' }}
                    </button>
                <!--</div>-->
                <!--<div v-if="results_categories">
                    <button class="btn btn-outline-secondary" type="button" @click="handleFalse" :disabled="loading">
                        {{ loading ? 'Cercando...' : 'Torna alle foto' }}
                    </button>
                </div>-->
                </div>
                
                <div v-if="show && results_evidences">
                    <div class="row row-cols-sm-2 row-cols-md-3 g-4"> <!--row-cols-1  -->
                        <div v-for="photo in evidences">
                            <div class="col photoCard cont-cards">
                                <CardPhoto :photo="photo" :base_api_url="base_api_url"></CardPhoto>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="photos py-5" > <!--Se ci sono photos e se show é falso, allora vedere questo-->

                <div class="container" v-if="photos, !show">
                        
                    <div class="row row-cols-sm-2 row-cols-md-3 g-4"> <!-- row-cols-1   -->
                        <div  v-for="photo in photos.data">
                            <CardPhoto :photo="photo" :base_api_url="base_api_url"></CardPhoto> 
                            <!--<ModalView :photo="photo" :base_api_url="base_api_url"></ModalView>-->
                        </div>
                    </div>

                    <!-- <div v-if="!photos.data">
                        <h5>No ci sono foto da mostrare</h5>
                    </div> -->

                    <nav aria-label="Page navigation" class="mt-4" v-if="photos">
                        <ul class="pagination" >
                            <li class="page-item" :class="{'disabled' : !link.url, 'active': link.active}" v-for="link in photos.links">
                            <button class="page-link" :href="link.url" type="button" @click="goPage(link.url)"> <!--ci manda al url di ogni pagina-->
                                <span v-html="link.label"></span>
                            </button>
                            </li>
                        </ul>
                    </nav>
                    <div v-else>
                        <h5>No ci sono foto da mostrare</h5>
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

.filters{
        margin: auto;
        justify-content: center;
    }

.jumbotron {
    background-image: url('/img/tim-marshall-bvuwsIUCksA.jpg');
    height: 650px;
    background-size: cover;
    background-repeat: no-repeat;
    margin-top: -180px;
}

</style>
