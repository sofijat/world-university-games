<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <b-navbar type="dark" variant="dark">
          <b-navbar-nav>
            <b-nav-item-dropdown text="Moj profil" left>
              <b-dropdown-item href="#" to="/adminProf">Osnovni podaci</b-dropdown-item>
              <b-dropdown-item href="#" to="/adminPass">Promena lozinke</b-dropdown-item>
              <b-dropdown-item href="#" to="/">Izloguj se</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Zahtevi" left>
              <b-dropdown-item href="#" to="/adminAccomChg">Promena smeštaja</b-dropdown-item>
              <b-dropdown-item href="#" to="/adminRestChg">Promena restorana</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Utakmice" left>
              <b-dropdown-item href="#" to="/adminGame">Pregled</b-dropdown-item>
            </b-nav-item-dropdown>
            
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
            <b-nav-item>
                <b-button title="Moj profil" to="/adminProf">
                <b-icon icon="person-fill">Moj profil</b-icon>
                </b-button>
            </b-nav-item>

            <b-nav-item>
              <b-button title="Početna strana" to="/adminHome">
                <b-icon icon="house-fill">Početna strana</b-icon>
              </b-button>
            </b-nav-item>

            <b-nav-item>
              <b-button title="Izloguj se" to="/">
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
    export default {
        name: 'AdminToolbar'
    }
</script>

<style scoped>
    
</style>