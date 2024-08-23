<!-- src/components/LeadList.vue -->
<template>
    <div>
      <h2>Leads</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Lead Status</th>
            <th>Company Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lead in leads" :key="lead.id">
            <td>{{ lead.name }}</td>
            <td>{{ lead.email }}</td>
            <td>{{ lead.phone }}</td>
            <td>{{ lead.leadStatus }}</td>
            <td>{{ lead.companyName }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        leads: [], // Replace with API call
      }
    },
    created() {
      // Fetch leads from API
    },
  }
  </script>
  