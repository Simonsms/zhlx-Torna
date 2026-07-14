export const PORTAL_SECTION_IDS = Object.freeze({
  overview: 'portal-section-overview',
  endpoint: 'portal-section-endpoint',
  description: 'portal-section-description',
  definition: 'portal-section-definition',
  request: 'portal-section-request',
  requestExample: 'portal-section-request-example',
  response: 'portal-section-response',
  responseExample: 'portal-section-response-example',
  errors: 'portal-section-errors'
})

function hasJsonContentType(docInfo) {
  return docInfo.contentType && docInfo.contentType.toLowerCase().indexOf('json') > -1
}

export function buildHttpOutline(docInfo, translate) {
  const sections = [
    { id: PORTAL_SECTION_IDS.overview, label: translate('apiInfo') },
    { id: PORTAL_SECTION_IDS.endpoint, label: 'URL' }
  ]
  if (docInfo.description) {
    sections.push({ id: PORTAL_SECTION_IDS.description, label: translate('description') })
  }
  sections.push({ id: PORTAL_SECTION_IDS.request, label: translate('requestParams') })
  if (hasJsonContentType(docInfo) && (docInfo.requestParams || []).length > 0) {
    sections.push({ id: PORTAL_SECTION_IDS.requestExample, label: translate('requestExample') })
  }
  sections.push(
    { id: PORTAL_SECTION_IDS.response, label: translate('responseParam') },
    { id: PORTAL_SECTION_IDS.responseExample, label: translate('responseExample') }
  )
  if ((docInfo.errorCodeParams || []).length > 0) {
    sections.push({ id: PORTAL_SECTION_IDS.errors, label: translate('errorCode') })
  }
  return sections
}

export function buildDubboOutline(docInfo, translate) {
  const sections = [
    { id: PORTAL_SECTION_IDS.overview, label: translate('apiInfo') },
    { id: PORTAL_SECTION_IDS.definition, label: translate('method') },
    { id: PORTAL_SECTION_IDS.request, label: translate('invokeParam') },
    { id: PORTAL_SECTION_IDS.response, label: translate('returnResult') }
  ]
  if ((docInfo.errorCodeParams || []).length > 0) {
    sections.push({ id: PORTAL_SECTION_IDS.errors, label: translate('errorCode') })
  }
  return sections
}

export function extractHeadingOutline(root, prefix = 'portal-heading') {
  if (!root || !root.querySelectorAll) {
    return []
  }
  const headings = Array.from(root.querySelectorAll('h1, h2, h3, h4'))
  return headings.reduce((sections, heading, index) => {
    const label = (heading.textContent || '').trim()
    if (!label) {
      return sections
    }
    if (!heading.id) {
      heading.id = `${prefix}-${index + 1}`
    }
    sections.push({
      id: heading.id,
      label,
      level: Number(heading.tagName.substring(1))
    })
    return sections
  }, [])
}
