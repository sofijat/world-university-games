<template>
  <div id="container">
    <AdminToolbar/>
    <div class="container fill align-items-center" style="height: 100%;">
      <div class="row d-flex align-items-center fill" style="height: 100%;">
        <div class="col-md-12 align-items-center border-right fill" style="height: 100%;">
          <br>
          <div  class="row d-flex align-items-left">
              <div class="col-md-12 label" v-for="restRequest in notDone" :key="restRequest.user">
                <div>
                  <br>
                    <div class="row lighter">
                        <div class="col-md-1"></div>
                        <div class="col-md-2">
                            <label>Korisnik: </label><label class="bold">{{restRequest.user}}</label>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-4">
                            <label>Trenutni restoran: </label><label class="bold">{{restaurants[+restRequest.current - 1].name}}</label>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-3">
                          <b-button @click='accept(restRequest.user, restRequest.current)' variant="success">Prihvati</b-button>&nbsp;&nbsp;&nbsp;&nbsp;
                          <b-button @click='decline(restRequest.user, restRequest.current)' variant="danger">Odbij</b-button>
                        </div>
                    </div>
                  <br>
                </div>
              </div>     
          </div>
          <b-alert show dismissible v-model="visible" variant="danger">
              Ne možete odabrati restoran koji je studentu već dodeljen.
          </b-alert>
        </div>
      </div>
    </div>
    
    <b-modal ref="my-modal" id="loginModal" title="Odabir novog restorana" hide-footer>
      <p class="my-4">Odaberite novi restoran za studenta sportistu:</p>
      <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
      <br><br><br><br>
      <b-button class="mt-3" variant="outline-success" block @click="save">Sačuvaj</b-button>
      <b-button class="mt-2" variant="outline-danger" block @click="hideModal">Odustani</b-button>
    </b-modal>

  </div>
</template>

<script>
  import AdminToolbar from '@/components/AdminToolbar.vue'
  import restRequests from '../data/restRequestsData.js'
  import restaurants from '../data/restData.js'
  import users from '../data/usersData.js'

  export default {
  name: 'AdminRestChg',
  components: {
    AdminToolbar
  },
  data() {
      return {
        restRequests: restRequests,
        restaurants: restaurants,
        users: users,
        notDone: [],
        clickedUser: '',
        clickedCurrent: '',
        options: [
          { value: "1", text: "Studentski grad, Studentska menza" },
          { value: "2", text: "St. menza kralj Aleksandar I" },
          { value: "3", text: "St. menza 4. april" },
          { value: "4", text: "St. menza Patris Lumumba" },
          { value: "5", text: "St. menza Karaburma" }
        ],
        selected: null,
        visible: false
    }
  }, 
  created() {
    this.notDone = this.restRequests.filter(req => req.done == false);
    this.visible = false;
  },
  methods:{
    decline(user, current){
      var request = this.restRequests.find(req => req.user == user && req.current == current);
      request.done = true;
      this.selected = null;
      this.visible = false;
      this.notDone = this.restRequests.filter(req => req.done == false);
    },
    accept(user, current){
      this.clickedUser = user;
      this.clickedCurrent = current;
      this.selected = null;
      this.visible = false;
      this.$bvModal.show('loginModal');
    },
    save() {
      if (this.selected != null && this.clickedCurrent != null && this.selected == this.clickedCurrent){
        this.visible = true;
      } else {
        this.visible = false;
        var user = this.users.find(user => user.short == this.clickedUser);
        if (user != null){
          user.restaurant = this.selected;
        }
        var request = this.restRequests.find(req => req.user == this.clickedUser && req.current == this.clickedCurrent);
        request.done = true;
        this.selected = null;
        this.visible = false;
        this.notDone = this.restRequests.filter(req => req.done == false);
      }
      this.$refs['my-modal'].hide();
    },
    hideModal() {
      this.$refs['my-modal'].hide();
    }
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

