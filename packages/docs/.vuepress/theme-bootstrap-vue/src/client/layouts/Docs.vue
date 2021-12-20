<template>
  <div
    class="theme-container"
    :class="containerClass"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Header />
    <nav class="brd-subnavbar py-2 d-md-none" aria-label="Secondary navigation">
      <div class="container-xxl d-flex align-items-md-center">
        <button
          class="btn brd-sidebar-toggle d-md-none py-0 px-1 ms-3 order-3 collapsed"
          type="button"
          aria-controls="brd-docs-nav"
          aria-expanded="false"
          aria-label="Toggle docs navigation"
          @click="toggleSidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            class="bi bi-expand"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <title>Expand</title>
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zM7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10z"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            class="bi bi-collapse"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <title>Collapse</title>
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0zm-.5 11.707l-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793z"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
    <CContainer class="my-md-4 brd-layout" xxl>
      <Sidebar :visible="isSidebarOpen" @visible-change="(event) => (isSidebarOpen = event)" />
      <main class="brd-main order-1">
        <div class="brd-intro ps-lg-4">
          <div class="d-md-flex align-items-center justify-content-between">
            <h1 class="brd-title" id="content">
              {{ title }}
            </h1>
          </div>
          <p class="brd-lead">{{ description }}</p>
          <div data-ea-publisher="coreui-io" data-ea-type="image"></div>
        </div>
        <div class="brd-toc mt-4 mb-5 my-md-0 ps-xl-3 mb-lg-5 text-muted">
          <div class="docs-toc text-muted">
            <strong class="d-block h6 mb-2 pb-2 border-bottom">On this page</strong>
            <Toc />
          </div>
        </div>
        <div class="brd-content ps-lg-4">
          <Content />
        </div>
      </main>
    </CContainer>
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
    const title = frontmatter.value.name ? frontmatter.value.name : frontmatter.value.title
    const description = frontmatter.value.description
    const themeLocale = useThemeLocaleData()

    // navbar
    const shouldShowNavbar = computed(
      () => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false,
    )

    // sidebar
    const sidebarItems = useSidebarItems()
    const isSidebarOpen = ref(false)

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
