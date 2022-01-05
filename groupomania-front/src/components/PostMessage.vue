<template>
    <section id="message--bloc">
        <form id="Message__input">
            <textarea v-model="BodyMessagesText" id="message"></textarea>
            <div id="submit__bar">
                <input @click="submit" type="submit" id="message__button" value="Poster" />
            </div>
        </form>
    </section>
</template>

<script>
import API from '../services/dataManager';
export default {
  name: 'PostMessage',
  data () {
    return {
      BodyMessagesText: ''
    };
  },
  methods: {
    async submit () {
      console.log('submit');
      console.log(this.BodyMessagesText);
      const UserInfo = JSON.parse(localStorage.app);
      console.log('____________________________________', UserInfo.user_id);
      try {
        await API.postMessage({ message_content: this.BodyMessagesText, user_id: UserInfo.user_id });
      } catch (err) {

      }
    }
  }
};
</script>

<style>
</style>
