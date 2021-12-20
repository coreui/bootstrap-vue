<template>
  <div :class="`brd-callout brd-callout-${color}`">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Callout',
  props: {
    color: String,
  },
  setup(props) {
    const color = props.color

    return {
      color,
    }
  },
})
</script>
