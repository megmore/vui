import { Component, Prop, Vue, Emit, Mixins } from 'vue-property-decorator'
import mixBase from '../core/mixin/base'
import { Size } from '../core/constant'

@Component
export default class MList extends Mixins (
  mixBase
) {
  name = 'm-list'

  @Prop({ type: String, default: ''})
  title!: String

  @Prop({ type: Boolean, default: false})
  titleDivider!: boolean

  @Prop({ type: String, default: Size.sm})
  marginY!: Size.sm

  @Emit('click')
  onClick (e: MouseEvent) {}

  get styles () {
    return {
      ...this.baseStyle
    }
  }

  get classes () {
    const { titleDivider } = this
    return {
      '--with-title-divider': titleDivider,
      ...this.baseClass
    }
  }

  render () {
    const { name, classes, styles, $slots, title, onClick } = this

    return (
      <div staticClass={name}
           class={classes}
           onClick={onClick}
           style={styles}>
        <div staticClass={`${name}__title`}>
          {$slots.title ? $slots.title : title}
        </div>
        <div staticClass={`${name}__main`}>
          {$slots.default}
        </div>
        {$slots.extra ? <div staticClass={`${name}__extra`}>{$slots.extra}</div> : undefined}
      </div>
    )
  }
}
