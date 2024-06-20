import { reactive } from "vue";
import axios from 'axios';

export const store = reactive({
  
        base_api_url: 'http://127.0.0.1:8000', //creo una variabile con il link(base) della mia API in questo caso del l'api creata nell file(laravel-boolpress-live-73)
        photos_endpoint: '/api/photos', // URL api photos,
        categories_endpoint: '/api/categories', // URL api categories,
        evidences_query: '?in_evidence',
        photos: '',
        categories: '',
        evidences: [],
        search_results: '',
        results_evidences: false,
        results_categories: false,
        show: false,
        loading: false,
    
   
      async callApiPhotos(url){
        await axios.get(url)
        .then(resp => {
          this.loading = false;
          console.log(resp); 
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
      
      filterEvidences(){
         console.log(this.photos.data);
         this.evidences = this.photos.data.filter((photo)=>photo.in_evidence == 1 );
         console.log(this.evidences);
      },

      callApiSearch(url){
        axios.get(url)
        .then(resp => {
          this.loading = false;
          
        //console.log(resp); 
        this.searchResults = resp.data.results
        console.log(this.searchResults); //direttamente { >data {oggeti del'api}}
          })
        .catch(err => {
        console.error(err);
          })
      }
    })