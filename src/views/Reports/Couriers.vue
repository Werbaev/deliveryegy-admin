<template>
  <div class="mx-2 my-2">
    <v-row class="my-2" justify="space-between" align="center">
      <v-col cols="auto">
        <h3>Courier Report</h3>
      </v-col>
            <v-col cols="4">
         <v-simple-table  dense>
                <template v-slot:default>
                  <thead>
                    <tr style="border: 1px solid black">
                      <th class="text-left"></th>
                      <th class="text-left"></th>
                    </tr>
                  </thead>
                     <tbody>
                      <tr>
                        <td><strong>Courier name</strong></td>
                        <td>{{ courier.name }}</td>
                      </tr>
                      <tr>
                        <td><strong>Courier earning (for delivery)</strong></td>
                        <td>{{ $moneyFormat(getDeliveryTotal()) }}</td>
                      </tr>
                      <tr>
                        <td><strong>Courier take with cash</strong></td>
                        <td>{{ $moneyFormat(getCashTotal()) }}</td>
                      </tr>
                      <tr>
                        <td><strong>Need to pay for courier (delivery)</strong></td>
                        <td>{{ $moneyFormat(getDeliveryTotal() - getCashTotal()) }}</td>
                      </tr>
                     </tbody>
                </template>
         </v-simple-table>
      </v-col>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">№</th>
            <th class="text-left">Order ID</th>
            <th class="text-left">Merchant</th>
            <th class="text-left">Branch</th>
            <th class="text-left">Products cost</th>
            <th class="text-left">Delivery cost</th>
            <th class="text-left">Payment Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in desserts" :key="item.guid + i">
            <td>{{ i + 1 }}</td>
            <td>{{ item.guid.substring(0,6) }}</td>
            <td>{{ item.merchant_name }}</td>
            <td>{{ item.branch_name }}</td>
            <td>{{ $moneyFormat(item.product_cost) }}</td>
            <td>{{ $moneyFormat(item.delivery_price) }}</td>
            <td>{{ item.payment_type }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>

import Courier from '../../services/Courier'

export default {
  data () {
    return {
      dialog: false,
      desserts: [],
      products: [],
      users: [],
      merchantBranchList: [],
      courier: {}
    }
  },
  methods: {
    getProductCost (list = []) {
      if (!list) return 0
      return list.reduce((acc, curr) => {
        acc = acc + curr.price
        return acc
      }, 0)
    },
    getCashTotal (list = []) {
      return this.desserts.reduce((acc, curr) => {
        if (curr.payment_type === 'cash') {
          acc = acc + curr.delivery_price
          return acc
        }
      }, 0)
    },
    getDeliveryTotal (list = []) {
      return this.desserts.reduce((acc, curr) => {
        acc = acc + curr.delivery_price
        return acc
      }, 0)
    },
    getCourier (id) {
      Courier.getCourier(id).then(res => {
        console.log(res)
        this.courier = res
      })
    },
    getMerchantOrder () {
      Courier.getCourierOrders(this.$route.params.courierId).then(res => {
        console.log(res)
        this.desserts = res.orders.map(el => ({
          ...el,
          product_cost: this.getProductCost(el.products)
        }))
      })
    }
  },
  created () {
    this.getCourier(this.$route.params.courierId)
    this.getMerchantOrder()
  }
}
</script>

<style></style>
