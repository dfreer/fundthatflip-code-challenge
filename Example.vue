<template>
  <div>
    <h1>Example</h1>
    <table>
      <thead>
        <tr>
          <th v-for="column in columns">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="row.id">
          <td v-for="column in columns">
            {{ row[column.field] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ExampleService } from '@/services'
export default {
  data: () => ({
    columns: [
      { header: 'Name', field: 'name' },
      { header: 'Port', field: 'port' },
      { header: 'Upload Directory', field: 'remote_upload_dir' },
      { header: 'Download Directory', field: 'remote_download_dir' },
      { header: 'Return File Name', field: 'return_file_name_pattern' },
      { header: 'Actions', field: 'actions' },
    ],
    data: [],
    loading: false,
  }),
  methods: {
    fetchTableData() {
      this.loading = true
      ExampleService.index()
        .then(({ data }) => {
          this.data = data
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
    destroy(id) {
      ExampleService.destroy(id)
        .then(this.fetchTableData)
        .catch(() => {})
    },
    edit({ id }) {
      ExampleService.show(id)
        .then((data) => {
          console.log('open edit modal with data')
        })
        .catch(() => {})
    },
  },
}
</script>
