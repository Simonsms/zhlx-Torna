import { shallowMount } from '@vue/test-utils'
import SpaceProject from '@/views/space/SpaceProject/index.vue'

describe('SpaceProject.vue', () => {
  const projects = [
    {
      id: 'project-1',
      name: '研发技术规范',
      description: '沉淀研发技术规范，覆盖方案设计、代码管理和发布流程。',
      creatorName: 'admin',
      gmtCreate: '2026-07-14 15:01:57',
      isPrivate: 1
    },
    {
      id: 'project-2',
      name: '平台接口文档',
      description: '统一维护平台接口文档。',
      creatorName: '张健章',
      gmtCreate: '2026-07-14 15:32:48',
      isPrivate: 0
    }
  ]

  const goProjectHome = jest.fn()
  const setFrom = jest.fn()

  const createWrapper = () => shallowMount(SpaceProject, {
    propsData: {
      spaceId: 'space-1'
    },
    mocks: {
      $t: key => key,
      Role: { dev: 'dev', admin: 'admin' },
      getAttr: () => 'card',
      hasRole: () => true,
      getSpace: () => ({ id: 'space-1', name: '龙信平台' }),
      setFrom,
      goProjectHome
    },
    stubs: {
      ProjectCreateDialog: true,
      ElButton: true,
      ElLink: true,
      ElRadioButton: true,
      ElRadioGroup: true,
      ElTable: true,
      ElTableColumn: true,
      ElTooltip: true
    }
  })

  beforeEach(() => {
    goProjectHome.mockClear()
    setFrom.mockClear()
  })

  it('renders responsive project cards with readable descriptions', async() => {
    const wrapper = createWrapper()
    await wrapper.setData({ data: projects, showType: 'card' })

    expect(wrapper.findAll('.project-card')).toHaveLength(2)
    expect(wrapper.find('.project-card__description').text()).toContain(projects[0].description)
    expect(wrapper.find('.project-card__privacy').exists()).toBe(true)
  })

  it('opens a project from the keyboard', async() => {
    const wrapper = createWrapper()
    await wrapper.setData({ data: projects, showType: 'card' })

    await wrapper.find('.project-card').trigger('keyup.enter')

    expect(setFrom).toHaveBeenCalledWith(expect.objectContaining({
      spaceId: 'space-1',
      projectId: 'project-1'
    }))
    expect(goProjectHome).toHaveBeenCalledWith('project-1')
  })

  it('keeps the list view and provides a complete empty state', async() => {
    const wrapper = createWrapper()

    expect(wrapper.find('.project-list-page__empty').exists()).toBe(true)

    await wrapper.setData({ data: projects, showType: 'grid' })

    expect(wrapper.find('.project-list-table').exists()).toBe(true)
    expect(wrapper.find('.project-card-grid').exists()).toBe(false)
  })
})
