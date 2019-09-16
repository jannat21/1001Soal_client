import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
  theme: "toasted-primary",
  position: "top-center",
  duration: 5000,
  iconPack: "fontawesome",
  fullWidth: true
})
