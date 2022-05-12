<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      color="grey darken-4"
      app
      dark
      clipped
    >
      <v-list dense>
        <v-list-item to="/" link>
          <v-list-item-action>
            <v-icon>mdi-android-messages</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Orders</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item to="/products" link>
          <v-list-item-action>
            <v-icon>mdi-rocket-launch</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item to="/users" link>
          <v-list-item-action>
            <v-icon>mdi-account-reactivate</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Users </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/merchants" link>
          <v-list-item-action>
            <v-icon>mdi-food</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Merchants </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/couriers" link>
          <v-list-item-action>
            <v-icon>mdi-truck-fast</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Couriers </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/reports" link>
          <v-list-item-action>
            <v-icon>mdi-table</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Reports </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app  clipped-left color="black" dark>
      <!-- <v-app-bar-nav-icon  @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-btn small text fab @click.stop="drawer = !drawer">
        <v-icon>mdi-coffee</v-icon>
      </v-btn>
      <v-toolbar-title dark class="pl-1 title"> Deleveryegy admin</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar size="40" class="mr-4"
        ><v-img contain :src="require('./assets/user_image.png')"></v-img
      ></v-avatar>
      <span class="">Jasur Sherbaev</span>
      <!-- <v-btn color="red darken-2" elevation="0">Chiqish</v-btn> -->
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- <v-footer app>
      <span>&copy;Jasur Sherbaev 2022</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  created () {
    this.$vuetify.theme.dark = false
    this.$vuetify.theme.themes.light.primary = '#471284'
  }
}
</script>
<style scoped>
.nameofUser {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: rgb(51, 173, 230);
  font-weight: 500;
}
</style>
