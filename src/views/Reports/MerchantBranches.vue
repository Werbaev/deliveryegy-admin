<template>
  <div class="mx-2 my-2">
    <v-row class="my-2" justify="space-between" align="center">
      <v-col cols="auto">
        <h3>Merchant Report</h3>
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
                        <td><strong>Restaurant name</strong></td>
                        <td>{{ merchant.name }}</td>
                      </tr>
                      <tr>
                        <td><strong>Comission</strong></td>
                        <td>{{ merchant.comission }} %</td>
                      </tr>
                      <tr>
                        <td><strong>Restaurant need to pay</strong></td>
                        <td>{{ $moneyFormat(deliveryegyEarning(desserts)) }}</td>
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
            <th class="text-left">N</th>
            <th class="text-left">Order ID</th>
            <th class="text-left">Branch</th>
            <th class="text-left">Product cost</th>
            <th class="text-left">Delivery cost</th>
            <th class="text-left">Payment type</th>
            <th class="text-left">Restaurant earning</th>
            <th class="text-left">Deliveryegy earning</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in desserts" :key="item.guid + i">
            <td>{{ i + 1 }}</td>
            <td>{{ item.guid.substring(0,6) }}</td>
            <td>{{ item.branch_name }}</td>
            <td>{{  `${$moneyFormat(item.product_cost)}` }}</td>
            <td>{{ `${$moneyFormat(item.delivery_price)}` }}</td>
            <td>{{ item.payment_type }}</td>
            <td>{{ `${$moneyFormat(item.restaurant_earn)}`  }}</td>
            <td class="background-red">{{ `${$moneyFormat(item.deliveryegy_earn)}` }}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="font-weight-bold">Total: {{ $moneyFormat(restaurantEarning(desserts)) }}</td>
            <td class="font-weight-bold">Total: {{ $moneyFormat(deliveryegyEarning(desserts)) }}</td>
          </tr>

        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>

import Merchant from '../../services/Merchant'

export default {
  data () {
    return {
      dialog: false,
      desserts: [],
      products: [],
      users: [],
      merchantBranchList: [],
      merchant: {}
    }
  },
  methods: {

    restaurantEarning (array) {
      return array.reduce((acc, curr) => {
        acc = acc + curr.restaurant_earn
        return acc
      }, 0)
    },

    deliveryegyEarning (array) {
      return array.reduce((acc, curr) => {
        acc = acc + curr.deliveryegy_earn
        return acc
      }, 0)
    },

    getProductCost (list = []) {
      if (!list) return 0
      return list.reduce((acc, curr) => {
        acc = acc + curr.price
        return acc
      }, 0)
    },
    getMerchant (id) {
      Merchant.getMerchant(id).then(res => {
        console.log(res)
        this.merchant = res
      })
    },
    getMerchantOrder () {
      Merchant.getMerchantOrders(this.$route.params.merchantId).then(res => {
        console.log(res)
        console.log(res)
        this.desserts = res.orders.map(el => ({
          ...el,
          product_cost: this.getProductCost(el.products),
          restaurant_earn: this.getProductCost(el.products) - this.getProductCost(el.products) * el.comission / 100,
          deliveryegy_earn: this.getProductCost(el.products) * el.comission / 100
        }))
      })
    }
  },

  created () {
    this.getMerchant(this.$route.params.merchantId)
    this.getMerchantOrder()
  }
}
</script>

<style></style>
