<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <b-navbar type="dark" variant="dark">
          <b-navbar-nav>
            <b-nav-item-dropdown text="Moj profil" left>
              <b-dropdown-item href="#" to="/userProf">Osnovni podaci</b-dropdown-item>
              <b-dropdown-item href="#" to="/userPass">Promena lozinke</b-dropdown-item>
              <b-dropdown-item href="#" to="/" @click='reset' >Izloguj se</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Smeštaj" left>
              <b-dropdown-item href="#" to="/userAccom">Lokacija</b-dropdown-item>
              <b-dropdown-item href="#" to="/userAccomRate">Ocene</b-dropdown-item>
              <b-dropdown-item href="#" to="/userAccomComm">Komentari</b-dropdown-item>
              <b-dropdown-item href="#" to="/userAccomChg">Promena</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Restoran" left>
              <b-dropdown-item href="#" to="/userRest">Lokacija</b-dropdown-item>
              <b-dropdown-item href="#" to="/userRestRate">Ocene</b-dropdown-item>
              <b-dropdown-item href="#" to="/userRestComm">Komentari</b-dropdown-item>
              <b-dropdown-item href="#" to="/userRestChg">Promena</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Utakmice" left>
              <b-dropdown-item href="#" to="/userGame">Pregled</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Promotivni sadržaj" left>
              <b-dropdown-item href="#" to="/userPromo">Pregled</b-dropdown-item>
            </b-nav-item-dropdown>
            
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
            <b-nav-item>
                <b-button title="Moj profil" to="/userProf">
                <b-icon icon="person-fill">Moj profil</b-icon>
                </b-button>
            </b-nav-item>

            <b-nav-item>
              <b-button title="Početna strana" to="/userhome">
                <b-icon icon="house-fill">Početna strana</b-icon>
              </b-button>
            </b-nav-item>

            <b-nav-item>
              <b-button title="Izloguj se" to="/" @click='reset'>
                <b-icon icon="power" to="/">Izloguj se</b-icon>
              </b-button>
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar>
      </div>  
    </div>

  </div>
</template>

<script>
    import users from '../data/usersData.js'
    export default {
        name: 'Toolbar',
        data() {
          return {
            users: users
          }
        },
        methods:{
        reset(){
          this.users.forEach((u) => {
            u.loggedIn = false;
          });
        }
        }
    }
</script>

<style scoped>
    
</style>