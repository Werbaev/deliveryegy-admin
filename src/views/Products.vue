<template>
  <div class="mx-2 my-2">
    <v-row class="my-2" justify="space-between" align="center">
      <v-col cols="auto">
        <h3 class=" text-uppercase text-left">Product list</h3>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="dialog = true" dark>Create</v-btn>
      </v-col>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Order number</th>
            <th class="text-left">Name</th>
            <th class="text-left">Price</th>
            <th class="text-left">Category</th>
            <th class="text-left">Created at</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in products" :key="item.guid + i">
            <td>{{ i + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.price | moneyFormatter }} uzs</td>
            <td>
                <v-chip
                    class="ma-2"
                    color="primary"
                    >
                    {{ getCategoriesChip(item.category_id) }}
                </v-chip>
            </td>
            <td>{{ item.created_at | timeformatter }}</td>
            <td><v-btn class=" text-capitalize ml-2" @click="deleteProduct(item.guid)" outlined color="primary" text fab small><v-icon color="error">mdi-delete</v-icon></v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
     <v-row justify="center">
    <v-dialog width="400" v-model="dialog" persistent max-width="550">
      <template v-slot:activator="{  }">
      </template>
       <v-card width="500pxd">
        <v-card-title class="headline">Product panel</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.name" label="Name" />
          <v-text-field v-model="form.price" label="Price"/>
          <v-text-field v-model="form.image" label="Image"/>
           <v-select
              v-model="form.category_id"
              :items="categories"
              item-text="name"
              item-value="guid"
              label="Select category"
              persistent-hint
              return-object
              single-line
          ></v-select>
          <label for="item">Options</label>
          <v-row v-for="(ls, i) in form.options" :key="i">
            <v-col cols="6">
                <v-text-field label="Option name" v-model="ls.name"></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field label="Option price" v-model="ls.price"></v-text-field>
            </v-col>
          </v-row>
          <v-btn block color="green" @click="addRow" text outlined class="rounded-lg">Add new row</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">cancel</v-btn>
          <v-btn color="blue darken-1" dark @click="createProduct">Create product</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </div>
</template>

<script>
import Products from '../services/Products'
import Categories from '../services/Categories'
import Merchant from '../services/Merchant'

export default {
  data () {
    return {
      dialog: false,
      desserts: [],
      products: [],
      categories: [],
      users: [],
      form: {
        image: '',
        category_id: '',
        name: '',
        price: 0,
        options: []
      }
    }
  },
  computed: {
    getCourseInId () {
      return ''
    }
  },
  methods: {
    addRow () {
      this.form.options.push({
        name: '',
        price: 0
      })
    },
    createProduct () {
      console.log(this.form)
      Products.postProduct({
        category_id: this.form.category_id.guid,
        name: this.form.name,
        image: this.form.image,
        price: parseInt(this.form.price),
        options: this.form.options.map(el => ({ ...el, price: parseInt(el.price) }))
      }).then(res => {
        console.log(res)
        alert('Post has successfully added')
        window.location.reload()
      }).catch(er => {
        console.log(er)
      })
    },
    deleteProduct (id) {
      console.log(id)
      Products.deleteProduct({ guid: id }).then(res => {
        console.log(res)
        alert('Deleted Successfully')
        window.location.reload()
      }).catch(e => {
        alert('This products contains some orders; we cannot delete it')
      })
    },
    getCategories () {
      Categories.getCategories().then(res => {
        console.log(res)
        this.categories = res.categories
      })
    },
    getCategoriesChip (id) {
      const [item] = this.categories.filter(el => el.guid === id)
      console.log(item)
      return item.name
    },
    getProducts () {
      Merchant.getMerchantProducts(this.$route.params.merchantId).then(ress => {
        console.log(ress)
        this.products = ress.products
      })
      Categories.getCategories().then(res => {
        this.categories = res.categories
      })
    }
  },
  filters: {
    timeformatter (time) {
      const [date, timeRange] = time.split('T')
      return date + ' ' + timeRange.substring(0, 5)
    },
    moneyFormatter (money) {
      return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }
  },
  created () {
    this.getProducts()
    // this.getUsers()
  }
}
</script>

<style></style>
