<template>
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Customers</h2>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            <th class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="customer in customers" :key="customer.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ customer.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ customer.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ customer.phone }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ customer.address }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ customer.companyName }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button @click="editCustomer(customer)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        customers: [],
      };
    },
    methods: {
      async fetchCustomers() {
        try {
          const response = await fetch('http://localhost:3000/customers');
          if (!response.ok) throw new Error('Failed to fetch customers');
          this.customers = await response.json();
        } catch (error) {
          console.error(error);
        }
      },
      editCustomer(customer) {
        this.$emit('edit-customer', customer);
      },
    },
    mounted() {
      this.fetchCustomers();
    },
  };
  </script>
  
