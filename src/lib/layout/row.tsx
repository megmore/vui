import { ComponentOptions, CreateElement, RenderContext } from 'vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { genStaticStyles, genSpace } from '@/lib/core/style-gen'
import { FLEX_ALIGN, FLEX_JUSTIFY, FLEX_WRAP } from '@/lib/core/constant'
import { Size, FlexAlign, FlexJustify, FlexWrap } from '@/types/model'

const _name = 'm-row'

@Component({
  functional: true
} as ComponentOptions<Vue>)
export default class MRow extends Vue {
  @Prop({ type: String })
  private id?: string

  @Prop({ type: String, default: 'div' })
  private tag!: string

  @Prop({ type: String, default: FLEX_WRAP.normal })
  private wrap!: FlexWrap

  @Prop({ type: String, default: FLEX_JUSTIFY.start })
  private justify!: FlexJustify

  @Prop({ type: String, default: FLEX_ALIGN.stretch })
  private align!: FlexAlign

  @Prop({ type: [String, Number] })
  private gutter?: Size

  @Prop({ type: Number })
  private cols?: number

  render (h: CreateElement, { props, data, children }: RenderContext) {
    data.staticClass = data.staticClass !== undefined ? data.staticClass : ''
    data.staticClass += ` ${_name} m-flex-wrap-${props.wrap} m-flex-justify-${props.justify} m-flex-align-${props.align} `
    data.staticClass = data.staticClass.trim()
    if (!data.staticStyle) {
      data.staticStyle = {}
    }
    if (props.cols) {
      genStaticStyles(data.staticStyle, _name, 'cols', props.cols)
    }
    if (props.gutter) {
      genSpace(data.staticStyle, _name, 'gutter', props.gutter)
    }
    if (props.id) {
      data.domProps = data.domProps || {}
      data.domProps.id = props.id
    }

    return h(props.tag, data, children)
  }
}