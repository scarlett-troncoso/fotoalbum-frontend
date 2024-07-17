<script>
export default {
    name: 'ModalView.vue',
    props: {
        photo: Object,
        base_api_url: String,
    }
}
</script>

<template>
    <div class="cont-modal"> <!---Modal per visualizzazione di un singola photo-->
        <!-- Modal Body -->
        <div class="modal fade" :id="`photo-${photo.id}`" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" :aria-labelledby="`modal-title-${photo.id}`" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-scrollable modal-show" > <!--modal-dialog-centered  role="document"   -->
                <div class="modal-content">
                    <div class="modal-header mod-header">
                        <h3 class="modal-title w-75" :id="`modal-title-${photo.id}`">
                            {{photo.title}}
                        </h3>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body d-flex justify-content-around mod-body">
                        <div class="w-50 cont-img-modal"> <!--bg-dark-->
                            <div v-if="photo.upload_image"> <!--Se la immagine ce allora-->
                                <img class="img-modal" :src="photo.upload_image.startsWith('https://') ? photo.upload_image : base_api_url + '/storage/' + photo.upload_image" alt="">
                            </div>

                            <div v-else> <!--Se la immagine NON ce allora mi fa vedere un'immagine di Lorem Picsum-->
                                <img class="img-modal" src="https://picsum.photos/400/200" alt="" >
                            </div>
                        </div>
    
                        <div class="w-50 modal-text px-5">
                            <h5 class="green-dark">{{ photo.title }}</h5>
                        
                            <div class="py-4 f-merienda ml-1">
                                <p> " {{photo.description}} "</p>
                            </div>

                            <div class="d-flex w-100 justify-content-between">
                                <!--<div >
                                    <strong></strong>  {{ photo.category ? photo.category.name : 'Senza Categoria' }}
                                </div>-->

                                <div class="px-1 green-dark d-flex align-items-center cont-user cont-border">
                                    <i class="fas fa-circle-user fa-lg"></i> 
                                    <h5 class="fw-bold px-1"> {{ photo.user? photo.user.name : '' }} </h5>  
                                </div>

                                <div class="cont-categ">
                                    <!--<span class="p-1 text-category">Categoria: </span>-->
                                    <h5 v-if="photo.category"><span class="badge bg-categ-green" >{{ photo.category.name}}</span></h5>
                                    <span v-else> Senza Categoria</span>
                                </div>

                                <div class="in_evidence px-1 fw-bold orange cont-border" v-if="photo.in_evidence">
                                    <i class="fa-solid fa-circle-check fa-lg"></i> In evidenza
                                </div>
                        </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-show{
    min-width: 90vw;
    height: 95vh;
}
.mod-header{
    background-color: var(--primary-green);
    color: var(--ligth-prim);
}
.mod-body{
    background-color: var(--ligth-prim);
}
.modal-text{
    >.text-category {
        color: var(--primary-green);
        line-height: 2rem;
    }
}
.cont-border{
    border-radius: 7px;
    height: 1.7rem;

    > i {
        padding-left: 4px;
        line-height: 1.7rem;
    }
}
.cont-user {
    border: solid var(--primary-green) 1px;
  
    > h5{
        font-size: 1.1rem;
        margin: 0;
    }
}

.cont-categ {
    line-height: 2rem;
}

.in_evidence{
    border: solid var(--check-color) 1px;
}

.cont-img-modal{
    display: inline-flex;
    justify-content: center;
}

.img-modal{
    max-width: 100%;
    max-height: 80vh;
}
</style>