<template>
  <div id="container">
    <AdminToolbar/>
    <div class="container fill align-items-center" style="height: 100%;">
        <div class="row d-flex align-items-center fill" style="height: 100%;">
            <div class="col-md-6 align-items-center border-right fill" style="height: 100%;">
                <br><br><br><br>
                <div  class="row d-flex align-items-center">
                    <div class="col-md-6 label">
                        <label :for="name">Ime:</label>
                    </div>
                    <div class="col-md-6">
                        <b-form-input id="name" name="name" size="200px" v-model="name" placeholder="Ime"></b-form-input>
                    </div>
                </div>
                <br>
                <div  class="row d-flex align-items-center">
                    <div class="col-md-6 label">
                        <label :for="surname">Prezime:</label>
                    </div>
                    <div class="col-md-6">
                        <b-form-input id="surname" name="surname" size="200px" v-model="surname" placeholder="Prezime"></b-form-input>
                    </div>
                </div>
                <br>
                <div  class="row d-flex align-items-center">
                    <div class="col-md-6 label">
                        <label :for="phone">Kontakt telefon:</label>
                    </div>
                    <div class="col-md-6">
                        <b-form-input id="phone" name="phone" size="200px" v-model="phone" placeholder="Kontakt telefon"></b-form-input>
                    </div>
                </div>
                <br>
                <div  class="row d-flex align-items-center">
                    <div class="col-md-6 label">
                        <label :for="address">Adresa:</label>
                    </div>
                    <div class="col-md-6">
                        <b-form-textarea id="textarea" placeholder="Adresa" v-model="address"></b-form-textarea>
                    </div>
                </div>
                <br>
                <div  class="row d-flex align-items-center">
                    <div class="col-md-12 label">
                        <b-button @click='save'>Sačuvaj</b-button>
                    </div>
                </div>
                <br>
                <div>
                    <b-alert show dismissible v-model="visible" variant="success">
                        Uspešno ste sačuvali osnovne podatke.
                    </b-alert>
                </div>
            </div>
            <div class="col-md-6 fill" style="height: 100%;">
                <br><br><br><br>
                <div  class="row d-flex align-items-center">
                    <div class="col-md-6 label">
                        <label :for="username">Korisničko ime:</label>
                    </div>
                    <div class="col-md-6">
                        <b-form-input id="username" name="username" size="200px" disabled="true" v-model="username" placeholder="Korisničko ime"></b-form-input>
                    </div>
                </div>
                <br>
                <div  class="row d-flex align-items-center">
                    <div class="col-md-6 label">
                        <label :for="password">Lozinka:</label>
                    </div>
                    <div class="col-md-6">
                        <b-form-input id="password" name="password" size="200px" disabled="true" v-model="password" placeholder="Lozinka"></b-form-input>
                    </div>
                </div>
                <br>
                <div  class="row d-flex align-items-center">
                    <div class="col-md-12 label">
                        <b-button @click='chgPass'>Promeni lozinku</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import AdminToolbar from '@/components/AdminToolbar.vue'
  import users from '../data/usersData.js'
  import router from '../router/index.js'

  export default {
  name: 'UserProf',
  components: {
    AdminToolbar
  },
  data() {
      return {
        users: users,
        name: '',
        surname: '',
        phone: '',
        address: '',
        visible: false
    }
  }, 
  created() {
      this.name = this.users.find(user=> user.username=='admin').name;
      this.surname = this.users.find(user=> user.username=='admin').surname;
      this.phone = this.users.find(user=> user.username=='admin').phone;
      this.address = this.users.find(user=> user.username=='admin').address;
      this.username = this.users.find(user=> user.username=='admin').username;
      this.password = '***********';
      this.visible = false;
  },
  methods:{
      save(){
          var user = this.users.find(user=> user.username=='admin');
          user.name = this.name;
          user.surname = this.surname;
          user.phone = this.phone;
          user.address = this.address;
          this.visible = true;
      },
      chgPass(){
          router.push('adminPass');
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
    .label{
        vertical-align: bottom;
    }
</style>