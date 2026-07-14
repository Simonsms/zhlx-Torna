import { shallowMount } from '@vue/test-utils'
import SpaceList from '@/views/dashboard/SpaceList/index.vue'

describe('SpaceList.vue', () => {
  const createWrapper = isSuperAdmin => shallowMount(SpaceList, {
    mocks: {
      $t: key => key,
      get: (url, params, callback) => callback({ data: [] }),
      isSuperAdmin: () => isSuperAdmin
    },
    stubs: {
      ElButton: {
        template: '<button @click="$emit(\'click\')"><slot /></button>'
      },
      SpaceCreateDialog: true
    }
  })

  it('shows the create-space action for a super administrator', () => {
    const wrapper = createWrapper(1)

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('createSpace')
  })

  it('hides the create-space action for other users', () => {
    const wrapper = createWrapper(0)

    expect(wrapper.find('button').exists()).toBe(false)
  })
})
