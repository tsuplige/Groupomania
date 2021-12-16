<template>
  <div class="post__container">
    <div class="post__container--header">
      <!-- <div class="user_link" data-lien="user.html?id={{userId}}"> -->
        <h3 class="username">{{ username }}</h3>
      <!-- </div> -->
    </div>
    <div class="post__container--content">
      <p class="postText">{{ content }}</p>
    </div>
    <div class="post__container--footer">
      <div class="more">
        <i class="fas fa-ellipsis-h commentaire_logo comm_txt"></i>
      </div>

      <!-- <div data-lien="./comment.html?id={{id}}"> -->
        <div class="comment">
          <i class="far fa-comment-dots commentaire_logo comm_txt"></i>
          <p class="comm_txt">Commenter</p>
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Message',
  props: {
    userId: {
      type: Number,
      default: 0
    },
    username: {
      type: String,
      default: 'Test'
    },
    content: {
      type: String,
      default: 'un super message'
    },
    id: {
      type: Number,
      default: 0
    }
  },
  async Messages () {
    return await axios.get('http://localhost:3000/api/messages/');
  }
}
</script>
