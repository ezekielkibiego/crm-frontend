<!-- src/components/InteractionForm.vue -->
<template>
    <form @submit.prevent="submitForm">
      <label for="type">Type:</label>
      <input type="text" v-model="interaction.type" required />
  
      <label for="description">Description:</label>
      <input type="text" v-model="interaction.description" required />
  
      <label for="leadId">Lead ID:</label>
      <input type="number" v-model="interaction.leadId" required />
  
      <label for="customerId">Customer ID:</label>
      <input type="number" v-model="interaction.customerId" required />
  
      <button type="submit">Save Interaction</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        interaction: {
          type: '',
          description: '',
          leadId: null,
          customerId: null,
        },
      }
    },
    methods: {
      submitForm() {
        // Handle form submission
      },
    },
  }
  </script>
  