<template>
  <div class="mx-2 my-2">
    <v-row class="my-2" justify="space-between" align="center">
      <v-col cols="auto">
        <h3>Category list</h3>
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
            <th class="text-left"> </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in desserts" :key="item.guid + i"> <!-- [{ name, created_at, .....}, {}, {}] -->
            <td>{{ i + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.created_at | timeformatter }}</td>
            <td><v-btn class=" text-capitalize ml-2" @click="deleteCategory(item.guid)" outlined color="red" text fab small><v-icon>mdi-delete</v-icon></v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
     <v-row justify="center">
        <v-dialog width="450" v-model="dialog" persistent max-width="500">
      <template v-slot:activator="{  }">
      </template>
      <v-card width="500pxd">
        <v-card-title class="headline">Category panel</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.name" label="Name" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">cancel</v-btn>
          <v-btn color="blue darken-1" dark @click="createCategory">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </div>
</template>

<script>
import Categories from '../services/Categories'

export default {
  data () {
    return {
      dialog: false,
      desserts: [],
      form: {
        name: ''
      }
    }
  },
  methods: {

    createCategory () {
      Categories.postCategory({
        name: this.form.name,
        merchant_id: this.$route.params.merchantId
      }).then(res => {
        this.dialog = false
        window.location.reload()
        this.form = {}
      }).catch(err => {
        console.log(err)
      })
    },

    deleteCategory (id) {
      Categories.deleteCategory({ guid: id }).then(res => {
        console.log(res)
        alert('deleted successfully')
        this.desserts = this.desserts.filter(el => el.id !== id)
        window.location.reload()
      }).catch(e => {
        alert('This products contains some orders; we cannot delete it')
      })
    },

    getCategories () {
      Categories.getCategories().then(res => {
        console.log(res)
        this.desserts = res.categories.filter(el => el.merchant_id === this.$route.params.merchantId)
      })
    }
  },
  created () {
    this.getCategories()
  }
}
</script>

<style></style>
