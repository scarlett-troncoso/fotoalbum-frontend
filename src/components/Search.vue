<script>
export default {
    name: 'Search.vue',
    props: {
        loading: Boolean
    },

    emits: ['search'], 

    data() {
        return{
            search_text: '',
        }
    }
}
</script>
<template>
    <form @submit.prevent="$emit('search', search_text)">
        <div class="input-group mb-3 d-flex cerca" role="search"  > <!--role="search" -->
            <input type="search" class="form-control input-cerca" placeholder="Cerca per titolo" aria-label="Search" v-model="search_text">  <!--aria-describedby="button-addon2"-->
            <button class="btn btn-outline-light btn-cerca" type="submit">
                 {{ loading ? 'Cercando...' : 'Cerca' }}
            </button> <!--id="button-addon2"   <i class="fa fa-search fa-lg fa-fw"></i> -->
        </div>
    </form>
    <!--<div class="input-group mb-3 d-flex cerca"> 
       <input type="search" class="form-control input-cerca" placeholder="Cerca per titolo" aria-label="Search"  v-model="search_text">
       <button class="btn btn-outline-light btn-cerca" type="submit" @click="search"><i class="fa fa-search fa-lg fa-fw"  ></i></button> 
    </div>-->
</template>