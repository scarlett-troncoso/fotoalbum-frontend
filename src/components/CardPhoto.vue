<script>
import ModalView from './ModalView.vue';
export default {
    name: 'CardPhoto.vue',
    props: {
        photo: Object,
        base_api_url: String,
    },
    components:{
        ModalView
    }
}
</script>
<template>
    <div class="card cards-photos"> <!--col -->
        
        <div class="cont-img " type="button" data-bs-toggle="modal" :data-bs-target="`#photo-${photo.id}`">
            <div v-if="photo.upload_image"> <!--Se la immagine ce allora-->
                <img class="card-img-top" :src="photo.upload_image.startsWith('https://') ? photo.upload_image : base_api_url + '/storage/' + photo.upload_image" alt="">
            </div>

            <div v-else> <!--Se la immagine NON ce allora mi fa vedere un'aimmagine di Lorem Picsum-->
                <img class="card-img-top" src="https://picsum.photos/400/200" alt="" >
            </div>
        </div>

        <div class="card-body card-foto-body">
            <div class="info-card">
                <h5 class="photo-title" v-if="photo.title.length<=34">{{ photo.title }}</h5>
                <h5 class="photo-title" v-else="photo.title.length>34">{{ photo.title.substring(0, 35) + "..." }}</h5>
                <div class="d-flex justify-content-between">
                    <div>
                        <span class="badge text-bg-secondary" v-if="photo.category">{{ photo.category.name}}</span>
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
        <div class="evidence d-flex align-items-end" v-if="photo.in_evidence">
            <i class="fa-solid fa-circle-check symbol_check orange"></i>
            <span class="ev_text">In evidenza</span> 
        </div>
    </div>
    <ModalView :photo="photo" :base_api_url="base_api_url"></ModalView>
</template>

<style scoped>
.evidence {
    /*padding-bottom: 5px;*/
    position: absolute;
    right: 5px;
    bottom: 5px;

    >.ev_text {
    font-size: small;
    margin-left: 0.5rem;
    line-height: 0.5rem;
    }

    >.symbol_check{
    line-height: 0.5rem;
    }
}

.cards-photos{
    /*height: 323px; in breack-points*/
    position: relative;

    >.card-foto-body {
        padding: 1px 2px 2px 4px ;

        >.info-card {
            position: relative;
        }
    }
}

.photo-title{
    width: 85%;
    /*font-size: medium;
    line-height: 1rem; in breack-points*/
}

.cont-img{
    /*transition: 1.5s;  Animation transform .
    background-color: white;*/
    transition: all 1s;   
    width: 100%;
    max-height: 100%;
    /*aspect-ratio: 7.0;*/
    aspect-ratio: 4/3;

    &:hover{
        /*transform: scale(1.05);*/
        filter: drop-shadow(0 0 10px #2f3c2f);
        scale: 1.03;
    }
}

img{
    width: 100%;
    max-height: 100%;
    object-fit: cover;
    aspect-ratio: 4/3;
    }

.btn-modal{
    position: absolute;
    top: 0;
    right: 0;

    &:hover{
        transform: scale(1.2);
        transition: 0.5s;
    }
}
</style>