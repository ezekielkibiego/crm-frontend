<!-- src/views/Interactions.vue -->
<template>
    <div>
      <h1>Interactions</h1>
      <InteractionForm />
      <!-- Display interactions here -->
    </div>
  </template>
  
  <script>
  import InteractionForm from '../components/InteractionForm.vue'
  
  export default {
    components: {
      InteractionForm,
    },
  }
  </script>
  