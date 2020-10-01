<template>
    <div id="container">
        <AdminToolbar/>
        <div class=" fill align-items-center">
            <div class="row d-flex align-items-center fill" style="height: 100%;">
                <div class="col-md-12 align-items-left border-right fill" style="height: 100%;">
                    <div  class="row d-flex align-items-left">
                        <div class="col-md-12 label">
                            <label class="bold">Sve utakmice</label>
                        </div>
                    </div>
                    <br>
                    <div>
                        <b-table striped hover :items="items" :fields="fields">
                            <template v-slot:cell(hala)="data">
                                <b-button @click='reserve(data.item)' v-if="data.item.hala == '' && data.item.reservation == false" variant="info">Rezerviši</b-button>
                                {{ data.item.hala == "" ? "" : data.item.hala }}
                                <label class="bold red">{{ data.item.reservation == true ? "Zahtev poslat" : "" }}</label>
                            </template>
                        </b-table>
                    </div>
                </div>
            </div>
        </div>

    <b-modal ref="my-modal" id="gameModal" title="Odabir hale" hide-footer>
      <p class="my-4">Odaberite jednu od hala koje su slobodne u tom terminu:</p>
      <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
      <br><br><br><br>
      <b-button class="mt-3" variant="outline-success" block @click="save">Sačuvaj</b-button>
      <b-button class="mt-2" variant="outline-danger" block @click="hideModal">Odustani</b-button>
    </b-modal>

    <b-modal ref="my-modal-req" id="reqModal" title="Odabir hale" hide-footer>
      <p class="my-4">Nažalost, ne postoji nijedna slobodna hala u tom terminu.</p>
      <p class="my-4">Ukoliko želite da pošaljete zahtev za dodeljivanje nove hale kliknite dugme 'Pošalji'</p>
      <br><br><br><br>
      <b-button class="mt-3" variant="outline-success" block @click="sendReq">Pošalji</b-button>
      <b-button class="mt-2" variant="outline-danger" block @click="hideModalReq">Odustani</b-button>
    </b-modal>

    </div>
</template>

<script>
    import AdminToolbar from '@/components/AdminToolbar.vue'
    import games from '../data/gameData.js'
    import userGames from '../data/userGamesData.js'

    export default {
    name: 'AdminGame',
    components: {
        AdminToolbar
    },
    data() {
        return {
            games: games,
            userGames: userGames,
            items: {},
            options: [
                { value: "1", text: "Hala Pionir, Čarlija Čaplina 39" },
                { value: "2", text: "Hala Sportova, Pariske komune 20" },
                { value: "3", text: "Sportski centar Zvezdara, Vjekoslava Kovača 11" }
            ],
            clickedGame: null,
            selected: null,
            fields: [
                {key: 'id', thClass: 'd-none', tdClass: 'd-none'},
                {key: 'datum' },
                {key: 'vreme' },
                {key: 'hala' },
                {key: 'reservation', thClass: 'd-none', tdClass: 'd-none'},
            ]
        }
    },
    created() {
        this.items = games;
    },
    methods:{
        reserve(game){
            this.clickedGame = game;
            this.options = [
                { value: "1", text: "Hala Pionir, Čarlija Čaplina 39" },
                { value: "2", text: "Hala Sportova, Pariske komune 20" },
                { value: "3", text: "Sportski centar Zvezdara, Vjekoslava Kovača 11" }
            ]

            var found1 = this.games.find(game => game.datum == this.clickedGame.datum && game.vreme == this.clickedGame.vreme && game.hala == this.options[0].text);
            var found2 = this.games.find(game => game.datum == this.clickedGame.datum && game.vreme == this.clickedGame.vreme && game.hala == this.options[1].text);
            var found3 = this.games.find(game => game.datum == this.clickedGame.datum && game.vreme == this.clickedGame.vreme && game.hala == this.options[2].text);

            var newOptions = [];
            var inc = 0;
            if (found1 == null || found1 == undefined){
                newOptions[+inc] = this.options[0];
                inc = +inc + 1;
            }
            if (found2 == null || found2 == undefined){
                newOptions[+inc] = this.options[1];
                inc = +inc + 1;
            }
            if (found3 == null || found3 == undefined){
                newOptions[+inc] = this.options[2];
                inc = +inc + 1;
            }
            this.options = newOptions;

            if (+this.options.length > 0){
                this.$bvModal.show('gameModal');
            } else {
                this.$bvModal.show('reqModal');
            }
        },
        hideModal() {
            this.$refs['my-modal'].hide();
        },
        save() {
            var myGame = this.games.find(game => game.datum == this.clickedGame.datum && game.vreme == this.clickedGame.vreme && game.hala == "");
            myGame.hala = this.options[+this.selected - 1].text;

            var userGame = this.userGames.find(game => game.datum == this.clickedGame.datum && game.vreme == this.clickedGame.vreme && game.hala == "");
            if (userGame != null && userGame != undefined){
                userGame.hala = this.options[+this.selected - 1].text;
            }

            this.$refs['my-modal'].hide();
        },
        sendReq(){
            var myGame = this.games.find(game => game.datum == this.clickedGame.datum && game.vreme == this.clickedGame.vreme && game.hala == "");
            myGame.reservation = true;

            this.$refs['my-modal-req'].hide();
        },
        hideModalReq(){
            this.$refs['my-modal-req'].hide();
        }

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
    .red{
        color: crimson;
    }
</style>
