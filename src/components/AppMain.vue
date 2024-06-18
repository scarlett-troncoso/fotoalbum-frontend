<script>
//import axios from 'axios';
import { store } from '../store';
import CardPhoto from './CardPhoto.vue';
import FiltersButtons from './FiltersButtons.vue';
import LoadingIcon from './LoadingIcon.vue';
import AppHeader from './AppHeader.vue';

export default {
  name: 'AppMain.vue',

  components: {
    CardPhoto,
    FiltersButtons,
    LoadingIcon,
    AppHeader
  },

  data(){
    return{
        store,
    }
  },

  methods: {
    goPage(url){ //questo metodo ci porta al url
      console.log(url); /*click -> url di ogni pagina*/
      store.callApiPhotos(url)
    }
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

        <div class="container cont-all">
            <section class="py-1"> <!----Al click en categories, true-->
                <FiltersButtons></FiltersButtons>
                
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


                    <h3 class="m-auto light-prim mb-3">Foto:</h3> <!-- {{ this.filter ? 'Foto:categoria Nome' : 'Explora tutte le foto' }} -->
                    
                    <div class="message" v-if="store.photos.data <= 0"> 
                        Non ci sono foto da vedere
                    </div>

                    <div class="row row-cols-sm-2 row-cols-md-3 g-4" v-if="!store.loading"> <!-- row-cols-1   -->
                        <div  v-for="photo in store.photos.data">
                            <CardPhoto :photo="photo" :base_api_url="store.base_api_url"></CardPhoto> 
                        </div>
                    </div>

                    <LoadingIcon v-else></LoadingIcon>

                    <nav aria-label="Page navigation" class="mt-4" v-if="store.photos">
                        <ul class="pagination" >
                            <li class="page-item " :class="{'disabled' : !link.url, 'active': link.active}" v-for="link in store.photos.links">
                            <button class="page-link pag" :href="link.url" type="button" @click="goPage(link.url)"> <!--ci manda al url di ogni pagina-->
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
    background-color: var(--green-dark);
}

.cont-all{
    margin-top: -300px;
}

.jumbotron {
    background-image: url('/img/backgroung-530kb-trans.png');
    height: 1000px;
    background-size: cover;
    background-repeat: no-repeat;
    /*margin-top: -180px; in brackpoints*/
}

.pag {
    background-color: var(--ligth-prim);
}

</style>
