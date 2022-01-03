<template>
  <div>
    <PostMessage />
    <ListMessages />
  </div>
</template>

<script>
// @ is an alias to /src
// import Message from '@/components/Message.vue';
import PostMessage from '@/components/PostMessage.vue';
import ListMessages from '@/components/ListMessages.vue';
export default {
  name: 'Messages',
  components: {
    PostMessage,
    ListMessages
  },
  data () {
    return {
      posts: []
    };
  }
};
</script>

<style>
</style>
