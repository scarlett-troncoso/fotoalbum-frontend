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
        <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
        <div class="modal fade" :id="`photo-${photo.id}`" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" :aria-labelledby="`modal-title-${photo.id}`" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl" role="document">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" :id="`modal-title-${photo.id}`">
                            {{photo.title}}
                        </h5>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body d-flex">
                        <div>
                            <div v-if="photo.upload_image"> <!--Se la immagine ce allora-->
                            <img class="img-fluid w-100" :src="photo.upload_image.startsWith('https://') ? photo.upload_image : base_api_url + '/storage/' + photo.upload_image" alt="">
                            </div>

                            <div v-else> <!--Se la immagine NON ce allora mi fa vedere un'immagine di Lorem Picsum-->
                            <img src="https://picsum.photos/400/200" alt="" >
                            </div>
                        </div>
    
                        <div>
                            <p>{{photo.description}}</p>
                    
                            <div>
                                Categoria: {{ photo.category ? photo.category.name : 'Senza Categoria' }}
                            </div>

                            <div class="in_evidence" v-if="photo.in_evidence">
                                <i class="fa-solid fa-circle-check"></i> Foto in evidenza
                            </div>

                            <div>
                                <i class="fa-solid fa-user"></i> <span> {{ photo.user? photo.user.name : '' }} </span>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>