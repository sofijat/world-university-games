<template>
    <div id="container">
        <Toolbar/>
        <div class="container fill align-items-center" style="height: 100%;">
            <div class="row d-flex align-items-center fill" style="height: 100%;">
                <div class="col-md-6 align-items-center border-right fill" style="height: 100%;">
                    <div>{{restaurantShort}}</div>
                    <br>
                    <div  class="row d-flex align-items-left">
                        <div class="col-md-12 label" v-for="restComment in myComments" :key="restComment.user">
                            <div>
                                <br>
                                <div class="row lighter">
                                    <div class="col-md-1"></div>
                                    <div class="col-md-3">
                                        <label>Korisnik: </label><label class="bold">{{restComment.user}}</label>
                                    </div>
                                    <div class="col-md-1"></div>
                                    <div class="col-md-6">
                                        <label class="bold">{{restComment.comment}}</label>
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
                    <label>Broj komentara: </label><label class="bold">{{total}}</label>
                    <br><br><br><br>
                    <label>Vaš komentar: </label>
                    <b-form-textarea
                        id="textarea"
                        placeholder="Komentar"
                        rows="3"
                        v-model="newComment"
                    ></b-form-textarea>

                    <br><br>
                    <b-button @click='save'>Dodaj komentar</b-button>
                    <br><br>
                    <b-alert show dismissible v-model="visible" variant="success">
                        Uspešno ste dodali komentar za restoran.
                    </b-alert>
                    <b-alert show dismissible v-model="visible1" variant="danger">
                        Već ste dodali komentar za restoran.
                    </b-alert>
                    <b-alert show dismissible v-model="visible2" variant="danger">
                        Morate prvo uneti komentar.
                    </b-alert>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Toolbar from '@/components/Toolbar.vue'
    import restComments from '../data/restCommentsData.js'
    import users from '../data/usersData.js'
    import restaurants from '../data/restData.js'

    export default {
    name: 'UserRestComm',
    components: {
        Toolbar
    },
    data(){
        return {
            restComments: restComments,
            myComments: restComments,
            users: users,
            restaurants: restaurants,
            restaurantShort: '',
            total: 0,
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
            newComment: ''
        }
    },
    methods:{
        save(){
        var user = this.users.find(user => user.loggedIn == true);
        if (this.newComment == ''){
            this.visible2 = true;
            return;
        }
        var newEntry = {"user":user.short, "comment":this.newComment, "restaurant": user.restaurant};
        restComments.push(newEntry);
        this.myComments = this.restComments.filter(comment => comment.restaurant == user.restaurant);
        this.visible = true;
        this.total = this.myComments.length;
      }
    },
    created(){
        var user = this.users.find(user=> user.loggedIn == true);
        var myRest = this.restaurants.find(res => res.id == user.restaurant);
        this.restaurantShort = myRest.name;
        this.myComments = this.restComments.filter(comment => comment.restaurant == user.restaurant);
        this.total = this.myComments.length;
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



