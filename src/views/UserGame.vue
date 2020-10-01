<template>
    <div id="container">
        <Toolbar/>
        <div class=" fill align-items-center">
            <div class="row d-flex align-items-center fill" style="height: 100%;">
                <div class="col-md-2 align-items-left border-right fill" style="height: 100%;">
                    <div>
                        <br>
                        <div  class="row d-flex align-items-left">
                            <div class="col-md-12 label">
                                <label class="bold">Kriterijumi pretrage</label>
                            </div>
                        </div>
                        <br>
                        <div  class="row d-flex align-items-left">
                            <div class="col-md-12 label">
                                <label>Datum:</label>
                            </div>
                        </div>
                        <div  class="row d-flex align-items-left">
                            <div class="col-md-12 label">
                                <b-form-datepicker locale="de" id="example-datepicker" :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}" placeholder="Datum" v-model="date" class="mb-2"></b-form-datepicker>
                            </div>
                        </div>
                        <br>
                        <div  class="row d-flex align-items-left">
                            <div class="col-md-12 label">
                                <label>Vreme:</label>
                            </div>
                        </div>
                        <div  class="row d-flex align-items-left">
                            <div class="col-md-12 label">
                                <b-form-timepicker placeholder="Vreme" v-model="time" locale="de"></b-form-timepicker>
                            </div>
                        </div>
                        <br>
                        <div  class="row d-flex align-items-left">
                            <div class="col-md-12 label">
                                <label>Hala:</label>
                            </div>
                        </div>
                        <div  class="row d-flex align-items-left">
                            <div class="col-md-12 label">
                                <b-form-input id="hall" name="hall" size="200px" v-model="hall" placeholder="Hala"></b-form-input>
                            </div>
                        </div>
                        <br><br>
                        <div  class="row d-flex align-items-left">
                            <div class="col-md-12 label">
                                <b-button @click='search'>Pretraži
                                    <b-icon icon="search">Pretraži</b-icon>
                                </b-button>
                            </div>
                        </div>
                        <br><br>
                        <div  class="row d-flex align-items-left">
                            <div class="col-md-12 label">
                                <b-button @click='reset'>Resetuj
                                    <b-icon icon="arrow-counterclockwise">Resetuj</b-icon>
                                </b-button>
                            </div>
                            <br>
                        </div>
                    </div>
                </div>

                <div class="col-md-10 align-items-center fill" style="height: 100%;">
                    <div>
                        <div  class="row d-flex align-items-left">
                            <div class="col-md-12 label">
                                <label class="bold">Moje utakmice</label>
                            </div>
                        </div>
                        <br><br>
                          <div>
                            <b-table striped hover :items="items" :fields="fields"></b-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Toolbar from '@/components/Toolbar.vue'
    import userGames from '../data/userGamesData.js'
    import users from '../data/usersData.js'

    export default {
    name: 'UserGame',
    components: {
        Toolbar
    },
    data(){
        return {
            userGames: userGames,
            users: users,
            date: '',
            time: '',
            hall: '',
            items: {},
            fields: [
                {key: 'user', thClass: 'd-none', tdClass: 'd-none'},
                {key: 'datum' },
                {key: 'vreme' },
                {key: 'hala' }
            ]
        }
    },
    methods:{
        search(){
            var splitDate = this.date != '' ? this.date.split("-") : '';
            var splitTime = this.time != '' ? this.time.split(":") : '';
            var datumString = splitDate != '' ? splitDate[2] + "." + splitDate[1] + "." + splitDate[0] + "." : '';
            var vremeString = splitTime != '' ? splitTime[0] + ":" + splitTime[1] : '';
            
            var user = this.users.find(user => user.loggedIn == true);
            var newItems = this.userGames.filter(game => 
                (game.user == user.id) &&
                (datumString != '' ? game.datum == datumString : (1 == 1)) && 
                (vremeString != '' ? game.vreme == vremeString : (1 == 1)) &&
                (this.hall != '' ? game.hala != ''  && game.hala.toUpperCase().includes(this.hall.toUpperCase()) : (1 == 1))
            );
            this.items = newItems;
        },
        reset(){
            this.date = '';
            this.time = '';
            this.hall = '';
            var user = this.users.find(user => user.loggedIn == true);
            var newItems = this.userGames.filter(game => game.user == user.id);
            this.items = newItems;
        }
    },
    created(){
        var user = this.users.find(user => user.loggedIn == true);
        var newItems = this.userGames.filter(game => game.user == user.id);
        this.items = newItems;
    }


    }
</script>

<style scoped>
    .fill { 
        min-height: 100%;
        height: 100%;
    }
    .label{
        vertical-align: bottom;
    }
    .bold{
        font-weight: bold;
    }
</style>