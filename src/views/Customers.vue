<template>
    <div>
      <AddCustomer
        v-if="selectedCustomer"
        :customer="selectedCustomer"
        :isEditing="true"
        @form-submitted="refreshList"
      />
      <AddCustomer
        v-else
        :isEditing="false"
        @form-submitted="refreshList"
      />
      <CustomerList ref="customerList" @edit-customer="handleEditCustomer" />
    </div>
  </template>
  
  <script>
  import AddCustomer from '../components/CustomerForm.vue';
  import CustomerList from '../components/CustomerList.vue';
  
  export default {
    components: {
      AddCustomer,
      CustomerList,
    },
    data() {
      return {
        selectedCustomer: null,
      };
    },
    methods: {
      handleEditCustomer(customer) {
        this.selectedCustomer = { ...customer };
      },
      refreshList() {
        this.selectedCustomer = null;
        if (this.$refs.customerList && typeof this.$refs.customerList.fetchCustomers === 'function') {
          this.$refs.customerList.fetchCustomers();
        }
      },
    },
  };
  </script>