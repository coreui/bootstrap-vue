import { defineComponent, h, onMounted, ref } from 'vue'
import type { VNode } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { ResolvedSidebarItem } from '../../shared'

import { withBase } from '@vuepress/client'

import { CButton, CCollapse } from '@coreui/bootstrap-vue/src/'

const normalizePath = (path: string): string =>
  decodeURI(path)
    .replace(/#.*$/, '')
    .replace(/(index)?\.(md|html)$/, '')

const isActiveLink = (route: RouteLocationNormalizedLoaded, link?: string): boolean => {
  if (link === undefined) {
    return false
  }

  if (route.hash === link) {
    return true
  }

  const currentPath = normalizePath(route.path)
  const targetPath = normalizePath(link)

  return currentPath === targetPath
}

const isActiveItem = (route: RouteLocationNormalizedLoaded, item: ResolvedSidebarItem): boolean => {
  if (isActiveLink(route, item.link)) {
    return true
  }

  if (item.children) {
    return item.children.some((child) => isActiveItem(route, child))
  }

  return false
}

const SidebarNav = defineComponent({
  name: 'SidebarNav',
  props: {
    items: {
      type: Array,
      required: true,
    },
    visible: Boolean
  },
  setup(props) {
    const route = useRoute()
    const firstRender = ref(true)
    const visible = ref()

    onMounted(() => {
      firstRender.value = false
    })

    const renderItem = (item: ResolvedSidebarItem, index: number): VNode => {
      if (item.children && !item.link.includes('.html')) {

        if (firstRender.value && item.children.some((child) => isActiveItem(route, child))) {
          visible.value = index
        }

        return h(
          'li',
          {
            class: 'mb-1',
          },
          {
            default: () => [
              h(
                CButton,
                {
                  'aria-current': visible.value,
                  'aria-expanded': visible.value,
                  class: 'd-inline-flex align-items-center rounded',
                  onClick: () => visible.value === index ? visible.value = -1 : visible.value = index,
                },
                {
                  default: () => item.text,
                },
              ),
              h(
                CCollapse,
                {
                  visible: visible.value === index,
                },
                {
                  default: () =>
                    h(
                      'ul',
                      {
                        class: 'list-unstyled fw-normal pb-1 small',
                      },
                      {
                        default: () => item.children.map((child, index) => renderItem(child, index)),
                      },
                    ),
                },
              ),
            ],
          },
        )
      }

      return h(
        RouterLink,
        {
          to: item.link,
          custom: true,
        },
        {
          default: (props) =>
            h(
              'li',
              {},
              h(
                'a',
                {
                  class: [
                    'd-inline-flex align-items-center rounded',
                    {
                      active: props.isActive,
                      disabled: item.disabled,
                    },
                  ],
                  href: withBase(item.link),
                },
                {
                  default: () => item.text,
                },
              ),
            ),
        },
      )
    }

    return () =>
      h(
        CCollapse,
        {
          class: 'brd-links',
          id: 'brd-docs-nav',
          'aria-label': 'Docs navigation',
          visible: props.visible,
        },
        {
          default: () =>
            h(
              'ul',
              {
                class: 'list-unstyled mb-0 py-3 pt-md-1',
              },
              {
                default: () => props.items.map((item: any, index: number) => renderItem(item, index)),
              },
            ),
        },
      )
  },
})

export { SidebarNav }
