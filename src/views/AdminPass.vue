<template>
    <div>
        <AdminToolbar/>
        <div class="container fill align-items-center">
            <br><br><br><br>
            <div class="row d-flex align-items-center fill">
                <div class="col-md-3 align-items-center fill"></div>
                <div class="col-md-6 align-items-center fill">
                    <div>
                        <div class="row">
                            <div class="col-md-6 align-items-center fill">
                                <label :for="password">Stara lozinka:</label><label class="required">*</label>
                            </div>
                            <div class="col-md-6 align-items-center fill">
                                <b-form-input id="password" type="password" name="password" v-model="password" placeholder="Stara lozinka"></b-form-input>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-6 align-items-center fill">
                                <label :for="passwordNew">Nova lozinka:</label><label class="required">*</label>
                            </div>
                            <div class="col-md-6 align-items-center fill">
                                <b-form-input id="passwordNew" type="password" name="passwordNew" v-model="passwordNew" placeholder="Nova lozinka"></b-form-input>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-6 align-items-center fill">
                                <label :for="passwordNewConf">Nova lozinka ponovo:</label><label class="required">*</label>
                            </div>
                            <div class="col-md-6 align-items-center fill">
                                <b-form-input id="passwordNewConf" type="password" name="passwordNewConf" v-model="passwordNewConf" placeholder="Nova lozinka ponovo"></b-form-input>
                            </div>
                        </div>
                        <br>
                        <div  class="row d-flex align-items-center">
                            <div class="col-md-12 label">
                                <b-button @click='change'>Sačuvaj</b-button>
                            </div>
                        </div>
                        <br>

                        <div>
                            <b-alert show dismissible v-model="visible1" variant="danger">
                                Sva obavezna polja moraju biti popunjena.
                            </b-alert>
                        </div>
                        <div>
                            <b-alert show dismissible v-model="visible2" variant="danger">
                                Niste ispravno uneli staru lozinku.
                            </b-alert>
                        </div>
                        <div>
                            <b-alert show dismissible v-model="visible3" variant="danger">
                                Nova lozinka i ponovljena nova lozinka se ne poklapaju.
                            </b-alert>
                        </div>
                        <div>
                            <b-alert show dismissible v-model="visible4" variant="success">
                                Uspešno ste promenili lozinku.
                            </b-alert>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 align-items-center fill"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import AdminToolbar from '@/components/AdminToolbar.vue'
    import users from '../data/usersData.js'

    export default {
        name: 'UserProf',
        components: {
            AdminToolbar
        },
        data() {
            return {
                users: users,
                password:'',
                passwordNew:'',
                passwordNewConf:'',
                visible1: false,
                visible2: false,
                visible3: false,
                visible4: false
            }
        }, 
        created() {

        },
        methods:{
            change(){
                var user = this.users.find(user=> user.username=='admin');
                if (this.password == '' || this.passwordNew == '' || this.passwordNewConf == ''){
                    this.visible1 = true;
                    return;
                }
                if (user.password != this.password){
                    this.visible2 = true;
                    return;
                }
                if (this.passwordNew != this.passwordNewConf){
                    this.visible3 = true;
                    return;
                }
                user.password = this.passwordNew;
                this.visible4 = true;
            }
        }
    }
</script>

<style scoped>
    .fill{
        background-color: #f2f9ff;
    }
    .required{
        color: red;
    }
</style>