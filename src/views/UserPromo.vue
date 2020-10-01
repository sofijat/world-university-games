<template>
    <div id="container">
        <Toolbar/>
        <div class="container fill align-items-center" style="height: 100%;">
            <div class="row d-flex align-items-center fill" style="height: 100%;">
                <div class="col-md-2 align-items-center fill" style="height: 100%;">

                </div>
                <div class="col-md-8 align-items-center fill" style="height: 100%;">
                    <div>
                        <div  class="row d-flex align-items-center">
                            <div class="col-md-12 label" v-for="userPromo in userPromos" :key="userPromo.id">
                                <br>
                                <div class="row lighter align-items-start">
                                    <div class="col-md-12 ">
                                    <router-link class="link" :to='/userPromoDetails/+userPromo.id'>
                                        {{userPromo.title}}
                                    </router-link>
                                    <br>
                                    <br>
                                    <label>{{userPromo.intro}}</label>
                                    <br>
                                    <div>
                                        <b-button variant="light" @click='like(userPromo.id)' v-if='isLikedByMe(userPromo.id) == false'>
                                            <b-icon icon="heart" variant="danger">Like</b-icon>
                                        </b-button>
                                        <b-button variant="light" @click='unlike(userPromo.id)' v-if='isLikedByMe(userPromo.id) == true'>
                                            <b-icon icon="heart-fill" variant="danger">Like</b-icon>
                                        </b-button>
                                        <label>{{userPromo.likes}}</label>
                                    </div>
                                    <br>
                                    </div>
                                </div>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2 align-items-center fill" style="height: 100%;">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Toolbar from '@/components/Toolbar.vue'
    import userPromos from '../data/userPromoData.js'
    import users from '../data/usersData.js'

    export default {
    name: 'UserPromo',
    components: {
        Toolbar
    },
    data(){
        return {
            userPromos: userPromos,
            users: users
        }
    },
    methods:{
        like(_id){
            var index = +_id - 1;
            var user = this.users.find(user=> user.loggedIn == true);
            this.userPromos[index].likes = +this.userPromos[index].likes + 1;
            this.userPromos[index].likedBy.push(user.id);
        },
        unlike(_id){
            var index = +_id - 1;
            var user = this.users.find(user=> user.loggedIn == true);
            this.userPromos[index].likes = +this.userPromos[index].likes - 1;

            var newLikedBy = this.userPromos[index].likedBy.filter(i => i != user.id);
            this.userPromos[index].likedBy = newLikedBy;
        },
        isLikedByMe(_id){
            var index = +_id - 1;
            var user = this.users.find(user=> user.loggedIn == true);
            var res = this.userPromos[index].likedBy.find(i => i == user.id);
            if (res != null) return true;
            return false;
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
    .link{
        color: crimson;
        text-decoration-line: underline;
        font-weight: bold;
    }
</style>

