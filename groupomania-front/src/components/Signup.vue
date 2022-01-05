/* eslint-disable */
<template>
     <div class="main-login-form">
        <div>
            <!--<img id="login__logo" src="../img/icon.svg">-->
            <img id="login__logo" src="../img/icon-left-font-monochrome-black.svg">
        </div>
        <div for="email" class="form-group">
            <input @keyup="validateEmail" type="email" v-model="BodyEmail" class="form-control" id="lg_email" name="lg_email" placeholder="email" required>
            <span v-if="msg.email" class="ErrorMsg">{{msg.email}}</span>
        </div>
        <div class="form-group">
            <input type="text" v-model="BodyUsername" class="form-control" id="lg_username" name="lg_username" placeholder="username" required>
            <span v-if="msg.username" id="ErrorMsgUsername">{{msg.username}}</span>
        </div>

        <div class="form-group">
            <input type="password" v-model="BodyPassword" class="form-control" id="lg_password" name="lg_password" placeholder="password" required>
            <span v-if="msg.password" id="ErrorMsgPassword">{{msg.password}}</span>
        </div>

        <div class="form-group">
            <input type="password" class="form-control" id="lg_password--confirm" name="lg_password" placeholder="confirm password">
            <span v-if="msg.passwordConfirme" id="ErrorMsgPasswordConfirme">{{msg.passwordConfirme}}</span>
        </div>
        <input @click="submit" class="submit--button" type="submit" value="S'inscrire">

        <p>Vous avez déja un compte ? <router-link to="/">Se Connecter</router-link> </p>
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
      BodyUsername: '',
      ErrorMessage: '',
      msg: []
    };
  },
  methods: {
    async submit () {
      console.log('submit');
      console.log(this.BodyEmail);
      try {
        await API.signup({ email: this.BodyEmail, password: this.BodyPassword, username: this.BodyUsername });
        this.$router.push({ name: 'Home' });
      } catch (err) {

      }
    },
    validateEmail () {
      let statusInfo = false;
      const validRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      console.log(this.BodyEmail);
      const messageOk = '';
      const messageNotOk = 'Invalid Email Address';
      // this.msg.email = validRegex.test(this.BodyEmail)
      //   ? ''
      //   : 'Invalid Email Address';
      if (validRegex.test(this.BodyEmail) == true) {
        this.msg.email = messageOk;
        statusInfo = true;
      } else {
        this.msg.email = messageNotOk;
        statusInfo = false;
      }
      console.log(statusInfo);
    }
  }
};
</script>

<style>
</style>
