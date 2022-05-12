<template>
  <div class="mx-2 my-2">
    <v-row class="my-2" justify="space-between" align="center">
      <v-col cols="auto">
        <h3>Orders list</h3>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="dialog = true">Create</v-btn>
      </v-col>
    </v-row>
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab> New </v-tab>
      <v-tab> Restaurant accept</v-tab>
      <v-tab> Restaurant Ready </v-tab>
      <v-tab> Courier accept </v-tab>
      <v-tab> Courier on way </v-tab>
      <v-tab> Delivered </v-tab>
      <v-tab> All </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
          <v-tab-item>
            <OrderTable status="new" :desserts="desserts" :getStatus="getStatus" :deleteOrder="deleteOrder"/>
          </v-tab-item>
          <v-tab-item>
            <OrderTable status="restaurant-proccess" :desserts="desserts" :getStatus="getStatus" :deleteOrder="deleteOrder"/>
          </v-tab-item>
          <v-tab-item>
            <OrderTable status="restaurant-ready" :desserts="desserts" :getStatus="getStatus" :deleteOrder="deleteOrder"/>
          </v-tab-item>
          <v-tab-item>
            <OrderTable status="courier-accepted" :desserts="desserts" :getStatus="getStatus" :deleteOrder="deleteOrder"/>
          </v-tab-item>
          <v-tab-item>
            <OrderTable status="courier-on-way" :desserts="desserts" :getStatus="getStatus" :deleteOrder="deleteOrder"/>
          </v-tab-item>
          <v-tab-item>
            <OrderTable status="courier-delivered" :desserts="desserts" :getStatus="getStatus" :deleteOrder="deleteOrder"/>
          </v-tab-item>
          <v-tab-item>
            <OrderTable status="all" :desserts="desserts" :getStatus="getStatus" :deleteOrder="deleteOrder"/>
          </v-tab-item>
    </v-tabs-items>
     <v-row justify="center">
    <v-dialog width="450" v-model="dialog" persistent max-width="500">
      <template v-slot:activator="{  }">
      </template>
      <v-card width="500px">
        <v-card-title class="headline">Order create panel</v-card-title>
        <v-card-text>
          <v-select
              v-model="form.merchant_id"
              :items="merchants"
              item-text="name"
              item-value="guid"
              label="Select Merchant"
              @change="selectBranchList"
              persistent-hint
              return-object
              single-line
          ></v-select>
          <v-select
              v-model="form.branch_id"
              :hint="`Please, branch here`"
              :items="merchantBranchList"
              @change="getMerchantBranchProducts"
              item-text="name"
              item-value="guid"
              label="Select Branch"
              persistent-hint
              return-object
              single-line
          ></v-select>
           <v-select
            v-model="form.product_id"
            :hint="`You can select product you want to order`"
            :items="products"
            multiple
            item-text="name"
            item-value="guid"
            label="Select product"
            persistent-hint
            return-object
            single-line
          ></v-select>
          <v-select
              v-model="form.user_id"
              :hint="`Please, select user here`"
              :items="users"
              item-text="name"
              item-value="guid"
              label="Select user"
              persistent-hint
              return-object
              single-line
          ></v-select>
          <v-select
              v-model="form.delivery_type"
              :hint="`Please, select delivery type`"
              :items="['delivery', 'self-pick-up']"
              item-text="name"
              item-value="guid"
              label="Select delivery type"
              persistent-hint
              single-line
          ></v-select>
          <v-select
              v-model="form.payment_type"
              :hint="`Please, select payment type`"
              :items="['cash', 'card']"
              item-text="name"
              item-value="guid"
              label="Select payment type"
              persistent-hint
              single-line
          ></v-select>
          <v-text-field v-model="form.address" label="Address" />
          <v-text-field v-model="form.comment" label="Comment"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">cancel</v-btn>
          <v-btn color="blue darken-1" dark @click="orderNow">Order now</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </div>
</template>

<script>
import Orders from '../services/Orders'
import OrderTable from './Orders/index.vue'
import Products from '../services/Products'
import Users from '../services/Users'
import MerchantBranch from '../services/MerchantBranch'
import Merchant from '../services/Merchant'

export default {
  components: {
    OrderTable
  },
  data () {
    return {
      dialog: false,
      tab: 0,
      desserts: [],
      products: [],
      merchants: [],
      users: [],
      merchantBranchList: [],
      form: {
        address: '',
        merchant_id: '',
        comment: '',
        product_id: '',
        delivery_type: 'delivery',
        payment_type: 'card',
        user_id: '',
        branch_id: '322656d6-97f9-4a7e-8270-e31aee2d76db'

      }
    }
  },
  methods: {

    selectBranchList (e) {
      console.log(e)
      Merchant.getMerchantBranch(e.guid).then(res => {
        console.log(res)
        this.merchantBranchList = res.merchant_branches
      })
      Merchant.getMerchantProducts(e.guid).then(res => {
        this.products = res.products
      })
    },
    getMerchantBranchProducts (e) {
      console.log(e)
    },
    getStatus (status) {
      switch (status) {
        case 'new':
          return 'New'
        case 'restaurant-proccess':
          return 'Restaurant process'
        case 'restaurant-ready':
          return 'Restaurant ready'
        case 'courier-accepted':
          return 'Courier accepted'
        case 'courier-delivered':
          return 'Courier delivered'
        default:
          return 'New'
      }
    },
    getUsers () {
      Users.getUsers().then(res => {
        console.log(res)
        this.users = res.users
      }).catch(err => {
        console.log(err)
      })
    },
    orderNow () {
      console.log(this.form)
      Orders.postOrder({
        address: this.form.address,
        comment: this.form.comment,
        product_id: this.form.product_id.map(el => el.id),
        user_id: this.form.user_id.guid,
        branch_id: this.form.branch_id.guid,
        delivery_type: this.form.delivery_type,
        payment_type: this.form.payment_type
      }).then(res => {
        this.dialog = false
        console.log(res)
        // window.location.reload()
        this.form = {}
      }).catch(err => {
        console.log(err)
      })
    },
    getMerchanBranchList () {
      MerchantBranch.getMerchantBranchList().then(res => {
        console.log(res)
        this.merchantBranchList = res.merchant_branches
      })
    },
    getMerchants () {
      Merchant.getMerchants().then(res => {
        console.log(res)
        this.merchants = res.merchants
      })
    },
    deleteOrder (id) {
      console.log(id)
      Orders.deleteOrder({ guid: id }).then(res => {
        console.log(res)
        alert('deleted successfully')
        this.desserts = this.desserts.filter(el => el.id !== id)
        window.location.reload()
      }).catch(e => {
        alert('This products contains some orders; we cannot delete it')
      })
    },
    getProducts () {
      Products.getProducts().then(ress => {
        this.products = ress.products
      })
    },
    getOrders () {
      Orders.getOrders().then(res => {
        console.log(res)
        this.desserts = res.orders
        this.getProducts()
      })
    }
  },
  created () {
    this.getOrders()
    this.getUsers()
    this.getMerchants()
    this.getMerchanBranchList()
  }
}
</script>

<style></style>
