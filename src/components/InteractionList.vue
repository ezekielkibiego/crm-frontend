<template>
    <div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="interaction in interactions" :key="interaction.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ interaction.type }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ interaction.description }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ findLeadName(interaction.leadId) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ findCustomerName(interaction.customerId) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(interaction.date) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button @click="editInteraction(interaction)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
              <button @click="deleteInteraction(interaction.id)" class="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      interactions: {
        type: Array,
        default: () => [],
      },
      leads: {
        type: Array,
        default: () => [],
      },
      customers: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      formatDate(dateString) {
        // Convert ISO date string to a human-readable format
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString(); // Adjust this as needed for desired format
      },
      findLeadName(leadId) {
        const lead = this.leads.find(lead => lead.id === leadId);
        return lead ? lead.name : 'Unknown';
      },
      findCustomerName(customerId) {
        const customer = this.customers.find(customer => customer.id === customerId);
        return customer ? customer.name : 'Unknown';
      },
      editInteraction(interaction) {
        this.$emit('edit-interaction', interaction);
      },
      deleteInteraction(id) {
        this.$emit('delete-interaction', id);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  