<template>
  <div class="mx-2 my-2">
    <v-row class="my-2" justify="space-between" align="center">
      <v-col cols="auto">
        <h3>Courier list</h3>
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
            <th class="text-left">Login</th>
            <th class="text-left">Created at</th>
            <th class="text-left"> </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in desserts" :key="item.guid + i">
            <td>{{ i + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.login }}</td>
            <td>{{ item.created_at | timeformatter }}</td>
            <td><v-btn class=" text-capitalize ml-2" @click="deleteCourier(item.guid)" outlined color="red" text fab small><v-icon>mdi-delete</v-icon></v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
     <v-row justify="center">
        <v-dialog width="450" v-model="dialog" persistent max-width="500">
      <template v-slot:activator="{  }">
      </template>
      <v-card width="500pxd">
        <v-card-title class="headline">Courier panel</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.name" label="Name" />
          <v-text-field v-model="form.login" label="Login" />
          <v-text-field v-model="form.password" label="Password" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">cancel</v-btn>
          <v-btn color="blue darken-1" dark @click="createCourier">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </div>
</template>

<script>
import Courier from '../services/Courier'

export default {
  data () {
    return {
      dialog: false,
      desserts: [],
      form: {
        login: '',
        name: '',
        password: ''
      }
    }
  },
  methods: {

    createCourier () {
      Courier.postCourier({
        ...this.form
      }).then(res => {
        this.dialog = false
        window.location.reload()
        this.form = {}
      }).catch(err => {
        console.log(err)
      })
    },

    deleteCourier (id) {
      Courier.deleteCourier({ guid: id }).then(res => {
        console.log(res)
        alert('deleted successfully')
        this.desserts = this.desserts.filter(el => el.id !== id)
        window.location.reload()
      }).catch(e => {
        alert('This products contains some orders; we cannot delete it')
      })
    },

    getCouriers () {
      Courier.getCouriers().then(res => {
        console.log(res)
        this.desserts = res.couriers.filter(el => el.merchant_id === this.$route.params.merchantId)
      })
    }
  },
  created () {
    this.getCouriers()
  }
}
</script>

<style></style>
