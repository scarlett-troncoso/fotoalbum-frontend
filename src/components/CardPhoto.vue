<script>
export default {
    name: 'CardPhoto.vue',
    props: {
        photo: Object,
        base_api_url: String,
    }
}
</script>
<template>
    <div class="card">
        <div class="cont-img card-img-top" type="button" data-bs-toggle="modal" :data-bs-target="`#photo-${photo.id}`">
            <div v-if="photo.upload_image"> <!--Se la immagine ce allora-->
                <img class="card-img-top" :src="photo.upload_image.startsWith('https://') ? photo.upload_image : base_api_url + '/storage/' + photo.upload_image" alt="">
            </div>

            <div v-else> <!--Se la immagine NON ce allora mi fa vedere un'aimmagine di Lorem Picsum-->
                <img class="card-img-top" src="https://picsum.photos/400/200" alt="" >
            </div>
        </div>

        <div class="card-body card-foto-body">
            <div class="info-card">
                <h5>{{ photo.title }}</h5>
                <div class="d-flex justify-content-between">
                    <span class="badge text-bg-secondary">{{ photo.category ? photo.category.name : 'Senza Categoria' }}</span>
                    <div class="evidence d-flex align-items-end" v-if="photo.in_evidence">
                        <i class="fa-solid fa-circle-check symbol_check"></i>
                        <span class="ev_text">In evidenza</span> 
                    </div>
                    <div class="btn-modal">
                        <!-- Modal trigger button -->
                        <button type="button" class="btn btn-sm" data-bs-toggle="modal" :data-bs-target="`#photo-${photo.id}`">
                            <i class="fa-solid fa-eye"></i> <!--Vedi Foto-->
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>