<template>
    <div id="container">
        <Toolbar/>
        
        <div class="container fill align-items-center" style="height: 100%;">
            <div class="row d-flex align-items-center fill" style="height: 100%;">
                <div class="col-md-6 align-items-center fill" style="height: 100%;">
                    <br><br>
                    <GmapMap :center="center" :zoom="16" map-type-id="terrain" style="width: 600px; height: 400px">
                    <GmapMarker :key="index" v-for="(m, index) in markers" :position="center" :clickable="true" :draggable="true" @click="center=m.position"/>
                    </GmapMap>
                    <div>{{restaurantAddress}}</div>
                </div>
                <div class="col-md-6 align-items-center fill" style="height: 100%;">
                    <div>
                        <div class="row">
                            <div class="col-md-4 align-items-center">
                                
                            </div>
                            <div class="col-md-5 align-items-center">
                                <label>Restoran: {{restaurantName}}</label><label ></label>
                                <br><br><br>
                                <b-button pill variant="info" to="/userRestRate">Ocene</b-button>
                                <br><br><br>
                                <b-button pill variant="info" to="/userRestComm">Komentari</b-button>
                                <br><br><br>
                                <b-button pill variant="info" to="/userRestChg">Promeni restoran</b-button>
                            </div>
                            <div class="col-md-3 align-items-center">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Toolbar from '@/components/Toolbar.vue'
    import users from '../data/usersData.js'
    import restaurants from '../data/restData.js'
    export default {
    name: 'UserRest',
    components: {
        Toolbar
    },
    data(){
        return{
            center: { lat: 0, lng: 0 },
            mapTypeId: "terrain",
            users: users,
            restaurants: restaurants,
            markers: [
                { position: { lat: 0, lng: 0 } },
            ],
            restaurantAddress: '',
            restaurantName: ''
        }
    },
    created(){
        var user = this.users.find(user=> user.loggedIn==true);
        var id = user.restaurant;
        var rest = this.restaurants.find(accom => accom.id == id);
        this.restaurantAddress = rest.address;
        this.restaurantName = rest.name;
        var lng1 = rest.lng;
        var lat1 = rest.lat;
        this.center = {lat: +lat1, lng: +lng1};
    }
}
</script>

<style scoped>
.vue-map-container,
.vue-map-container .vue-map {
    width: 100%;
    height: 100%;
}
</style>