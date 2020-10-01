<template>
  <div id="container">
    <AdminToolbar/>
    <div class="container fill align-items-center" style="height: 100%;">
      <div class="row d-flex align-items-center fill" style="height: 100%;">
        <div class="col-md-12 align-items-center border-right fill" style="height: 100%;">
          <br>
          <div  class="row d-flex align-items-left">
              <div class="col-md-12 label" v-for="accomRequest in notDone" :key="accomRequest.user">
                <div>
                  <br>
                    <div class="row lighter">
                        <div class="col-md-1"></div>
                        <div class="col-md-2">
                            <label>Korisnik: </label><label class="bold">{{accomRequest.user}}</label>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-4">
                            <label>Trenutni smeštaj: </label><label class="bold">{{accomodations[+accomRequest.current - 1].name}}</label>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-3">
                          <b-button @click='accept(accomRequest.user, accomRequest.current)' variant="success">Prihvati</b-button>&nbsp;&nbsp;&nbsp;&nbsp;
                          <b-button @click='decline(accomRequest.user, accomRequest.current)' variant="danger">Odbij</b-button>
                        </div>
                    </div>
                  <br>
                </div>
              </div>     
          </div>
          <b-alert show dismissible v-model="visible" variant="danger">
              Ne možete odabrati smeštaj u kome student već odseda.
          </b-alert>
        </div>
      </div>
    </div>
    
    <b-modal ref="my-modal" id="loginModal" title="Odabir novog smeštaja" hide-footer>
      <p class="my-4">Odaberite novi smeštaj za studenta sportistu:</p>
      <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
      <br><br><br><br>
      <b-button class="mt-3" variant="outline-success" block @click="save">Sačuvaj</b-button>
      <b-button class="mt-2" variant="outline-danger" block @click="hideModal">Odustani</b-button>
    </b-modal>

  </div>
</template>

<script>
  import AdminToolbar from '@/components/AdminToolbar.vue'
  import accomRequests from '../data/accomRequestsData.js'
  import accomodations from '../data/accomData.js'
  import users from '../data/usersData.js'

  export default {
  name: 'AdminAccomChg',
  components: {
    AdminToolbar
  },
  data() {
      return {
        accomRequests: accomRequests,
        accomodations: accomodations,
        users: users,
        notDone: [],
        clickedUser: '',
        clickedCurrent: '',
        options: [
          { value: "1", text: "Studentski grad" },
          { value: "2", text: "St. dom kralj Aleksandar I" },
          { value: "3", text: "St. dom 4. april" },
          { value: "4", text: "St. dom Patris Lumumba" },
          { value: "5", text: "St. dom Karaburma" }
        ],
        selected: null,
        visible: false
    }
  }, 
  created() {
    this.notDone = this.accomRequests.filter(req => req.done == false);
    this.visible = false;
  },
  methods:{
    decline(user, current){
      var request = this.accomRequests.find(req => req.user == user && req.current == current);
      request.done = true;
      this.selected = null;
      this.visible = false;
      this.notDone = this.accomRequests.filter(req => req.done == false);
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
          user.accomodation = this.selected;
        }
        var request = this.accomRequests.find(req => req.user == this.clickedUser && req.current == this.clickedCurrent);
        request.done = true;
        this.selected = null;
        this.visible = false;
        this.notDone = this.accomRequests.filter(req => req.done == false);
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

