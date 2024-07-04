<script>
import { store } from '../store';
import FilterCategories from './FilterCategories.vue';
//import Search from './Search.vue';

 export default {
   name: 'FiltersButtons.vue',
    emits: ['filter'], //, 'search'

    components: {
        FilterCategories,
        //Search
    },

    props: {
        categories: {default: ''},
        loading: Boolean
    },

    data() {
        return{
            store,
            valueCategory : ' ', // variabile per introdurre il valore filter_value del filtro categories

        }
    },

    methods: {
        handleTrue(){
            store.show = true,
            store.results_evidences = true;
           // store.results_categories = false; possibile soluzione ma quando torno indietro, é ancora falso quindi non si vede piu il button 'tutte le foto'
           //console.log(this.filter_value);
        },
        
        allPhotos(){
            const url_photos = store.base_api_url + store.photos_endpoint
            store.callApiPhotos(url_photos);
            store.results_categories = false; // results categories diventa falso, questo fa che il link "tutte le foto" non si veda piú, perche si abbiamo fatto click e avviato questa funzione vuol dire che stiamo gia vedendo in pagina tutte le foto
            console.log('results_categories', store.results_categories);

            store.search = false
            console.log('search', store.search);
        },

        filter(data){
            store.loading = true;
            console.log('filter', data);
            //const [filter_value, results_categories] = data;
            //console.log('filter_value', filter_value);
            this.valueCategory = data
            store.results_categories = true //results_categories é diventato vero --- = results_categories
            store.search = true; // quando results_categories diventa vero anche search deve diventare vero, perche se non sono entrambi vere allora non si vede il link "tutte le foto"
            
            /* ↓↓↓ Per gestire il cambio true/false per la visualizzazione in pagina del link "Tutte le foto" */
            //console.log('results_categories', store.results_categories); 
            //console.log('search', store.search);
            
            const url_filter = store.base_api_url + store.photos_endpoint + `?filter=${this.valueCategory}` //filter_value
            console.log(url_filter); //http://127.0.0.1:8000/api/photos?filter=3
            store.callApiPhotos(url_filter)

            /*handleSearchSubmit(query) {
            // Aggiorna la searchQuery con il valore ricevuto dal componente figlio
            this.searchQuery = query;

            // Puoi anche eseguire ulteriori logiche qui, come fare una ricerca
            console.log('Search submitted:', this.searchQuery);
            }       */
        }
    }
}
</script>

<template>
    <div class="tre-filtri">

        <div class="input-group filter-evidence " >
            <button class="btn btn-outline-secondary text-dark btn-ev" type="button" v-if="!store.show" @click="handleTrue" :disabled="store.loading"> <!--@click="filterDoppio"-->
                {{ store.loading ? 'Cercando...' : 'Vedi le foto in evidenza' }}
            </button>
            <button class="btn btn-outline-secondary text-dark btn-ev" type="button" v-if="store.show" @click="allphotos, store.show = false, store.results_evidences = false" :disabled="store.loading"> <!---->
                {{ store.loading ? 'Cercando...' : 'Torna indietro' }}
            </button> <!--btn-outline-light light-->
        </div>

        <div class="link-all-photos align-content-center" v-if="store.results_categories && store.search"> <!---v-if="store.show, , !store.results_evidences  , store.search = true-->
            <a href="#bottomSection" @click="allPhotos" data-bs-toggle="scroll" class="link-light link-all link-opacity-25-hover link-underline-opacity-0 link-underline-opacity-25-hover">Tutte le Foto:</a>
        </div>

        <div class="filter-categories" v-if="!store.results_evidences">
            <FilterCategories @filter="filter" :categories="store.categories" :loading="store.loading"></FilterCategories> <!--:filter_value="filter_value"-->
        </div> <!--@filter="filter"-->
    </div>
</template>

<style scoped>

    .filter-evidence{
        width: auto;
        >.btn-ev{
            background-color: var(--ligth-prim);
            opacity: 60%;

            &:hover{
                opacity: 100%;
            }
        }       
    }

</style>