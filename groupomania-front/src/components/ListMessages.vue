<template>
  <ul id="post">
    <li class="post__container" v-for="post in posts" :key="post.id">
      <div class="post__container--header">
        <!-- <div class="user_link" data-lien="user.html?id={{ post.userId }}"> -->
        <h3 class="username">{{ post.username }}</h3>
        <!-- </div> -->
      </div>
      <div class="post__container--content">
        <p class="postText">{{ post.content }}</p>
      </div>
      <div class="post__container--footer">
        <div @click="checkRight(post.user_id, post.id)" class="more">
          <i class="fas fa-times commentaire_logo comm_txt more_logo"></i>
        </div>

        <!-- <div data-lien="./comment.html?id={{ post.id }}"> -->
        <router-link
          style="text-decoration: none"
          :to="{ path: '/comment/' + post.id }"
          custom
        >
          <div class="comment">
            <i class="far fa-comment-dots commentaire_logo comm_txt"></i>
            <p class="comm_txt">Commenter</p>
          </div>
        </router-link>
        <!-- </div> -->
      </div>
    </li>
  </ul>
</template>

<script>
import API from '../services/dataManager';
export default {
  name: 'ListMessages',
  components: {
  },
  data () {
    return {
      posts: []
    };
  },
  methods: {
    async checkRight (user_id, MessageId) {
      const LocalS = JSON.parse(localStorage.app);
      if (user_id == LocalS.user_id) {
        console.log('DELETE');
        try {
          await API.DeleteMessage({ message_id: MessageId });
          console.log('///', this.refresh);
          this.refresh += 1;
          console.log('///', this.refresh);
        } catch (err) {

        }
      } else window.alert("vous n'etes pas autorisé a supprimmer ce message !");
      console.log(user_id);
      console.log(localStorage.user_id);
    }
  },
  async created () {
    const message = await API.getAllData();
    this.posts = message;
  }
};
</script>
