//@ts-nocheck
import { App } from 'vue'
import * as Components from './components'
import { vcplaceholder, vcpopover, vctooltip } from './directives'

const removeKeysFromObject = (object, keys) => {
  return Object.entries(object).reduce((obj, [key, value]) => {
    if (!keys.includes(key) && !keys.includes(value.name)) {
      obj[key] = value
    }
    return obj
  }, {})
}

const BootstrapVue = {
  install: (app: App, options: any): void => {
    let pluginComponents = Components

    const toRemove = options && options.remove ? options.remove : null
    if (toRemove && Array.isArray(toRemove)) {
      pluginComponents = removeKeysFromObject(Components, toRemove)
    }

    for (const plugin in pluginComponents) {
      app.component(plugin, Components[plugin])
    }

    app.directive('c-placeholder', vcplaceholder)
    app.directive('c-popover', vcpopover)
    app.directive('c-tooltip', vctooltip)
  },
}

// Export library
export default BootstrapVue

//Export components
export * from './components'
export * from './directives'
