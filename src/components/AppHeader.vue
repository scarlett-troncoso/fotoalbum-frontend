<script>
import { store } from '../store';
export default {
    name: 'AppHeader.vue',
    //emits: ['search'],

    /*components: {
        //Search
    },*/

    data() {
        return{
            store,
            search_text: ''
        }
    },

    methods: {
        search(){ //(data)
            store.loading = true;
            //console.log('search_text', data);
            //const [search_text] = data;
            const url_search = store.base_api_url + store.photos_endpoint + `?search=${this.search_text}`
            console.log(url_search); // console: http://127.0.0.1:8000/api/posts?search=sfrefe 
            store.callApiPhotos(url_search)
        },
    }
}
</script>


<template>
    <header class="side-header">
        <nav class="navbar navbar-expand-lg navbar-header">
            <div class="container-fluid m-2">
                <div class="mx-3 navbar-brand logo-fotoAlbum">
                    <h2 class="display-5 fw-bold">FotoAlbum</h2>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNav"> <!--navbarSupportedContent-->
                    <ul class="navbar-nav"> <!--me-auto mb-2 mb-lg-0-->
                        <li class="nav-item">
                            <a class="nav-link" href="#">Login</a> <!--link-dark link-opacity-25-hover link-underline-opacity-0 link-underline-opacity-25-hover"-->
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Other</a>
                        </li>
                    </ul>
                    
                </div>
                <form @submit.prevent="search" class="mb-3 d-flex cerca">
                    <div class="input-group"> 
                        <input type="search" class="form-control input-cerca" placeholder="Cerca per titolo" aria-label="Search"  v-model="search_text">
                        <button class="btn btn-outline-light btn-cerca" type="submit" ><i class="fa fa-search fa-lg fa-fw"  ></i></button> 
                    </div>
                </form>

                <!--<Search @search="search"></Search>-->
            </div>
        </nav>        
    </header>
</template>

<style scoped>
    .navbar-header{
        background-color: transparent;
    }

    .logo-fotoAlbum {
    color: var(--logo-dark);
    }

    /*.cerca{
        width: 30%;
    }*/
    
    .input-cerca {
        background-color: transparent;
    }
</style>