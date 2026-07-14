import { shallowMount } from '@vue/test-utils'
import Navbar from '@/layout_view/components/Navbar.vue'

describe('view Navbar.vue', () => {
  const goRoute = jest.fn()
  const dispatch = jest.fn()

  const createWrapper = () => shallowMount(Navbar, {
    mocks: {
      $t: key => key,
      $route: {
        params: {}
      },
      $store: {
        getters: {
          sidebarView: { opened: true },
          avatar: ''
        },
        dispatch
      },
      goRoute
    },
    stubs: {
      ElButton: {
        template: '<button @click="$emit(\'click\')"><slot /></button>'
      },
      Hamburger: true,
      RightDropdown: true,
      UserMessage: true
    }
  })

  beforeEach(() => {
    goRoute.mockClear()
    dispatch.mockClear()
  })

  it('opens the existing favorites page from browse mode', async() => {
    const wrapper = createWrapper()
    const favoriteButton = wrapper.find('.view-favorite-button')

    expect(favoriteButton.exists()).toBe(true)
    expect(favoriteButton.text()).toBe('myFavorites')

    await favoriteButton.trigger('click')

    expect(goRoute).toHaveBeenCalledWith('/user/subscribe/doc')
  })
})
