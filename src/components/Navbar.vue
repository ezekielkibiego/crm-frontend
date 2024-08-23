<template>
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-white text-2xl font-bold">
          <router-link to="/" class="hover:text-gray-400">CRM App</router-link>
        </div>
        <div>
          <router-link to="/" class="text-white hover:text-gray-400 mx-4">Customers</router-link>
          <router-link to="/leads" class="text-white hover:text-gray-400 mx-4">Leads</router-link>
          <router-link to="/interactions" class="text-white hover:text-gray-400 mx-4">Interactions</router-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  
  <style scoped>
  /* Additional styles for the Navbar if needed */
  </style>
  