import { defineComponent, h } from 'vue'
import { Color, Shape } from '../props'

export const CButton = defineComponent({
  name: 'CButton',
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: {
      type: Boolean,
      default: false,
      required: false,
    },
    /**
     * * Sets the color context of the component to one of Bootstrap Vue’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: Color,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: 'button',
      required: false,
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: {
      type: Boolean,
      required: false,
    },
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: {
      type: String,
      default: undefined,
      required: false,
    },
    /**
     * Select the shape of the component.
     *
     * @values 'rounded', 'rounded-top', 'rounded-end', 'rounded-bottom', 'rounded-start', 'rounded-circle', 'rounded-pill', 'rounded-0', 'rounded-1', 'rounded-2', 'rounded-3'
     */
    shape: Shape,
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      default: undefined,
      required: false,
      validator: (value: string) => {
        return ['sm', 'lg'].includes(value)
      },
    },
    /**
     * Set the button variant to an outlined button or a ghost button.
     *
     * @values 'outline'
     */
    variant: {
      type: String,
      default: undefined,
      required: false,
      validator: (value: string) => {
        return ['outline'].includes(value)
      },
    },
  },
  setup(props, { slots }) {
    return () =>
      h(
        props.component,
        {
          class: [
            'btn',
            props.variant ? `btn-${props.variant}-${props.color}` : `btn-${props.color}`,
            {
              [`btn-${props.size}`]: props.size,
              active: props.active,
              disabled: props.disabled,
            },
            props.shape,
          ],
          disabled: props.disabled && props.component !== 'a',
          ...(props.component === 'a' && props.disabled && { 'aria-disabled': true, tabIndex: -1 }),
          ...(props.component === 'a' && props.href && { href: props.href }),
        },
        slots.default && slots.default(),
      )
  },
})