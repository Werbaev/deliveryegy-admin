<template>
  <div class="mx-2 my-2">
    <v-row class="my-2" justify="space-between" align="center">
      <v-col cols="auto">
        <h3>Merchant Branch list ( {{ merchantTitle }})</h3>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="dialog = true" dark>create</v-btn>
      </v-col>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Number</th>
            <th class="text-left">Name</th>
            <th class="text-left">Address</th>
            <th class="text-left">Created at</th>
            <th class="text-left">  </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in desserts" :key="item.guid + i">
            <td>{{ i + 1 }}</td>
            <td style="cursor: pointer" @click="$router.push({ name: 'Merchant-branches-id', params: { merchantBranchId: item.guid }})">{{ item.name }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.created_at | timeformatter }}</td>
            <td>
              <v-btn class=" text-capitalize ml-2" @click="updateMerchantBranch(item)" outlined color="orange darken-1" text fab small><v-icon>mdi-pen</v-icon></v-btn>
              <v-btn class=" text-capitalize ml-2" @click="deleteMerchantBranch(item.guid)" outlined color="red" text fab small><v-icon>mdi-delete</v-icon></v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
     <v-row justify="center">
    <v-dialog width="450" v-model="dialog" persistent max-width="500">
      <template v-slot:activator="{  }">
      </template>
      <v-card width="500pxd">
        <v-card-title class="headline">Merchant branch panel</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.name" label="Name" />
          <v-text-field v-model="form.address" label="Address here"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">cancel</v-btn>
          <v-btn :color="form.guid ? 'green darken-1' : 'blue darken-1'" dark @click="submitForm">{{ form.guid ? 'Update' : ' Create' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </div>
</template>

<script>
import MerchantBranch from '../../services/MerchantBranch'
import Merchant from '../../services/Merchant'

export default {
  data () {
    return {
      dialog: false,
      desserts: [],
      products: [],
      merchantTitle: '',
      form: {
        address: '',
        merchant_id: this.$route.params.merchantId,
        name: ''
      }
    }
  },
  methods: {
    submitForm (item = this.form) {
      MerchantBranch[item.guid ? 'updateMerchantBranch' : 'postMerchantBranch']({
        ...this.form
      }).then(res => {
        this.dialog = false
        console.log(res)
        window.location.reload()
        this.form = {}
      }).catch(err => {
        console.log(err)
      })
    },
    updateMerchantBranch (item) {
      this.dialog = true
      this.form = item
      console.log(item)
    },
    deleteMerchantBranch (id) {
      console.log(id)
      MerchantBranch.deleteMerchantBranch({ guid: id }).then(res => {
        console.log(res)
        alert('deleted successfully')
        window.location.reload()
      }).catch(e => {
        alert('This products contains some orders; we cannot delete it')
      })
    },
    getMerchantBranch (id) {
      Merchant.getMerchant(id).then(res => {
        console.log(res)
        this.merchantTitle = res.name
      })
      MerchantBranch.getMerchantBranches(id).then(res => {
        console.log(res)
        this.desserts = res.merchant_branches
        // this.getProducts()
      })
    }
  },
  created () {
    this.getMerchantBranch(this.$route.params.merchantId)
  }
}
</script>

<style></style>
