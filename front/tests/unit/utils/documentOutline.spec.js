import {
  PORTAL_SECTION_IDS,
  buildDubboOutline,
  buildHttpOutline,
  extractHeadingOutline
} from '@/utils/documentOutline'

describe('documentOutline utils', () => {
  const translate = key => key

  it('builds an HTTP outline from the sections that are actually visible', () => {
    const outline = buildHttpOutline({
      contentType: 'application/json',
      description: '接口描述',
      requestParams: [{ name: 'id' }],
      errorCodeParams: [{ name: 'INVALID_ID' }]
    }, translate)

    expect(outline.map(section => section.id)).toEqual([
      PORTAL_SECTION_IDS.overview,
      PORTAL_SECTION_IDS.endpoint,
      PORTAL_SECTION_IDS.description,
      PORTAL_SECTION_IDS.request,
      PORTAL_SECTION_IDS.requestExample,
      PORTAL_SECTION_IDS.response,
      PORTAL_SECTION_IDS.responseExample,
      PORTAL_SECTION_IDS.errors
    ])
  })

  it('omits optional HTTP and Dubbo sections when their source data is empty', () => {
    const httpOutline = buildHttpOutline({
      requestParams: [],
      errorCodeParams: []
    }, translate)
    const dubboOutline = buildDubboOutline({ errorCodeParams: [] }, translate)

    expect(httpOutline.find(section => section.id === PORTAL_SECTION_IDS.description)).toBeUndefined()
    expect(httpOutline.find(section => section.id === PORTAL_SECTION_IDS.requestExample)).toBeUndefined()
    expect(httpOutline.find(section => section.id === PORTAL_SECTION_IDS.errors)).toBeUndefined()
    expect(dubboOutline.find(section => section.id === PORTAL_SECTION_IDS.errors)).toBeUndefined()
  })

  it('extracts readable headings and preserves existing anchors', () => {
    const root = document.createElement('div')
    root.innerHTML = '<h1>概览</h1><h2 id="existing-anchor">请求参数</h2><h3> </h3>'

    expect(extractHeadingOutline(root)).toEqual([
      { id: 'portal-heading-1', label: '概览', level: 1 },
      { id: 'existing-anchor', label: '请求参数', level: 2 }
    ])
  })
})
