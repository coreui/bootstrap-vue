<template>
  <aside class="brd-sidebar">
    <SidebarNav :items="sidebarItems" :visible="visible" />
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useSidebarItems } from '../composables'
import { SidebarNav } from './SidebarNav'
import logo from '../../assets/brand/bootstrap-vue.svg'

export default defineComponent({
  name: 'Sidebar',
  props: {
    visible: Boolean,
  },
  components: {
    SidebarNav,
  },
  setup(props) {
    const visible = ref(props.visible)

    watch(
      () => props.visible,
      () => {
        visible.value = props.visible
      },
    )

    const sidebarItems = useSidebarItems()
    return {
      logo,
      sidebarItems,
      visible,
    }
  },
})
</script>
