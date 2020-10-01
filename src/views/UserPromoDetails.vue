<template>
    <div id="container">
        <Toolbar/>
        <div class="container fill align-items-center" >
            <div class="row d-flex align-items-center fill">
                <div class="col-md-1 align-items-center fill" >
                    
                </div>
                <div class="col-md-10 align-items-center fill">
                    <br>
                    <label class="title bold">{{userPromo.title}}</label>
                    <br>
                     <label class="">{{userPromo.text}}</label>
                    <br><br>
                        <div class="row d-flex align-items-center fill">
                        <div class="col-md-2 align-items-center fill" ></div>
                        <div class="col-md-8 align-items-center fill" >
                        <b-carousel
                            id="carousel-fade"
                            style="text-shadow: 0px 0px 2px #000"
                            fade
                            controls
                            indicators
                            img-width="600"
                            img-height="300"
                        >
                        <div class="img" v-for="photo in photos" v-bind:key="photo.id">
                        <b-carousel-slide
                            :img-src="require(`../assets/${photo.name}`)"
                            ></b-carousel-slide>

                        </div>
                        </b-carousel>
                        </div>
                        <div class="col-md-2 align-items-center fill" ></div>
                        </div>
                </div>
                <div class="col-md-1 align-items-center fill">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Toolbar from '@/components/Toolbar.vue'
    import userPromos from '../data/userPromoData.js'

    export default {
    name: 'UserPromoDetails',
    components: {
        Toolbar
    },
    data(){
        return {
            userPromos: userPromos,
            photos: [],
            userPromo: '',
            text:''
        }
    },
    created() {
      var id=Number(this.$route.params.id);
      var userPromo = this.userPromos.find(promo=>promo.id==id);
      this.userPromo = userPromo;
      this.photos = this.userPromo.photos;
      this.text = this.userPromo.text;
    }

    }
</script>

<style scoped>
    .fill { 
        /* background-color: teal; */
        min-height: 100%;
        height: 100%;
    }
    #container {
        min-height: 85%;
        height: 85%;
    }
    .container{
        min-width:1200px;
        max-width:1200px;
    }
    .bold{
        vertical-align: bottom;
        font-weight: bold;
    }
    .link{
        color: crimson;
        text-decoration-line: underline;
        font-weight: bold;
    }
    .title{
        font-size: 26px;
    }
    .pre-formatted {
        white-space: pre;
    }
    div {
    text-overflow: clip;
}
</style>