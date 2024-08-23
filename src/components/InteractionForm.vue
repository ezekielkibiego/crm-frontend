<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">{{ isEditing ? 'Edit Lead' : 'Add Lead' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="form.name"
            id="name"
            type="text"
            required
            class="p-2 border border-gray-300 rounded"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            id="email"
            type="email"
            required
            class="p-2 border border-gray-300 rounded"
          />
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
          <input
            v-model="form.phone"
            id="phone"
            type="text"
            class="p-2 border border-gray-300 rounded"
          />
        </div>
        <div class="mb-4">
          <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
          <input
            v-model="form.address"
            id="address"
            type="text"
            class="p-2 border border-gray-300 rounded"
          />
        </div>
        <div class="mb-4">
          <label for="companyName" class="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            v-model="form.companyName"
            id="companyName"
            type="text"
            class="p-2 border border-gray-300 rounded"
          />
        </div>
        <div class="mb-4">
          <label for="leadStatus" class="block text-sm font-medium text-gray-700">Lead Status</label>
          <input
            v-model="form.leadStatus"
            id="leadStatus"
            type="text"
            class="p-2 border border-gray-300 rounded"
          />
        </div>
        <div class="mb-4">
          <label for="customerName" class="block text-sm font-medium text-gray-700">Customer</label>
          <input
            v-model="form.customerName"
            id="customerName"
            type="text"
            class="p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      lead: {
        type: Object,
        default: () => ({}),
      },
      isEditing: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        form: {
          name: '',
          email: '',
          phone: '',
          address: '',
          companyName: '',
          leadStatus: '',
          customerName: '',
        },
      };
    },
    watch: {
      lead(newLead) {
        if (this.isEditing) {
          this.form = { ...newLead };
        } else {
          this.resetForm();
        }
      },
    },
    methods: {
      handleSubmit() {
        // Logic to add or update lead
        // After successful submission, reset the form
        this.resetForm();
        this.$emit('lead-added');
      },
      resetForm() {
        this.form = {
          name: '',
          email: '',
          phone: '',
          address: '',
          companyName: '',
          leadStatus: '',
          customerName: '',
        };
      },
    },
  };
  </script>
  