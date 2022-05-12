import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    primary: '#8c9eff',
    themes: {
      light: {
        primary: '#8c9eff',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c'
      },
      dark: {
        primary: '#8c9eff'
      }
    }
  }
})
