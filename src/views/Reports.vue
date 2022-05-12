<template>
  <div class="mx-2 my-2">
    <v-row v-if="false" class="my-2" justify="space-between" align="center">
      <v-col cols="auto">
        <h3>Reports</h3>
      </v-col>
    </v-row>
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab> Merchants </v-tab>
      <v-tab> Couriers </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Order number</th>
                <th class="text-left">Name</th>
                <th class="text-left">Created at</th>
                <th class="text-left">Comission</th>
                <th class="text-left">Delivery time</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="pointer"
                v-for="(item, i) in merchants"
                :key="item.guid + i"
                @click="clickRow(item.guid)"
              >
                <td>{{ i + 1 }}</td>
                <td @click="$router.push(`/reports/${item.guid}/merchant-branches`)" style="cursor: pointer">{{ item.name }}</td>
                <td>{{ item.created_at | timeformatter }}</td>
                <td>{{ item.comission }}</td>
                <td>{{ item.delivery_time }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-tab-item>
      <v-tab-item>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Order number</th>
                <th class="text-left">Name</th>
                <th class="text-left">Login</th>
                <th class="text-left">Created at</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in couriers" :key="item.guid + i">
                <td>{{ i + 1 }}</td>
                <td style="cursor: pointer"  @click="$router.push(`/reports/${item.guid}/couriers`)">{{ item.name }}</td>
                <td>{{ item.login }}</td>
                <td>{{ item.created_at | timeformatter }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Courier from '../services/Courier'
import Merchant from '../services/Merchant'

export default {
  data () {
    return {
      dialog: false,
      tab: 0,
      merchants: [],
      products: [],
      users: []
    }
  },
  methods: {
    getMerchants () {
      Merchant.getMerchants().then((res) => {
        console.log(res)
        this.merchants = res.merchants
      })
    },
    getCouriers () {
      Courier.getCouriers().then(res => {
        console.log(res)
        this.couriers = res.couriers
      })
    }
  },
  created () {
    this.getMerchants()
    this.getCouriers()
  }
}
</script>

<style></style>
