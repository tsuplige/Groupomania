/* eslint-disable */
<template>
   <div>
        <ul id="Cpost">
            <li v-for="post in post" :key="post.id" class="Cpost__container">
                <div class="Cpost__container--header">
                    <h3 class="username">{{ post.username }}</h3>
                </div>
                <div class="Cpost__container--content">
                    <p class="CpostText">{{ post.content }}</p>
                </div>
                <div class="Cpost__container--footer">
                    <div class="more">
                        <i @click="checkRight(post.user_id, post.id)" class="fas fa-times commentaire_logo comm_txt more_logo"></i>
                    </div>
                </div>
                <form id="comment--input">
                    <textarea @keyup.enter="submitComment" v-model="BodyCommentsText" id="comment--input__block" placeholder="  Écrire un commentaire"></textarea>
                </form>
                <ul class="comment--container">
                    <li v-for="comment in comments" :key="comment.id" class="comment--container__block">
                        <div class="comment--header">
                            <h4>{{ comment.username }}</h4>
                            <i @click="checkRightCom(comment.user_id, comment.id)" class="fas fa-times deleteCom"></i>
                        </div>
                        <div class="comment--content">
                            <p>{{ comment.content }}</p>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
// @ is an alias to /src
// import Message from '@/components/Message.vue';
import API from '../services/dataManager';
export default {
  name: 'GetComments',
  data () {
    return {
      post: {},
      comments: {},
      BodyCommentsText: ''
    };
  },
  methods: {
    async submitComment () {
      console.log('submit');
      console.log(this.BodyCommentsText);
      try {
        const UserInfo = JSON.parse(localStorage.app);
        await API.PostComment({ message_content: this.BodyCommentsText, user_id: UserInfo.user_id, message_id: this.$route.params.id });
        location.reload();
      } catch (err) {

      }
    },
    async checkRight (user_id, MessageId) {
      const UserInfo = JSON.parse(localStorage.app);
      if (user_id == UserInfo.user_id) {
        console.log('DELETEMMMM');
        try {
          await API.DeleteMessage({ message_id: MessageId });
          this.$router.push({ path: '' });
        } catch (err) {

        }
      } else window.alert("vous n'etes pas autorisé a supprimmer ce message !");
      console.log(user_id);
      console.log(localStorage.user_id);
    },
    async checkRightCom (user_id, MessageId) {
      const UserInfo = JSON.parse(localStorage.app);
      if (user_id == UserInfo.user_id) {
        console.log('DELETE');
        try {
          await API.DeleteMessage({ message_id: MessageId });
        } catch (err) {

        }
      } else window.alert("vous n'etes pas autorisé a supprimmer ce message !");
      console.log(user_id);
      console.log(localStorage.user_id);
    }
  },
  async created () {
    const message = await API.getComment({ message_id: this.$route.params.id });
    this.post = message.message;
    this.comments = message.comment;
  }
};
</script>

<style></style>
