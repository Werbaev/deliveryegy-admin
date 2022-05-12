<template>
  <div class="mx-2 my-2">
    <v-row class="my-2" justify="space-between" align="center">
      <v-col cols="auto">
        <h3>Merchants list</h3>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" dark @click="dialog=true">create</v-btn>
      </v-col>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Order number</th>
            <th class="text-left">Name</th>
            <th class="text-left">Created at</th>
            <th class="text-left">Comission</th>
            <th class="text-left">Delivery time</th>
            <th class="text-left"> </th>
          </tr>
        </thead>
        <tbody>
          <tr class="pointer" v-for="(item,i) in desserts" :key="item.guid + i" @click="clickRow(item.guid)">
            <td>{{ i + 1 }}</td>
            <td style="cursor: pointer">{{ item.name }}</td>
            <td>{{ item.created_at | timeformatter }}</td>
            <td>{{ item.comission }}</td>
            <td>{{ item.delivery_time }}</td>
            <td>
              <v-btn class=" text-capitalize ml-2" @click="edit(item, $event)" outlined color="orange" text fab small><v-icon>mdi-pen</v-icon></v-btn>
              <v-btn class=" text-capitalize ml-2" @click="deleteMerchant(item.guid)" outlined color="red" text fab small><v-icon>mdi-delete</v-icon></v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
     <v-row justify="center">
        <v-dialog width="450" v-model="dialog" persistent max-width="500">
      <template v-slot:activator="{  }">
      </template>
      <v-card width="500pxd">
        <v-card-title class="headline">Merchant panel</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.name" label="Name" />
          <v-text-field v-model="form.logo" label="Logo" />
          <v-text-field v-model="form.background_image" label="Background image" />
          <v-text-field v-model="form.delivery_time" label="Delivery time" type="number" />
          <v-text-field v-model="form.description" label="Description" type="text" />
          <v-text-field v-model="form.comission" label="Comission"  type="number"/>
          <v-switch v-model="form.status" label="Status" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">cancel</v-btn>
          <v-btn color="blue darken-1" v-if="!form.guid" dark @click="createMerchant">Create</v-btn>
          <v-btn color="green darken-1" v-else dark @click="updateMerchant">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </div>
</template>

<script>
import Merchant from '../../services/Merchant.js'

export default {
  data () {
    return {
      dialog: false,
      desserts: [],
      form: {
        background_image: '',
        comission: 0,
        delivery_time: 0,
        logo: '',
        name: '',
        description: '',
        status: true
      }
    }
  },
  methods: {
    edit (element, event) {
      event.stopPropagation()
      this.dialog = true
      this.form = element
    },
    clickRow (guid) {
      this.$router.push('/merchants/' + guid + '/merchant-branches')
    },

    updateMerchant () {
      Merchant.putMerchant({
        ...this.form
      }).then(res => {
        console.log(res)
        this.dialog = false
        window.location.reload()
        this.form = {}
      }).catch(err => {
        console.log(err)
      })
    },

    createMerchant () {
      Merchant.postMerchant({
        ...this.form,
        comission: parseInt(this.form.comission),
        delivery_time: parseInt(this.form.delivery_time)
      }).then(res => {
        console.log(res)
        this.dialog = false
        window.location.reload()
        this.form = {}
      }).catch(err => {
        console.log(err)
      })
    },
    deleteMerchant (id) {
      Merchant.deleteMerchant({ guid: id }).then(res => {
        console.log(res)
        alert('deleted successfully')
        this.desserts = this.desserts.filter(el => el.id !== id)
        window.location.reload()
      }).catch(e => {
        alert('This products contains some orders; we cannot delete it')
      })
    },

    getMerchants () {
      Merchant.getMerchants().then(res => {
        console.log(res)
        this.desserts = res.merchants
      })
    }
  },
  created () {
    this.getMerchants()
  }
}
</script>

<style></style>
