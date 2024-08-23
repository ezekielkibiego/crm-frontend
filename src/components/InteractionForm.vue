<template>
    <form @submit.prevent="submitInteraction" class="space-y-4">
      <div>
        <label for="type" class="block text-sm font-medium text-gray-700">Type:</label>
        <input
          id="type"
          v-model="interaction.type"
          type="text"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
  
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description:</label>
        <textarea
          id="description"
          v-model="interaction.description"
          rows="3"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        ></textarea>
      </div>
  
      <div>
        <label for="leadId" class="block text-sm font-medium text-gray-700">Lead:</label>
        <select
          id="leadId"
          v-model.number="interaction.leadId"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="" disabled>Select a lead</option>
          <option v-for="lead in leads" :key="lead.id" :value="lead.id">
            {{ lead.name }}
          </option>
        </select>
      </div>
  
      <div>
        <label for="customerId" class="block text-sm font-medium text-gray-700">Customer:</label>
        <select
          id="customerId"
          v-model.number="interaction.customerId"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="" disabled>Select a customer</option>
          <option v-for="customer in customers" :key="customer.id" :value="customer.id">
            {{ customer.name }}
          </option>
        </select>
      </div>
  
      <button
        type="submit"
        class="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {{ isEditing ? 'Update Interaction' : 'Add Interaction' }}
      </button>
    </form>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  
  export default {
    props: {
      interaction: {
        type: Object,
        default: () => ({
          type: '',
          description: '',
          customerId: null,
          leadId: null,
        }),
      },
      isEditing: {
        type: Boolean,
        default: false,
      },
      customers: {
        type: Array,
        default: () => [],
      },
      leads: {
        type: Array,
        default: () => [],
      },
    },
    setup(props, { emit }) {
      const interaction = ref({ ...props.interaction });
  
      // Watch for changes in props.interaction to update local state
      watch(() => props.interaction, (newVal) => {
        interaction.value = { ...newVal };
      }, { immediate: true });
  
      // Function to submit the interaction form
      const submitInteraction = async () => {
        // Ensure leadId is set and is an integer
        if (!interaction.value.leadId || isNaN(interaction.value.leadId)) {
          alert('Please select a valid lead.');
          return;
        }
  
        // Set the current date and time
        interaction.value.date = new Date().toISOString(); // ISO format: "2024-08-23T10:41:15.134Z"
  
        // Determine the URL and HTTP method based on whether we're editing
        const url = props.isEditing
          ? `http://localhost:3000/interactions/${interaction.value.id}`
          : 'http://localhost:3000/interactions';
  
        const method = props.isEditing ? 'PATCH' : 'POST';
  
        try {
          // Send the form data to the server
          const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(interaction.value),
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to save interaction: ${errorData.message || response.statusText}`);
          }
  
          // Emit event to notify parent component of successful submission
          emit('interaction-submitted');
        } catch (error) {
          console.error('Submit Interaction Error:', error);
          alert(`Error: ${error.message}`);
        }
      };
  
      return {
        interaction,
        submitInteraction,
      };
    },
  };
  </script>
  