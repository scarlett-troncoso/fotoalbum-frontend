<script>
export default {
    name: 'FilterCategories.vue',
    props: {
        categories: {default: ''},
        loading: Boolean
    },

    emits: ['filter'],

    data() {
        return{
            filter_value: '',
            results_categories: true
        }
    },

    methods: {
    handleSubmit() {
      // Emetti un evento con il valore della query di ricerca
      this.$emit('filter', this.filter_value, this.results_categories);

      // Resetta il campo di input
      this.filter_value = '';
    } }
}
</script>

<template>
    <div class="input-group">
        <select class="form-select-sm select-filtra form-select" name="filter_category" id="filter_category"  v-model="filter_value">
            <option value="" selected disabled>Categorie...</option>
            <option value="all">Tutte le categorie</option>
            <option v-for="category in categories" :value="category.id" > {{category.name}}</option>
            <option value="senza">Senza Categoria</option>
        </select>
        <button class="btn btn-outline-secondary btn-filtra-select" type="button" @click="handleSubmit" :disabled="loading" href="#bottomSection" data-bs-toggle="scroll"> 
            {{ loading ? 'Cercando...' : 'Filtra' }}
        </button>
    </div>
    <!--$emit('filter', [filter_value, results_categories])-->
</template>

<style scoped>
    .select-filtra {
        background-color: var(--ligth-prim);
        opacity: 60%;
        &:hover{
                opacity: 100%;
            }
    }

    .btn-filtra-select{
        color: white;
    }
</style>