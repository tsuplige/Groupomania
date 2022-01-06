/* eslint-disable */
<template>
     <div class="main-login-form">
        <div>
            <!--<img id="login__logo" src="../img/icon.svg">-->
            <img id="login__logo" src="../img/icon-left-font-monochrome-black.svg">
        </div>
        <div for="email" class="form-group">
            <input @keyup="validateEmail" @click="validateEmail" type="email" v-model="BodyEmail" class="form-control" id="lg_email" name="lg_email" placeholder="email" required>
            <span v-if="msg.email" class="ErrorMsg">{{msg.email}}</span>
        </div>
        <div class="form-group">
            <input type="text" @keyup="validateUsername" @click="validateUsername" v-model="BodyUsername" class="form-control" id="lg_username" name="lg_username" placeholder="username" required>
            <span v-if="msg.username" class="ErrorMsg">{{msg.username}}</span>
        </div>

        <div class="form-group">
            <input type="password" @keyup="validatePassword" @click="validatePassword" v-model="BodyPassword" class="form-control" id="lg_password" name="lg_password" placeholder="password" required>
            <span v-if="msg.password" class="ErrorMsg">{{msg.password}}</span>
        </div>

        <!-- <div class="form-group">
            <input @keyup="validatePasswordConfirm" v-model="BodyPasswordConfirm" type="password" class="form-control" id="lg_password--confirm" name="lg_password" placeholder="confirm password">
            <span v-if="msg.passwordConfirme" class="ErrorMsg">{{msg.passwordConfirme}}</span>
        </div> -->
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
      BodyEmailStatus: false,
      BodyPassword: '',
      BodyPasswordStatus: false,
      // BodyPasswordConfirm: '',
      BodyUsername: '',
      BodyUsernameStatus: false,
      ErrorMessage: '',
      msg: []
    };
  },
  methods: {
    async submit () {
      console.log('submit');
      console.log(this.BodyEmail);
      if (this.BodyEmailStatus == true && this.BodyPasswordStatus == true && this.BodyUsernameStatus == true) {
        try {
          await API.signup({ email: this.BodyEmail, password: this.BodyPassword, username: this.BodyUsername });
          this.$router.push({ name: 'Home' });
        } catch (err) {

        }
      } else window.alert('données fournis incorrects et/ou inexistantes');
    },
    validateEmail () {
      const validRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      console.log(this.BodyEmail);
      const messageOk = '';
      const messageNotOk = 'Invalid Email Address';
      // this.msg.email = validRegex.test(this.BodyEmail)
      //   ? ''
      //   : 'Invalid Email Address';
      if (validRegex.test(this.BodyEmail) == true) {
        this.msg.email = messageOk;
        this.BodyEmailStatus = true;
      } else {
        this.msg.email = messageNotOk;
        this.BodyEmailStatus = false;
      }
    },
    validateUsername () {
      const validRegex = new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);
      console.log(this.BodyUsername);
      const messageOk = '';
      const messageNotOk = 'Invalid Username';
      // this.msg.email = validRegex.test(this.BodyEmail)
      //   ? ''
      //   : 'Invalid Email Address';
      if (validRegex.test(this.BodyUsername) == true) {
        this.msg.username = messageOk;
        this.BodyUsernameStatus = true;
      } else {
        this.msg.username = messageNotOk;
        this.BodyUsernameStatus = false;
      }
    },
    validatePassword () {
      // const taille = (this.BodyPassword).lenght;
      const messageOk = '';
      const messageNotOk = 'Mots de passe trop court';
      if (this.BodyPassword.length > 8) {
        this.msg.password = messageOk;
        this.BodyPasswordStatus = true;
      } else {
        this.msg.password = messageNotOk;
        this.BodyPasswordStatus = false;
      }
    }//,
    // validatePasswordConfirm () {
    //   let statusInfo = false;
    //   const messageOk = '';
    //   const messageNotOk = 'les Mots de passe doivent être identique';
    //   if (this.BodyPassword != this.BodyPasswordConfirm) {
    //     this.msg.passwordConfirme = messageNotOk;
    //     statusInfo = false;
    //   } else {
    //     this.msg.passwordConfirme = messageOk;
    //     statusInfo = true;
    //   }
    //   console.log(statusInfo);
    // }
  }
};
</script>

<style>
</style>
