<template>
  <ul id="post">
    <li class="post__container" v-for="post in posts" :key="post.id" >
      <div class="post__container--header">
      <!-- <div class="user_link" data-lien="user.html?id={{ post.userId }}"> -->
        <h3 class="username">{{ post.username }}</h3>
      <!-- </div> -->
    </div>
    <div class="post__container--content">
      <p class="postText">{{ post.content }}</p>
    </div>
    <div class="post__container--footer">
      <div class="more">
        <i class="fas fa-ellipsis-h commentaire_logo comm_txt"></i>
      </div>

      <!-- <div data-lien="./comment.html?id={{ post.id }}"> -->
        <div class="comment">
          <i class="far fa-comment-dots commentaire_logo comm_txt"></i>
          <p class="comm_txt">Commenter</p>
        </div>
      <!-- </div> -->
    </div>
    </li>
  </ul>
</template>

<script>
// @ is an alias to /src
// import Message from '@/components/Message.vue';
import API from '../services/dataManager';

export default {
  name: 'Messages',
  data () {
    return {
      posts: []
    };
  },
  async created () {
    const message = await API.getAllData();
    this.posts = message.data;
    console.log(this.posts.data);
  }
};
</script>

<style>
</style>
