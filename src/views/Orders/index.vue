<template>
  <div>
          <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Order number</th>
            <th class="text-left">Address</th>
            <th class="text-left">Comments</th>
            <th class="text-left">Created at</th>
            <th class="text-left">Status</th>
            <th class="text-left">Delivery type</th>
            <th class="text-left">Delivery price</th>
            <th class="text-left">Payment type</th>

            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in list" :key="item.guid + i">
            <td>{{ i + 1 }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.comment }}</td>
            <td>{{ item.created_at | timeformatter }}</td>
            <td>
                 <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="yellow darken-3"
          dark
          v-bind="attrs"
          v-on="on"
        >
          {{ getStatus(item.status) }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
            @click="changeStatus(item, st)"
            v-for="(st, index) in statuses"
            :key="index"
        >
          <v-list-item-title>{{ st.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu></td>
              <td>{{ item.delivery_type }}</td>
              <td>{{ item.delivery_price }}</td>
              <td>{{ item.payment_type  }}</td>
            <td><v-btn class=" text-capitalize ml-2" @click="deleteOrder(item.guid)" outlined color="red" text fab small><v-icon>mdi-delete</v-icon></v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import Orders from '../../services/Orders'

export default {
  props: ['desserts', 'getStatus', 'deleteOrder', 'status'],
  computed: {
    list () {
      if (this.status === 'all') return this.desserts
      return this.desserts.filter(el => el.status === this.status)
    }
  },
  methods: {
    changeStatus (e, status) {
      console.log(e, status)
      Orders.putOrder({
        ...e,
        product_id: e.products.map(el => el.id),
        status: status.tag
      }).then(res => {
        console.log(res)
        window.location.reload()
      })
    }
  },
  data () {
    return {
      statuses: [
        {
          title: 'New',
          tag: 'new'
        },
        {
          title: 'Restaurant',
          tag: 'restaurant-proccess'
        },
        {
          title: 'Restaurant ready',
          tag: 'restaurant-ready'
        },
        {
          title: 'Courier accepted',
          tag: 'courier-accepted'
        },
        {
          title: 'Courier on way',
          tag: 'courier-on-way'
        },
        {
          title: 'Courier delivered',
          tag: 'courier-delivered'
        }
      ]
    }
  }

}
</script>

<style>

</style>
