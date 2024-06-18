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
    <div class=""> <!---Modal per visualizzazione di un singola photo-->
        <!-- Modal Body -->
        <div class="modal fade" :id="`photo-${photo.id}`" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" :aria-labelledby="`modal-title-${photo.id}`" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-scrollable" > <!--modal-dialog-centered  role="document"   -->
                <div class="modal-content">
                    <div class="modal-header mod-header">
                        <h3 class="modal-title w-75 green" :id="`modal-title-${photo.id}`">
                            {{photo.title}}
                        </h3>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body d-flex justify-content-around mod-body">
                        <div class="w-50"> <!--bg-dark-->
                            <div v-if="photo.upload_image"> <!--Se la immagine ce allora-->
                                <img class="img-modal" :src="photo.upload_image.startsWith('https://') ? photo.upload_image : base_api_url + '/storage/' + photo.upload_image" alt="">
                            </div>

                            <div v-else> <!--Se la immagine NON ce allora mi fa vedere un'immagine di Lorem Picsum-->
                                <img class="img-modal" src="https://picsum.photos/400/200" alt="" >
                            </div>
                        </div>
    
                        <div class="w-50 modal-tex">
                            <h5 class="py-1">{{ photo.title }}</h5>

                            <div class="green py-1">
                                <strong>Categoria: {{ photo.category ? photo.category.name : 'Senza Categoria' }}</strong>
                            </div>

                            <div class="in_evidence py-1" v-if="photo.in_evidence">
                                <i class="fa-solid fa-circle-check orange"></i> Foto in evidenza
                            </div>

                            <div class="py-1">
                                <i class="fa-solid fa-user"></i> <span> {{ photo.user? photo.user.name : '' }} </span>  
                            </div>

                            <div class="py-1">
                                <p>{{photo.description}}</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.mod-header{
    background-color: rgb(86, 101, 89);
}
.mod-body{
    background-color: rgb(181, 185, 182);
}
.modal-tex{
    padding-left: 1rem;
}
.img-modal{
    /*min-width: 100%;*/
    width: 100%;
    max-width: 100%;
}
</style>