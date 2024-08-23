<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Leads</h2>
      
      <!-- Search Input -->
      <div class="mb-4">
        <input
          v-model="searchQuery"
          @input="filterLeads"
          type="text"
          placeholder="Search by name, email, or company"
          class="p-2 border border-gray-300 rounded"
        />
      </div>
  
      <!-- Leads Table -->
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="lead in filteredLeads" :key="lead.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ lead.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ lead.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ lead.phone }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ lead.address }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ lead.companyName }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ lead.leadStatus }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ lead.customerName }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button @click="editLead(lead)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      leads: {
        type: Array,
        required: true,
      },
      customers: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        searchQuery: '',
        filteredLeads: this.leads, // Initialize with all leads
      };
    },
    methods: {
      filterLeads() {
        const query = this.searchQuery.toLowerCase();
        this.filteredLeads = this.leads.filter(lead => {
          return (
            lead.name.toLowerCase().includes(query) ||
            lead.email.toLowerCase().includes(query) ||
            lead.companyName.toLowerCase().includes(query)
          );
        });
      },
      editLead(lead) {
        this.$emit('edit-lead', lead);
      },
      deleteLead(leadId) {
        this.$emit('delete-lead', leadId);
      },
    },
    watch: {
      leads(newLeads) {
        // Reapply filter when leads change
        this.filterLeads();
      },
    },
  };
  </script>
  