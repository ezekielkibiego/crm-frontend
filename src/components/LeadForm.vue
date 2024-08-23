<template>
    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Name Input -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          id="name"
          v-model="lead.name"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
  
      <!-- Email Input -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          v-model="lead.email"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
  
      <!-- Phone Input -->
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700">Phone:</label>
        <input
          type="tel"
          id="phone"
          v-model="lead.phone"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
  
      <!-- Address Input -->
      <div>
        <label for="address" class="block text-sm font-medium text-gray-700">Address:</label>
        <input
          type="text"
          id="address"
          v-model="lead.address"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
  
      <!-- Company Name Input -->
      <div>
        <label for="companyName" class="block text-sm font-medium text-gray-700">Company Name:</label>
        <input
          id="companyName"
          v-model="lead.companyName"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
  
      <!-- Lead Status Dropdown -->
      <div>
        <label for="leadStatus" class="block text-sm font-medium text-gray-700">Lead Status:</label>
        <select
          id="leadStatus"
          v-model="lead.leadStatus"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option v-for="status in leadStatuses" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </div>
  
      <!-- Customer Dropdown -->
      <div>
        <label for="customerId" class="block text-sm font-medium text-gray-700">Customer:</label>
        <select
          id="customerId"
          v-model="lead.customerId"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option v-for="customer in customers" :key="customer.id" :value="customer.id">
            {{ customer.name }}
          </option>
        </select>
      </div>
  
      <!-- Submit Button -->
      <button
        type="submit"
        class="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {{ isEditing ? 'Update Lead' : 'Add Lead' }}
      </button>
    </form>
  </template>
  
  <script>
  export default {
    props: {
      lead: {
        type: Object,
        default: () => ({
          name: '',
          email: '',
          phone: '',
          address: '',
          companyName: '',
          leadStatus: '',
          customerId: null,
        }),
      },
      isEditing: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        customers: [],
        leadStatuses: ['New', 'Contacted', 'Qualified', 'Lost'], // Example statuses
      };
    },
    methods: {
      async fetchCustomers() {
        try {
          const response = await fetch('http://localhost:3000/customers'); // Replace with your API endpoint
          if (!response.ok) throw new Error('Failed to fetch customers');
          this.customers = await response.json();
        } catch (error) {
          console.error(error);
        }
      },
      async submitForm() {
        const url = this.isEditing
          ? `http://localhost:3000/leads/${this.lead.id}`
          : 'http://localhost:3000/leads';
  
        const method = this.isEditing ? 'PATCH' : 'POST';
  
        try {
          const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: this.lead.name,
              email: this.lead.email,
              phone: this.lead.phone,
              address: this.lead.address,
              companyName: this.lead.companyName,
              leadStatus: this.lead.leadStatus,
              customerId: this.lead.customerId,
            }),
          });
  
          if (!response.ok) {
            const errorText = await response.text(); // Log error message for more details
            throw new Error(`Failed to save lead: ${errorText}`);
          }
  
          this.$emit('form-submitted');
        } catch (error) {
          console.error(error);
        }
      },
    },
    mounted() {
      this.fetchCustomers();
    },
  };
  </script>
  