import { shallowMount } from '@vue/test-utils'
import PublicDocumentReader from '@/layout_public/components/PublicDocumentReader.vue'

describe('PublicDocumentReader.vue', () => {
  const createWrapper = propsData => shallowMount(PublicDocumentReader, {
    propsData,
    slots: {
      default: `
        <div>
          <h2>隐藏的接口标题</h2>
          <section class="dynamic-content">
            <h2>附加页标题</h2>
          </section>
        </div>
      `
    },
    stubs: {
      PublicDocumentOutline: true
    }
  })

  it('limits dynamic heading extraction to the configured content area', () => {
    const wrapper = createWrapper({
      dynamicOutline: true,
      dynamicOutlineSelector: '.dynamic-content'
    })

    wrapper.vm.refreshOutline()

    expect(wrapper.vm.resolvedSections).toEqual([
      { id: 'portal-heading-1', label: '附加页标题', level: 2 }
    ])
  })

  it('uses the stable sections supplied by an HTTP or Dubbo reader', () => {
    const sections = [{ id: 'overview', label: '接口信息' }]
    const wrapper = createWrapper({ sections })

    wrapper.vm.refreshOutline()

    expect(wrapper.vm.resolvedSections).toEqual(sections)
    expect(wrapper.vm.resolvedSections).not.toBe(sections)
  })
})
