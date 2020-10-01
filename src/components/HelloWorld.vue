<template>
  <div class="container">

    <div class="row d-flex align-items-center">
      <div class="col-md-12">
        <br>
        <h2>Dobrodošli na sajt Univerzijade 2020</h2>
      </div>
    </div>

    <div class="row d-flex align-items-center">
      <div class="col-md-12">
        <label :for="username">Korisničko ime:</label>
      </div>
    </div>

    <div class="row d-flex align-items-center">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <b-form-input id="username" name="username" size="200px" v-model="username" placeholder="Korisnicko ime"></b-form-input>
      </div>
      <div class="col-md-4"></div>
    </div>

    <div class="row d-flex align-items-center">
      <div class="col-md-12">
        <br>
        <label :for="password">Lozinka:</label>
      </div>
    </div>

    <div class="row d-flex align-items-center">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <b-form-input id="password" type="password" name="password" size="200px" v-model="password" placeholder="Lozinka" style-class="sirina"></b-form-input>
        <br>
      </div>
      <div class="col-md-4"></div>
    </div>

    <div class="row d-flex align-items-center">
      <div class="col-md-12">
        <b-button @click='login'>Uloguj se</b-button>
        <br>
      </div>
    </div>

    <div class="row d-flex align-items-center">
      <div class="col-md-12">
        <br>
      </div>
    </div>
    
    <div>
        <b-alert show dismissible v-model="visible" variant="danger">
            Uneli ste pogrešno korisničko ime i/ili lozinku.
        </b-alert>
    </div>
    
  </div>
</template>

<script>
import users from '../data/usersData.js'
import router from '../router/index.js'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      types: [
        'text',
        'password'
      ],
      username: '',
      password: '',
      users: users,
      visible: false
    }
  },
  created() {
    this.visible = false;
  },
  methods:{
    login(){
        var user = this.users.find(user=> user.username==this.username & user.password==this.password);
        if (user == null){
          this.visible = true;
          return;
        }
        if(user.username == 'admin'){
          //alert('Admin');
          router.push('adminHome');
        } else {
          router.push('userHome');
        }
        this.users.forEach((u) => {
          u.loggedIn = false;
        });
        user.loggedIn = true;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.container {
  background-color: #f2f9ff;
}
</style>
