<script>
import { store } from '../store';
import FilterCategories from './FilterCategories.vue';
export default {
    name: 'FiltersButtons.vue',
    emits: ['filter'],

    components: {
        FilterCategories,
  },

    props: {
        categories: {default: ''},
        loading: Boolean
    },

   // emits: ['allphotos'],

    data() {
        return{
            store,
        }
    },

    methods: {
        handleTrue(){
            store.show = true,
            store.results_evidences = true
        },
        
        allPhotos(){
            const url_photos = store.base_api_url + store.photos_endpoint
            store.callApiPhotos(url_photos);
        },

        filter(data){
            store.loading = true;
            //console.log('filter', data);
            const [filter_value, results_categories] = data;
            console.log(filter_value);
            store.results_categories = results_categories //results_categories é diventato vero
            
        const url_filter = store.base_api_url + store.photos_endpoint + `?filter=${filter_value}`
        console.log(url_filter); //http://127.0.0.1:8000/api/photos?filter=3
        store.callApiPhotos(url_filter)
        },
    }
    
}
</script>

<template>
    <div class="d-flex justify-content-between">

        <div class="input-group filter-evidence" >
            <button class="btn btn-outline-secondary" type="button" v-if="!store.show" @click="handleTrue" :disabled="store.loading"> <!--@click="filterDoppio"-->
                {{ store.loading ? 'Cercando...' : 'Vedi le foto in evidenza' }}
            </button>
            <button class="btn btn-outline-secondary" type="button" v-if="store.show" @click="allphotos, store.show = false, store.results_evidences = false" :disabled="store.loading"> <!---->
                {{ store.loading ? 'Cercando...' : 'Torna indietro' }}
            </button>
        </div>

        <div class="link-all-photos align-content-center" v-if="store.show, store.results_categories, !store.results_evidences">
            <a href="#" @click="allPhotos" class="link-dark link-opacity-25-hover link-underline-opacity-0 link-underline-opacity-25-hover">Tutte le Foto:</a>
        </div>

        <div class="filter-categories" v-if="!store.results_evidences">
            <FilterCategories @filter="filter" :categories="store.categories"  :loading="store.loading"></FilterCategories> <!--:filter_value="filter_value"-->
        </div>
    </div>
</template>

<style scoped>

    .filter-evidence{
        width: auto;
    }

</style>