<!-- src/components/LeadForm.vue -->
<template>
    <form @submit.prevent="submitForm">
      <label for="name">Name:</label>
      <input type="text" v-model="lead.name" required />
  
      <label for="email">Email:</label>
      <input type="email" v-model="lead.email" required />
  
      <label for="phone">Phone:</label>
      <input type="text" v-model="lead.phone" />
  
      <label for="leadStatus">Lead Status:</label>
      <input type="text" v-model="lead.leadStatus" />
  
      <label for="companyName">Company Name:</label>
      <input type="text" v-model="lead.companyName" />
  
      <button type="submit">Save Lead</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        lead: {
          name: '',
          email: '',
          phone: '',
          leadStatus: '',
          companyName: '',
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
  