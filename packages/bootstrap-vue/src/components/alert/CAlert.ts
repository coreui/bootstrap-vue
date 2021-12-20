import { defineComponent, h, ref, Transition, watch } from 'vue'

import { Color } from '../props'
import { CCloseButton } from '../close-button/CCloseButton'

export const CAlert = defineComponent({
  name: 'CAlert',
  props: {
    /**
     * * Sets the color context of the component to one of Bootstrap Vue’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: Color,
    /**
     * Optionally add a close button to alert and allow it to self dismisss.
     */
    dismissible: {
      type: Boolean,
      default: false,
      required: false,
    },
    /**
     * Toggle the visibility of alert component.
     */
    visible: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  emits: [
    /**
     * Callback fired when the component requests to be closed.
     */
    'close',
  ],
  setup(props, { slots, emit }) {
    const visible = ref(props.visible)

    watch(
      () => props.visible,
      () => {
        visible.value = props.visible
      },
    )

    const handleDismiss = () => {
      visible.value = false
      emit('close')
    }

    return () =>
      h(
        Transition,
        {
          name: 'fade',
          duration: 350,
          enterFromClass: '',
          enterActiveClass: 'fade',
          enterToClass: 'fade show',
          leaveActiveClass: 'fade',
        },
        {
          default: () =>
            visible.value &&
            h(
              'div',
              {
                class: [
                  'alert',
                  {
                    [`alert-${props.color}`]: props.color,
                    'alert-dismissible': props.dismissible,
                  },
                ],
              },
              [
                slots.default && slots.default(),
                props.dismissible &&
                  h(CCloseButton, {
                    onClick: () => {
                      handleDismiss()
                    },
                  }),
              ],
            ),
        },
      )
  },
})
