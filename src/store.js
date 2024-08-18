import { reactive } from "vue";
import axios from 'axios';

export const store = reactive({
  
        base_api_url: 'http://127.0.0.1:8000', //URL base
        photos_endpoint: '/api/photos.com', // URL photos,
        categories_endpoint: '/api/categories.com', // URL categories,
        photos: [],
        categories: [],
        evidences: [],
        searchResults: [],
        results_evidences: false,
        results_categories: false,
        show: false,
        loading: false,
        search: false,
    

      // Funzione per chiamare l'API delle foto
      async callApiPhotos(url){ // 
        this.loading = true;
        await axios.get(url) //  
        .then(response => {
          this.loading = false;
         // console.log(resp); 
          this.photos = response.data.results
        console.log(this.photos); //accesso a: { >data {oggetti del'api}}
          })
        .catch(error => {
        console.error("Errore durante il recupero delle foto:", error);
          })
      },
      
      // Funzione per chiamare l'API delle categorie
      callApiCategories(url){
        this.loading = true;
        axios.get(url)
        .then(response => {
          this.loading = false;
        //console.log(resp); 
        this.categories = response.data
        console.log(this.categories);
          })
        .catch(error => {
        console.error("Errore durante il recupero delle categorie:", error);
          })
      },

      // Funzione per effettuare una ricerca
      callApiSearch(url){
        this.loading = true;
        axios.get(url)
        .then(response => {
          this.loading = false;
        console.log(response); 
        this.searchResults = response.data.results
        console.log(this.searchResults); //accesso a: { >data {oggetti del'api}}
          })
        .catch(error => {
        console.error("Errore durante la ricerca delle foto:", error);
          })
      },
      
      // Funzione per filtrare le foto in evidenza
      filterEvidences(){
         //console.log(this.photos.data);
         this.evidences = this.photos.data.filter((photo)=>photo.in_evidence == 1 );
         console.log(this.evidences);
      }
    })