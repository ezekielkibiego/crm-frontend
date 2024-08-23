<template>
  <div id="app">
    <Navbar />
    <div class="container mx-auto p-4">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>
