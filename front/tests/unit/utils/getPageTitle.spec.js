import getPageTitle from '@/utils/get-page-title'

describe('getPageTitle', () => {
  it('uses the site name when the route has no title', () => {
    expect(getPageTitle()).toBe('文档协作站')
  })

  it('combines the route title with the site name', () => {
    expect(getPageTitle('首页')).toBe('首页 - 文档协作站')
  })
})
