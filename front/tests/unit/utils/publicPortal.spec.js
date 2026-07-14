import {
  buildPortalCategories,
  countPortalFolders,
  filterPortalTree,
  flattenPortalDocuments,
  normalizeShareMenu,
  normalizeShowMenu,
  searchPortalDocuments
} from '@/utils/publicPortal'

describe('publicPortal utils', () => {
  const shareRows = [{
    id: 'module-1',
    label: '用户中心',
    type: 1,
    children: [{
      id: 'doc-1',
      label: '查询用户',
      type: 3,
      url: '/users/{id}',
      httpMethod: 'GET'
    }]
  }]

  const showRows = [{
    id: 'folder-1',
    name: '订单中心',
    isFolder: 1,
    children: [{
      id: 'item-1',
      docId: 'doc-2',
      name: '创建订单',
      isFolder: 0,
      url: '/orders',
      httpMethod: 'POST'
    }]
  }]

  it('normalizes share and show menus without changing source rows', () => {
    const shareNodes = normalizeShareMenu(shareRows, 'share-id')
    const showNodes = normalizeShowMenu(showRows, 'show-id')

    expect(shareNodes[0].children[0]).toMatchObject({
      name: '查询用户',
      path: '/share/share-id/doc-1',
      isFolder: false
    })
    expect(showNodes[0].children[0]).toMatchObject({
      name: '创建订单',
      path: '/show/show-id/doc-2',
      isFolder: false
    })
    expect(shareRows[0]).not.toHaveProperty('path')
    expect(showRows[0]).not.toHaveProperty('path')
  })

  it('flattens, counts, searches, and groups portal documents', () => {
    const nodes = normalizeShareMenu(shareRows, 'share-id')

    expect(flattenPortalDocuments(nodes)).toHaveLength(1)
    expect(countPortalFolders(nodes)).toBe(1)
    expect(searchPortalDocuments(nodes, 'users')).toHaveLength(1)
    expect(searchPortalDocuments(nodes, 'post')).toHaveLength(0)
    expect(buildPortalCategories(nodes)[0]).toMatchObject({
      name: '用户中心',
      documentCount: 1,
      firstDocumentPath: '/share/share-id/doc-1'
    })
    expect(filterPortalTree(nodes, 'query')).toHaveLength(0)
    expect(filterPortalTree(nodes, 'users')[0].children).toHaveLength(1)
  })
})
