import { Enums } from '@/utils/enums'

function createPortalNode(row, options) {
  const children = options.normalizeChildren(row.children || [])
  const isFolder = options.isFolder(row)
  const docId = isFolder ? '' : options.getDocId(row)

  return {
    key: `${options.mode}-${row.id || docId}`,
    id: row.id ? String(row.id) : '',
    docId: docId ? String(docId) : '',
    name: options.getName(row),
    url: row.url || '',
    httpMethod: row.httpMethod || '',
    isFolder,
    path: docId ? `/${options.mode}/${options.portalId}/${docId}` : '',
    children
  }
}

export function normalizeShareMenu(rows, shareId) {
  const normalizeChildren = children => normalizeShareMenu(children, shareId)
  return (rows || []).map(row => createPortalNode(row, {
    mode: 'share',
    portalId: shareId,
    normalizeChildren,
    isFolder: item => item.type !== Enums.FOLDER_TYPE.TYPE_DOC,
    getDocId: item => item.id,
    getName: item => item.label || item.name || ''
  }))
}

export function normalizeShowMenu(rows, showId) {
  const normalizeChildren = children => normalizeShowMenu(children, showId)
  return (rows || []).map(row => createPortalNode(row, {
    mode: 'show',
    portalId: showId,
    normalizeChildren,
    isFolder: item => item.isFolder === 1,
    getDocId: item => item.docId,
    getName: item => item.name || ''
  }))
}

export function flattenPortalDocuments(nodes) {
  const documents = []
  for (const node of nodes || []) {
    if (!node.isFolder && node.docId) {
      documents.push(node)
    }
    documents.push(...flattenPortalDocuments(node.children))
  }
  return documents
}

export function countPortalFolders(nodes) {
  let count = 0
  for (const node of nodes || []) {
    if (node.isFolder) {
      count += 1
    }
    count += countPortalFolders(node.children)
  }
  return count
}

export function searchPortalDocuments(nodes, keyword) {
  const search = (keyword || '').trim().toLowerCase()
  if (!search) {
    return []
  }
  return flattenPortalDocuments(nodes).filter(node => {
    return [node.name, node.url, node.httpMethod]
      .some(value => value && value.toLowerCase().indexOf(search) > -1)
  })
}

export function filterPortalTree(nodes, keyword) {
  const search = (keyword || '').trim().toLowerCase()
  if (!search) {
    return nodes || []
  }

  const filtered = []
  for (const node of nodes || []) {
    const children = filterPortalTree(node.children, search)
    const matched = [node.name, node.url, node.httpMethod]
      .some(value => value && value.toLowerCase().indexOf(search) > -1)
    if (matched || children.length > 0) {
      filtered.push(Object.assign({}, node, { children }))
    }
  }
  return filtered
}

export function buildPortalCategories(nodes) {
  return (nodes || []).map(node => {
    const documents = node.isFolder ? flattenPortalDocuments([node]) : [node]
    return {
      key: node.key,
      name: node.name,
      documentCount: documents.length,
      firstDocumentPath: documents.length > 0 ? documents[0].path : '',
      isFolder: node.isFolder,
      httpMethod: node.httpMethod
    }
  })
}
