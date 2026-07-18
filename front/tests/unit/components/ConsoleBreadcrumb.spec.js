import { mount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import ConsoleBreadcrumb from '@/layout/components/ConsoleBreadcrumb.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(VueRouter)

const routes = [
  { path: '/dashboard', meta: { title: '首页' }},
  { path: '/space/info/:spaceId', meta: { title: '空间信息' }},
  { path: '/project/member/:projectId', meta: { title: '项目成员' }},
  { path: '/user/message', meta: { title: '我的消息' }},
  { path: '/admin/users', meta: { title: '用户管理' }}
]

const translations = {
  home: '首页',
  adminManage: '后台管理',
  userCenter: '用户中心'
}

function createWrapper(path, settings = {}) {
  const router = new VueRouter({ routes })
  router.push(path)
  return mount(ConsoleBreadcrumb, {
    localVue,
    router,
    mocks: {
      $t: key => translations[key] || key,
      $store: {
        state: {
          settings: {
            currentSpace: settings.currentSpace || {},
            currentProject: settings.currentProject || {}
          }
        }
      }
    }
  })
}

function getLabels(wrapper) {
  return wrapper.findAll('.el-breadcrumb__inner').wrappers.map(item => item.text())
}

describe('ConsoleBreadcrumb.vue', () => {
  it('renders only the home level on dashboard', () => {
    expect(getLabels(createWrapper('/dashboard'))).toEqual(['首页'])
  })

  it('renders space context without a fake project level', () => {
    const wrapper = createWrapper('/space/info/space-1', {
      currentSpace: { id: 'space-1', name: '开放平台' }
    })

    expect(getLabels(wrapper)).toEqual(['首页', '开放平台', '空间信息'])
  })

  it('renders complete space and project context', () => {
    const wrapper = createWrapper('/project/member/project-1', {
      currentSpace: { id: 'space-1', name: '开放平台' },
      currentProject: { id: 'project-1', name: '订单中心' }
    })

    expect(getLabels(wrapper)).toEqual(['首页', '开放平台', '订单中心', '项目成员'])
  })

  it('renders independent user and admin sections', () => {
    expect(getLabels(createWrapper('/user/message'))).toEqual(['首页', '用户中心', '我的消息'])
    expect(getLabels(createWrapper('/admin/users'))).toEqual(['首页', '后台管理', '用户管理'])
  })
})
