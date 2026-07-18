import { shallowMount } from '@vue/test-utils'
import PublicPortalAccess from '@/layout_public/components/PublicPortalAccess.vue'

describe('PublicPortalAccess.vue', () => {
  const ElForm = {
    methods: {
      validate(callback) {
        callback(true)
      }
    },
    template: '<form><slot /></form>'
  }

  const createWrapper = loading => shallowMount(PublicPortalAccess, {
    propsData: { title: '开放接口', loading },
    mocks: { $t: key => key },
    stubs: {
      ElForm,
      ElFormItem: { template: '<div><slot /></div>' },
      ElInput: { template: '<div><slot name="append" /></div>' },
      ElButton: { template: '<button @click="$emit(\'click\')"><slot /></button>' }
    }
  })

  it('validates and emits the original password value', () => {
    const wrapper = createWrapper(false)
    wrapper.vm.formData.password = ' secret '

    wrapper.vm.submit()

    expect(wrapper.emitted('submit')[0]).toEqual([' secret '])
  })

  it('prevents duplicate submission while checking the password', () => {
    const wrapper = createWrapper(true)

    wrapper.vm.submit()

    expect(wrapper.emitted('submit')).toBeUndefined()
  })
})
