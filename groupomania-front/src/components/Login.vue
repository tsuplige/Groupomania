<template>
    <div class="main-login-form">
        <div>
            <!--<img id="login__logo" src="../img/icon.svg">-->
            <img id="login__logo" src="../img/icon-left-font-monochrome-black.svg">
        </div>
        <div class="form-group">
            <input @keyup.enter="submit" v-model="BodyEmail" type="email" class="form-control" id="lg_email" name="lg_email" placeholder="email">
        </div>

        <div class="form-group">
            <input @keyup.enter="submit" v-model="BodyPassword" type="password" class="form-control" id="lg_password" name="lg_password" placeholder="password">
        <span v-if="this.ErrorMessage" class="ErrorMsg">{{this.ErrorMessage}}</span>
        </div>
        <input @click="submit" class="submit--button" id="login--button" type="button" value="Se Connecter">

        <p>Pas de compte ? <router-link to="/signup">S'inscrire</router-link> </p>
    </div>
</template>

<script>
import API from '../services/dataManager';
export default {
  name: 'Login',
  data () {
    return {
      BodyEmail: '',
      BodyPassword: '',
      ErrorMessage: ''
    };
  },
  methods: {
    async submit () {
      console.log('submit');
      console.log(this.BodyEmail);
      try {
        await API.Login({ email: this.BodyEmail, password: this.BodyPassword });
        this.$router.push({ name: 'Messages' });
      } catch (err) {
        this.ErrorMessage = 'mot de passe et/ou mail incorrect'
      }
    }
  }
};
</script>

<style>
</style>
