import { mount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import ConsoleNavigation from '@/layout/components/ConsoleNavigation.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(VueRouter)

const router = new VueRouter({
  routes: [{ path: '/dashboard' }]
})

describe('ConsoleNavigation.vue', () => {
  const createWrapper = collapsed => mount(ConsoleNavigation, {
    localVue,
    router,
    propsData: {
      label: '工作台',
      collapsed,
      activePath: '/dashboard'
    },
    slots: {
      default: '<el-menu-item index="/dashboard">空间列表</el-menu-item>'
    }
  })

  it('renders an expanded navigation label', () => {
    const wrapper = createWrapper(false)

    expect(wrapper.find('.console-navigation__label').text()).toBe('工作台')
    expect(wrapper.find('.el-menu--collapse').exists()).toBe(false)
  })

  it('uses the compact Element UI menu when collapsed', () => {
    const wrapper = createWrapper(true)

    expect(wrapper.find('.console-navigation__label').exists()).toBe(false)
    expect(wrapper.find('.el-menu--collapse').exists()).toBe(true)
  })
})
