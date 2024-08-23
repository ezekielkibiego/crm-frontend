<template>
    <div>
      
      <LeadForm
        v-if="selectedLead"
        :lead="selectedLead"
        :isEditing="true"
        @form-submitted="refreshLeadsList"
      />
      <LeadForm
        v-else
        :isEditing="false"
        @form-submitted="refreshLeadsList"
      />
      <LeadList
        :leads="leads"
        @edit-lead="handleEditLead"
        @delete-lead="handleDeleteLead"
      />
    </div>
  </template>
  
  <script>
  import LeadForm from '../components/LeadForm.vue';
  import LeadList from '../components/LeadList.vue';
  
  export default {
    components: {
      LeadForm,
      LeadList,
    },
    data() {
      return {
        leads: [],
        customers: [],
        selectedLead: null,
      };
    },
    methods: {
      async fetchLeads() {
        try {
          const [leadsResponse, customersResponse] = await Promise.all([
            fetch('http://localhost:3000/leads'),
            fetch('http://localhost:3000/customers'),
          ]);
  
          if (!leadsResponse.ok || !customersResponse.ok) {
            throw new Error('Failed to fetch leads or customers');
          }
  
          const leads = await leadsResponse.json();
          const customers = await customersResponse.json();
  
          this.customers = customers;
  
          this.leads = leads.map(lead => {
            const customer = customers.find(c => c.id === lead.customerId);
            return {
              ...lead,
              customerName: customer ? customer.name : 'Unknown Customer',
            };
          });
        } catch (error) {
          console.error(error);
        }
      },
      handleEditLead(lead) {
        this.selectedLead = { ...lead };
      },
      handleDeleteLead(leadId) {
        this.deleteLead(leadId);
      },
      async deleteLead(leadId) {
        try {
          const response = await fetch(`http://localhost:3000/leads/${id}`, {
            method: 'DELETE',
          });
  
          if (!response.ok) {
            throw new Error('Failed to delete lead');
          }
  
          this.refreshLeadsList();
        } catch (error) {
          console.error(error);
        }
      },
      refreshLeadsList() {
        this.selectedLead = null;
        this.fetchLeads();
      },
    },
    mounted() {
      this.fetchLeads();
    },
  };
  </script>
  