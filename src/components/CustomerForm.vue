<template>
    <div class="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold mb-4">{{ isEditing ? 'Edit Customer' : 'Add Customer' }}</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            v-model="customer.name"
            id="name"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            v-model="customer.email"
            id="email"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">Phone:</label>
          <input
            type="text"
            v-model="customer.phone"
            id="phone"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label for="address" class="block text-sm font-medium text-gray-700">Address:</label>
          <input
            type="text"
            v-model="customer.address"
            id="address"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label for="companyName" class="block text-sm font-medium text-gray-700">Company Name:</label>
          <input
            type="text"
            v-model="customer.companyName"
            id="companyName"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
        >
          {{ isEditing ? 'Update Customer' : 'Save Customer' }}
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      customer: {
        type: Object,
        default: () => ({
          name: '',
          email: '',
          phone: '',
          address: '',
          companyName: '',
        }),
      },
      isEditing: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      async submitForm() {
        try {
          const method = this.isEditing ? 'PATCH' : 'POST';
          const url = this.isEditing ? `http://localhost:3000/customers/${this.customer.id}` : 'http://localhost:3000/customers';
          
          const response = await fetch(url, {
            method: method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.customer),
          });
  
          if (response.ok) {
            alert(this.isEditing ? 'Customer updated successfully!' : 'Customer added successfully!');
            this.$emit('form-submitted');
          } else {
            throw new Error(this.isEditing ? 'Failed to update customer' : 'Failed to add customer');
          }
        } catch (error) {
          console.error(error);
          alert(error.message);
        }
      },
    },
  };
  </script>
  