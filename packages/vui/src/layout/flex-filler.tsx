import { ComponentOptions } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

const compName = 'm-flex-filler'

@Component({
  functional: true
} as ComponentOptions<Vue>)
export default class MFlexFiller extends Vue {
  render () {
    return (
      <div class={compName} />
    )
  }
}
