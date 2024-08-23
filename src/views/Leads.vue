<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Leads</h1>
      <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr class="bg-gray-200">
            <th class="py-2 px-4 border-b">Name</th>
            <th class="py-2 px-4 border-b">Email</th>
            <th class="py-2 px-4 border-b">Phone</th>
            <th class="py-2 px-4 border-b">Status</th>
            <th class="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lead in leads" :key="lead.id">
            <td class="py-2 px-4 border-b">{{ lead.name }}</td>
            <td class="py-2 px-4 border-b">{{ lead.email }}</td>
            <td class="py-2 px-4 border-b">{{ lead.phone }}</td>
            <td class="py-2 px-4 border-b">{{ lead.status }}</td>
            <td class="py-2 px-4 border-b">
              <router-link :to="{ name: 'edit-lead', params: { id: lead.id } }" class="text-blue-500">Edit</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Leads',
    data() {
      return {
        leads: [], // Replace with API call
      };
    },
    created() {
      this.fetchLeads();
    },
    methods: {
      async fetchLeads() {
        try {
          const response = await fetch('http://localhost:3000/leads'); // Adjust the URL to your API endpoint
          this.leads = await response.json();
        } catch (error) {
          console.error('Error fetching leads:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add scoped styles for this component if needed */
  </style>
  