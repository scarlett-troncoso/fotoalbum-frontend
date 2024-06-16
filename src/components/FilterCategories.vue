<script>
export default {
    name: 'FilterCategories.vue',
    props: {
        categories: {default: ''},
        loading: Boolean
        //filter_value: {default: ''}
    },

    emits: ['filter'], 

    data() {
        return{
            filter_value: '',
            show: true
        }
    }
}
</script>
<template>
    <div class="input-group"> <!--   @keyup.enter="filter()"-->
        <select class="form-select-sm select-filtra form-select-dark" name="filter_category" id="filter_category"  v-model="filter_value">
            <option value="" selected disabled>Filtra Per...</option>
            <option v-for="category in categories" :value="category.id" > {{category.name}} {{ category.id }} </option> <!-- -->
        </select>
        <button class="btn btn-outline-secondary btn-filtra-select" type="button" @click="$emit('filter', [filter_value, show])" :disabled="loading"> 
            {{ loading ? 'Cercando...' : 'Filtra' }}
        </button>
    </div>
</template>

<style scoped>
    .select-filtra {
        background-color: transparent;
    }

    .btn-filtra-select{
        color: black;
        border-color: white;
    }
</style>