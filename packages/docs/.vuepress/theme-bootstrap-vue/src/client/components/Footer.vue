<template>
  <footer class="brd-footer py-5 mt-5 bg-light">
    <CContainer class="py-5">
      <CRow>
        <CCol class="mb-3" :lg="3">
          <a class="d-inline-flex align-items-center mb-2 link-dark text-decoration-none" to="/">
            <CImage class="d-block" :src="logo" :height="40" />
          </a>
          <ul class="list-unstyled small text-muted">
            <li class="mb-2">
              Designed and built with all the love in the world by the
              <a href="https://coreui.io">CoreUI team</a> with the help of
              <a href="https://github.com/coreui/bootstrap-vue/graphs/contributors">
                our contributors
              </a>
              .
            </li>
            <li class="mb-2">
              Code licensed
              <a
                href="https://github.com/coreui/bootstrap-vue/blob/main/LICENSE"
                target="_blank"
                rel="license noopener"
              >
                MIT
              </a>
              , docs
              <a
                href="https://creativecommons.org/licenses/by/3.0/"
                target="_blank"
                rel="license noopener"
              >
                CC BY 3.0
              </a>
              .
            </li>
            <li class="mb-2">Currently v{{ version }}.</li>
          </ul>
        </CCol>
        <CCol class="mb-3" :xs="6" :lg="{ span: 2, offset: 1 }">
          <h5>Links</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
            <RouterLink to="/">Home</RouterLink>
            </li>
            <li class="mb-2">
            <RouterLink to="/getting-started/introduction.html">Docs</RouterLink>
            </li>
            <li class="mb-2">
              <a href="https://coreui.io/vue/">Themes</a>
            </li>
            <li class="mb-2">
              <a href="https://blog.coreui.io/">Blog</a>
            </li>
          </ul>
        </CCol>
        <CCol class="mb-3" :xs="6" :lg="2">
          <h5>Projects</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <a href="https://github.com/coreui/bootstrap-vue">Bootstrap 5</a>
            </li>
            <li class="mb-2">
              <a href="https://github.com/coreui/vue/">CoreUI for Vue.js</a>
            </li>
            <li class="mb-2">
              <a href="https://github.com/coreui/coreui-free-vue-admin-template/">
                CoreUI Vue Admin Template
              </a>
            </li>
            <li class="mb-2">
              <a href="https://github.com/coreui/coreui-icons">CoreUI Icons</a>
            </li>
          </ul>
        </CCol>
        <CCol class="mb-3" :xs="6" :lg="2">
          <h5>Community</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <a href="https://github.com/coreui/bootstrap-vue/issues">Issues</a>
            </li>
            <li class="mb-2">
              <a href="https://github.com/coreui/bootstrap-vue/discussions">Discussions</a>
            </li>
          </ul>
        </CCol>
      </CRow>
    </CContainer>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import logo from '../../assets/brand/bootstrap-vue.svg'
import pkg from './../../../../../package.json'
export default defineComponent({
  name: 'Footer',
  setup() {
    const version = pkg.version
    return {
      logo,
      version,
    }
  },
})
</script>
