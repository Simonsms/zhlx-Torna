import { shallowMount } from '@vue/test-utils'
import PublicDocumentOutline from '@/layout_public/components/PublicDocumentOutline.vue'

describe('PublicDocumentOutline.vue', () => {
  const sections = [
    { id: 'overview', label: '概览', level: 2 },
    { id: 'request-body', label: '请求体', level: 3 }
  ]

  const createWrapper = activeId => shallowMount(PublicDocumentOutline, {
    propsData: { sections, activeId },
    mocks: { $t: key => key }
  })

  it('marks the active section and emits the selected anchor', async() => {
    const wrapper = createWrapper('request-body')
    const items = wrapper.findAll('.public-document-outline__item')

    expect(items.at(1).classes()).toContain('public-document-outline__item--active')
    expect(items.at(1).classes()).toContain('public-document-outline__item--nested')

    await items.at(0).trigger('click')

    expect(wrapper.emitted('select')[0]).toEqual(['overview'])
  })

  it('does not render an empty outline container', () => {
    const wrapper = shallowMount(PublicDocumentOutline, {
      mocks: { $t: key => key }
    })

    expect(wrapper.find('.public-document-outline').exists()).toBe(false)
  })
})
