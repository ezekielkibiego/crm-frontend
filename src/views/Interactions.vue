<template>
    <div>
      <h2 class="text-xl font-bold mb-4">Interactions</h2>
  
      <InteractionForm
        :leadId="leadId"
        :leads="leads"
        :customers="customers"
        :interaction="currentInteraction"
        :isEditing="isEditing"
        @interaction-submitted="fetchInteractions"
      />
  
      <div class="mt-6">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="interaction in interactions" :key="interaction.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ interaction.type }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ interaction.description }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ getLeadName(interaction.leadId) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ getCustomerName(interaction.customerId) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(interaction.date) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button @click="editInteraction(interaction)" class="text-blue-500 hover:text-blue-700">Edit</button>
                <button @click="deleteInteraction(interaction.id)" class="text-red-500 hover:text-red-700 ml-2">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import InteractionForm from '../components/InteractionForm.vue';
  
  export default {
    components: { InteractionForm },
    props: {
      leadId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        interactions: [],
        currentInteraction: null,
        isEditing: false,
        leads: [], // Add leads array
        customers: [], // Add customers array
      };
    },
    methods: {
      async fetchInteractions() {
        try {
          const response = await fetch(`http://localhost:3000/interactions?leadId=${this.leadId}`);
          if (!response.ok) throw new Error('Failed to fetch interactions');
          this.interactions = await response.json();
        } catch (error) {
          console.error(error);
        }
      },
      async fetchLeads() {
        try {
          const response = await fetch(`http://localhost:3000/leads`);
          if (!response.ok) throw new Error('Failed to fetch leads');
          this.leads = await response.json();
        } catch (error) {
          console.error(error);
        }
      },
      async fetchCustomers() {
        try {
          const response = await fetch(`http://localhost:3000/customers`);
          if (!response.ok) throw new Error('Failed to fetch customers');
          this.customers = await response.json();
        } catch (error) {
          console.error(error);
        }
      },
      async deleteInteraction(id) {
        try {
          const response = await fetch(`http://localhost:3000/interactions/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to delete interaction');
          this.fetchInteractions();
        } catch (error) {
          console.error(error);
        }
      },
      editInteraction(interaction) {
        this.currentInteraction = { ...interaction };
        this.isEditing = true;
      },
      getLeadName(leadId) {
        const lead = this.leads.find(lead => lead.id === leadId);
        return lead ? lead.name : 'Unknown';
      },
      getCustomerName(customerId) {
        const customer = this.customers.find(customer => customer.id === customerId);
        return customer ? customer.name : 'Unknown';
      },
      formatDate(dateString) {
        // Convert date to the desired format: YYYY-MM-DDTHH:MM
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      },
    },
    async mounted() {
      await Promise.all([this.fetchInteractions(), this.fetchLeads(), this.fetchCustomers()]);
    },
  };
  </script>
  