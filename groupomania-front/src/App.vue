<template>
  <div>
    <header>
        <div id="header__content">
            <router-link style="text-decoration: none" to="/messages" custom>
              <img id="header__logo" src="./img/icon-left-font-monochrome-white.svg">
            <!-- <a href="#" aria-label="lien vers La Page User">Profil</a>-->
            </router-link>
            <div>
              <router-link style="text-decoration: none" to="" custom>
                <i @click="disconnect" class="fas fa-sign-out-alt disconnect"></i>
              </router-link>
            </div>
        </div>
  </header>
  <main  id="app">

  </main>
    <router-view/>
  </div>
</template>

<script>
export default {
  disconnect () {
    console.log('deconnecter');
    localStorage.clear();
    this.$router.push('/');
  }
}
</script>

<style>
@import './sass/stylesheet.css';
</style>
