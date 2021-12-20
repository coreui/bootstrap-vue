<template>
  <div
    class="theme-container"
    :class="containerClass"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Header @toggle-sidebar="toggleSidebar(!isSidebarOpen)" />
    <main>
      <div class="brd-masthead mb-3" id="content">
        <CContainer class="px-4 px-md-3">
          <CRow class="align-items-lg-center">
            <div class="col-8 mx-auto col-md-4 order-md-2 col-lg-6">
              <CImage fluid :src="banner" />
            </div>
            <div class="col-md-8 order-md-1 col-lg-6 text-center text-md-start">
              <h1 class="mb-3">
                Bootstrap Vue UI components library backed by the professional team.
              </h1>
              <p class="lead mb-4">
                Quickly design and customize responsive mobile-first sites with Bootstrap Vue, the
                world’s most popular front-end open source toolkit, rebuilt for Vue.js.
              </p>
              <div class="d-flex flex-column flex-md-row">
                <RouterLink
                  to="/getting-started/introduction.html"
                  custom
                  v-slot="{ href, navigate, isActive }"
                >
                  <CButton
                    class="mb-3 me-md-3"
                    color="brd-primary"
                    size="lg"
                    :active="isActive"
                    :href="href"
                    @click="navigate"
                  >
                    Get started
                  </CButton>
                </RouterLink>
                <CButton
                  class="mb-3"
                  color="dark"
                  component="a"
                  href="https://github.com/coreui/bootstrap-vue"
                  size="lg"
                  target="_blank"
                  rel="noopener"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    class="me-2"
                    viewBox="0 0 512 499.36"
                    role="img"
                    style="vertical-align: text-top"
                  >
                    <title>GitHub</title>
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z"
                    />
                  </svg>
                  Github
                </CButton>
              </div>
              <p class="text-muted mb-0">
                Currently <strong>v{{ version }}</strong>
              </p>
            </div>
          </CRow>
        </CContainer>
        <CContainer class="masthead-followup px-4 px-md-3">
          <section class="row mb-5 pb-md-4 align-items-center">
            <div class="col-md-5">
              <h2 class="display-5 fw-normal">Installation</h2>
              <p class="lead fw-normal">Install Bootstrap Vue via npm or yarn.</p>
              <RouterLink
                to="/getting-started/introduction.html"
                custom
                v-slot="{ href, navigate, isActive }"
              >
                <CButton
                  class="mb-3 me-md-3"
                  color="primary"
                  size="lg"
                  variant="outline"
                  :active="isActive"
                  :href="href"
                  @click="navigate"
                >
                  Read installation docs
                </CButton>
              </RouterLink>
            </div>
            <div class="col-md-7 ps-md-5">
              <div class="language-bash ext-sh">
                <pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> @coreui/bootstrap-vue bootstrap</code></pre>
              </div>
              <div>or</div>
              <div class="language-bash ext-sh">
                <pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> @coreui/bootstrap-vue bootstrap</code></pre>
              </div>
            </div>
          </section>
        </CContainer>
      </div>
    </main>
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
import banner from '../../assets/vue_960px.png'
import pkg from './../../../../../package.json'

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
    const version = pkg.version
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
      banner,
      version,
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
