import './core/style/color.scss'
import './core/style/elevation.scss'
import './core/style/space.scss'
import './core/style/shape.scss'
import './core/style/theme.scss'
import './core/style/mode.scss'
import './core/style/utils.scss'
import { Component, PluginFunction } from 'vue'
import * as components from './entries'
import * as constant from './core/constant'
import './icon/presets'


export type ComponentOrPack = Component & { $_mobov_subcomponents?: Record<string, ComponentOrPack> }

export interface MobovUseOptions {
  components?: Record<string, ComponentOrPack>
}

export interface MobovPlugin {
  install: PluginFunction<MobovUseOptions>
  version: string,
  constant: typeof constant
}

const Mobov: MobovPlugin = {
  install (Vue, opts = {}): void {
    if ((this as any).installed) { return }
    (this as any).installed = true

    // 注册组件
    const componentsList = opts.components || components
    console.log(componentsList)
    Object.values(componentsList).forEach(component => {
      console.log(component)
      Vue.use(component)
    })
    // const $Mobov = {
    //   cons
    // }
    // 挂载根组件
    window.Mobov = this
    // console.log(Vue)
    // console.log(this)
  },
  version: '1.0.0',
  constant
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Mobov)
}

export default Mobov
export * from './entries'