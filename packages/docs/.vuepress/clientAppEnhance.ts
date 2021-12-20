import type { ClientAppEnhance } from '@vuepress/client'
import { CIcon } from '@coreui/icons-vue'
import BootstrapVue from '@coreui/bootstrap-vue/src'
import '@coreui/coreui/scss/coreui.scss'
import '@coreui/chartjs/scss/coreui-chartjs.scss'

import {
  cibCoreuiC,
  cibDiscourse,
  cibGithub,
  cibTwitter,
  cilArrowBottom,
  cilArrowRight,
  cilArrowTop,
  cilBasket,
  cilBurn,
  cilCheckCircle,
  cilCloudDownload,
  cilInfo,
  cilMenu,
  cilOptions,
  cilPeople,
  cilPuzzle,
  cilSettings,
  cilSpeedometer,
  cilUserFollow,
  cilWarning,
} from '@coreui/icons/js/index'

export const icons = {
  cibCoreuiC,
  cibDiscourse,
  cibGithub,
  cibTwitter,
  cilArrowBottom,
  cilArrowRight,
  cilArrowTop,
  cilBasket,
  cilBurn,
  cilCheckCircle,
  cilCloudDownload,
  cilInfo,
  cilMenu,
  cilOptions,
  cilPeople,
  cilPuzzle,
  cilSettings,
  cilSpeedometer,
  cilUserFollow,
  cilWarning,
}

const clientAppEnhance: ClientAppEnhance = ({ app }) => {
  app.use(BootstrapVue)
  app.provide('icons', icons)
  app.component('CIcon', CIcon)
}

export default clientAppEnhance
