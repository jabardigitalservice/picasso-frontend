<template>
  <div class="ma-3">
    <v-row>
      <v-col class="ma-4">
        <search
          :list-query="listQuery"
          :handle-search="handleSearch"
        />
      </v-col>
    </v-row>
    <costume-card
      icon="mdi-clipboard-text"
      title="Jabatan List"
      class="px-5 py-0"
      :on-add="handleAdd"
    >
      <table-component
        :list="list"
        :query="listQuery"
        :limit="listQuery.limit"
        :table-headers="tableHeader"
        :on-delete-click="handleDelete"
        :on-update-click="handleUpdate"
        :on-main-duties="handleMainDuties"
      />
      <pagination
        :total="totalPage"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        :on-next="onNext"
      />
    </costume-card>
    <dialog-form-master-jabatan
      :show-dialog="showForm"
      :show.sync="showForm"
      :refresh-page.sync="isRefresh"
      :is-edit="isEdit"
      :form-body="form"
      :form.sync="form"
    />
    <dialog-delete
      :show-dialog="showDelete"
      :show.sync="showDelete"
      :refresh-page.sync="isRefresh"
      :store-path-delete="'jabatan/deleteJabatan'"
      :id-data="idData"
    />
    <dialog-list-tupoksi-jabatan
      :show-dialog="showDialogTupoksi"
      :show.sync="showDialogTupoksi"
      :detail-jabatan="detailJabatan"
      :jabatan-detail.sync="detailJabatan"
    />
  </div>
</template>

<script>
  export default {
    name: 'ListJabatan',
    data: () => ({
      list: [],
      totalPage: 0,
      showForm: false,
      showDelete: false,
      isRefresh: false,
      isEdit: false,
      showDialogTupoksi: false,
      detailJabatan: {},
      idData: null,
      form: {},
      listQuery: {
        limit: 10,
        page: 1,
      },
      tableHeader: [
        { text: 'Divisi', value: 'name_satuan_kerja', sortable: false },
        { text: 'Nama Jabatan', value: 'name_jabatan', sortable: false },
        { text: 'Deskripsi Jabatan', value: 'description' },
        { text: 'Aksi', width: 300, value: 'actions' },
      ],
    }),
    watch: {
      isRefresh (value) {
        if (value) {
          this.handleSearch()
          this.isRefresh = false
        }
      },
      'listQuery.search' (value) {
        if ((value === undefined) && (value.length <= 2)) return
        this.listQuery.page = 1
        this.handleSearch()
      },
    },
    async mounted () {
      await this.handleSearch()
    },
    methods: {
      async handleSearch () {
        const response = await this.$store.dispatch('jabatan/getListJabatan', this.listQuery)
        this.totalPage = response._meta.totalPage
        if (response.results) {
          this.list = response.results
        }
      },
      async onNext () {
        await this.handleSearch()
      },
      handleMainDuties (item) {
        this.showDialogTupoksi = true
        this.detailJabatan = item
      },
      handleAdd () {
        this.isEdit = false
        this.showForm = true
      },
      handleUpdate (item) {
        this.showForm = true
        this.form = item
        this.isEdit = true
      },
      handleDelete (item) {
        this.idData = item.id
        this.showDelete = true
      },
    },
  }
</script>
