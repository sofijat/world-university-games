<template>
    <div id="container">
        <Toolbar/>
        <div class="container fill align-items-center" style="height: 100%;">
            <div class="row d-flex align-items-center fill" style="height: 100%;">
                <div class="col-md-6 align-items-center border-right fill" style="height: 100%;">
                    <div>{{accomodationShort}}</div>
                    <br>
                    <div  class="row d-flex align-items-left">
                        <div class="col-md-12 label" v-for="accomRating in myRatings" :key="accomRating.user">
                            <div>
                                <br>
                                <div class="row lighter">
                                    <div class="col-md-1"></div>
                                    <div class="col-md-4">
                                        <label>Korisnik: </label><label class="bold">{{accomRating.user}}</label>
                                    </div>
                                    <div class="col-md-2"></div>
                                    <div class="col-md-4">
                                        <label>Ocena: </label><label class="bold">{{accomRating.rating}}</label>
                                    </div>
                                    <div class="col-md-1"></div>
                                </div>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 align-items-center border-right fill" style="height: 100%;">
                    <br><br><br><br>
                    <label>Prosečna ocena: </label><label class="bold">{{average}}</label>
                    <br><br><br><br>
                    <label>Odaberite ocenu: </label>
                    <b-form-radio-group v-model="selected" :options="options" class="mb-3" value-field="item" text-field="name" disabled-field="notEnabled"
                    ></b-form-radio-group>
                    <br><br>
                    <b-button @click='save'>Oceni</b-button>
                    <br><br>
                    <b-alert show dismissible v-model="visible" variant="success">
                        Uspešno ste ocenili smeštaj.
                    </b-alert>
                    <b-alert show dismissible v-model="visible1" variant="danger">
                        Već ste ocenili smeštaj.
                    </b-alert>
                    <b-alert show dismissible v-model="visible2" variant="danger">
                        Morate prvo odabrati ocenu.
                    </b-alert>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import Toolbar from '@/components/Toolbar.vue'
    import accomRatings from '../data/accomRatingsData.js'
    import users from '../data/usersData.js'
    import accommodations from '../data/accomData.js'

    export default {
    name: 'UserAccomRate',
    components: {
        Toolbar
    },
    data(){
        return {
            accomRatings: accomRatings,
            myRatings: accomRatings,
            users: users,
            accommodations: accommodations,
            accomodationShort: '',
            average: 0,
            options: [
                { item: '1', name: '1' },
                { item: '2', name: '2' },
                { item: '3', name: '3' },
                { item: '4', name: '4' },
                { item: '5', name: '5' }
            ],
            visible: false,
            visible1: false,
            visible2: false,
            selected: ''
        }
    },
    methods:{
        save(){
        var user = this.users.find(user=> user.loggedIn == true); 
        if (this.selected == ''){
            this.visible2 = true;
            return;
        }
        var newEntry = {"user":user.short, "rating":this.selected, "accommodation" : user.accomodation};
        this.accomRatings.push(newEntry);
        this.visible = true;
        this.myRatings = this.accomRatings.filter(rating => rating.accommodation == user.accomodation);

        var total = 0;
        for (var i = 0; i<this.myRatings.length; i++){
            total = +total + +this.myRatings[i].rating;
        }
        var num = this.myRatings.length;
        this.average = total/num;
      }
    },
    created(){
        var user = this.users.find(user=> user.loggedIn == true);
        var myAccom = this.accommodations.find(ac => ac.id == user.accomodation);
        this.accomodationShort = myAccom.name;
        this.myRatings = this.accomRatings.filter(rating => rating.accommodation == user.accomodation);
        
        var total = 0;
        for (var i = 0; i<this.myRatings.length; i++){
            total = +total + +this.myRatings[i].rating;
        }
        var num = this.myRatings.length;
        this.average = total/num;
        this.visible = false;
        this.visible1 = false;
        this.visible2 = false;
    }

    }
</script>

<style scoped>
    .fill { 
        min-height: 100%;
        height: 100%;
    }
    #container {
        min-height: 85%;
        height: 85%;
    }
    .container{
        min-width:100%;
    }
    .bold{
        vertical-align: bottom;
        font-weight: bold;
    }
    .lighter{
        background-color: #f2f9ff;
    }
</style>