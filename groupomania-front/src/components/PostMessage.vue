<template>
    <section id="message--bloc">
        <form id="Message__input">
            <textarea id="message"></textarea>
            <div id="submit__bar">
                <input type="submit" id="message__button" value="Poster" />
            </div>
        </form>
    </section>
</template>

<script>
import API from '../services/dataManager';
export default {
  name: 'Login',
  data () {
    return {
      BodyEmail: '',
      BodyPassword: ''

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

      }
    }
  }
};
</script>

<style>
</style>