<template>
    <div id="container">
        <Toolbar/>
        <br><br><br><br><br><br><br>
        <label>Klikom na dugme "Pošalji zahtev" možete da pošaljete zahtev za promenu smeštaja.</label>
        <br>
        <label>Nakon toga, potrebno je sačekati da Vaš zahtev bude odobren.</label>
        <br>
        <label>Tom prilikom će Vam biti dodeljen novi smeštaj.</label>
        <br><br>
        <b-button @click='send'>Pošalji zahtev</b-button>
        <br><br>
        <b-alert show dismissible v-model="visible" variant="success">
            Uspešno ste poslali zahtev za promenu smeštaja.
        </b-alert>
        <b-alert show dismissible v-model="visible1" variant="danger">
            Već ste poslali zahtev za promenu smeštaja. Potrebno je da sačekate odobrenje.
        </b-alert>
    </div>
</template>

<script>
    import Toolbar from '@/components/Toolbar.vue'
    import accomRequests from '../data/accomRequestsData.js'
    import users from '../data/usersData.js'

    export default {
    name: 'UserAccomChg',
    components: {
        Toolbar
    },
    data(){
        return {
            accomRequests: accomRequests,
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
            var user = this.users.find(user=> user.loggedIn==true);
            var oldEntry = this.accomRequests.find(ar => ar.user == user.short && ar.done == false);
            if (oldEntry == null){
                var newEntry = {"user": user.short, "current": user.accomodation, "done": false};
                accomRequests.push(newEntry);
                this.visible = true;
            } else {
                this.visible1 = true;
            }
        }
    }
    }
</script>