<template>
    <div id="container">
        <Toolbar/>
        <br><br><br><br><br><br><br>
        <label>Klikom na dugme "Pošalji zahtev" možete da pošaljete zahtev za promenu restorana.</label>
        <br>
        <label>Nakon toga, potrebno je sačekati da Vaš zahtev bude odobren.</label>
        <br>
        <label>Tom prilikom će Vam biti dodeljen novi restoran.</label>
        <br><br>
        <b-button @click='send'>Pošalji zahtev</b-button>
        <br><br>
        <b-alert show dismissible v-model="visible" variant="success">
            Uspešno ste poslali zahtev za promenu restorana.
        </b-alert>
        <b-alert show dismissible v-model="visible1" variant="danger">
            Već ste poslali zahtev za promenu restorana. Potrebno je da sačekate odobrenje.
        </b-alert>
    </div>
</template>

<script>
    import Toolbar from '@/components/Toolbar.vue'
    import restRequests from '../data/restRequestsData.js'
    import users from '../data/usersData.js'

    export default {
    name: 'UserRestChg',
    components: {
        Toolbar
    },
    data(){
        return {
            restRequests: restRequests,
            users: users,
            visible: false,
            visible1: false
        }
    },
    created(){
        this.visible = false;
        this.visible1 = false;
    },
    methods:{
        send(){
            var user = this.users.find(user=> user.loggedIn == true);
            var oldEntry = this.restRequests.find(rr => rr.user == user.short && rr.done == false);
            if (oldEntry == null){
                var newEntry = {"user": user.short, "current": user.restaurant, "done": false};
                restRequests.push(newEntry);
                this.visible = true;
            } else {
                this.visible1 = true;
            }
        }
    }
    }
</script>