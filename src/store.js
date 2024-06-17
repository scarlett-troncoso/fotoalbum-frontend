import { reactive } from "vue";
import axios from 'axios';

export const store = reactive({
    /*name: 'AppMain.vue',
    emits: 'filter',
  
    components: {
      ModalView,
      CardPhoto,
      FilterCategories
    },
  
    data(){
      return{*/
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
        loading: false,
      /*}
    },*/
  
    /*
    methods: {
      goPage(url){ //questo metodo ci porta al url
        console.log(url); /*click -> url di ogni pagina*/
        /*this.callApiPhotos(url)
      },*/
  
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
  
      /*
      allPhotos(){
          const url_photos = this.base_api_url + this.photos_endpoint
          this.callApiPhotos(url_photos);
      },
  
      filter(data){
          this.loading = true;
          //console.log('filter', data);
          const [filter_value, results_categories] = data;
          console.log(filter_value);
          this.results_categories = results_categories //results_categories é diventato vero
          
        const url_filter = this.base_api_url + this.photos_endpoint + `?filter=${filter_value}`
        console.log(url_filter); //http://127.0.0.1:8000/api/photos?filter=3
        this.callApiPhotos(url_filter)
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
      },*/
  /*
      handleTrue(){
          this.show = true,
          this.results_evidences = true
      },*/
  
      /*handleFalse(){
          this.show = false,
          this.results_categories = false
      }*/
    //},
  /*
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
      }*/
    })