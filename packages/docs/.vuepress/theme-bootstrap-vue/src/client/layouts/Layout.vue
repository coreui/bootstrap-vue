<template>
  <div
    class="theme-container"
    :class="containerClass"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Header @toggle-sidebar="toggleSidebar(!isSidebarOpen)" />
    <main><Content /></main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Transition } from 'vue'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import type { DefaultThemePageFrontmatter } from '../../shared'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import Home from '../components/Home.vue'
import Page from '../components/Page.vue'
import Sidebar from '../components/Sidebar.vue'
import { useScrollPromise, useSidebarItems, useThemeLocaleData } from '../composables'

export default defineComponent({
  name: 'Layout',

  components: {
    Footer,
    Header,
    Home,
    Page,
    Sidebar,
    Transition,
  },

  setup() {
    const page = usePageData()
    const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()
    const title = frontmatter.value.title
    const description = frontmatter.value.description
    const themeLocale = useThemeLocaleData()

    // navbar
    const shouldShowNavbar = computed(
      () => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false,
    )

    // sidebar
    const sidebarItems = useSidebarItems()
    const isSidebarOpen = ref(true)

    const toggleSidebar = (to?: boolean): void => {
      isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value
    }

    // classes
    const containerClass = computed(() => [
      {
        'no-navbar': !shouldShowNavbar.value,
        'no-sidebar': !sidebarItems.value.length,
        'sidebar-open': isSidebarOpen.value,
      },
      frontmatter.value.pageClass,
    ])

    // handle scrollBehavior with transition
    const scrollPromise = useScrollPromise()
    const onBeforeEnter = scrollPromise.resolve
    const onBeforeLeave = scrollPromise.pending

    return {
      isSidebarOpen,
      frontmatter,
      page,
      containerClass,
      title,
      description,
      toggleSidebar,
      onBeforeEnter,
      onBeforeLeave,
    }
  },
})
</script>
