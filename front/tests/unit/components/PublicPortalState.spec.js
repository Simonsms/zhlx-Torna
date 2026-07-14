import { shallowMount } from '@vue/test-utils'
import PublicPortalState from '@/layout_public/components/PublicPortalState.vue'

describe('PublicPortalState.vue', () => {
  it('renders an error action and emits retry intent', async() => {
    const wrapper = shallowMount(PublicPortalState, {
      propsData: {
        type: 'error',
        title: '加载失败',
        description: '请稍后重试',
        actionLabel: '重新加载'
      },
      stubs: {
        ElButton: { template: '<button @click="$emit(\'click\')"><slot /></button>' }
      }
    })

    expect(wrapper.text()).toContain('加载失败')
    expect(wrapper.find('.el-icon-warning-outline').exists()).toBe(true)

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('action')).toHaveLength(1)
  })

  it('marks the loading state as busy without an action', () => {
    const wrapper = shallowMount(PublicPortalState, {
      propsData: { type: 'loading', title: '加载中' }
    })

    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.find('button').exists()).toBe(false)
  })
})
