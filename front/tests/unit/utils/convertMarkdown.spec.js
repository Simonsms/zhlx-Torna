import MarkdownUtil from '@/utils/convert-markdown'
import { Enums } from '@/utils/enums'

describe('MarkdownUtil.toMarkdown', () => {
  beforeAll(() => {
    global.$t = key => key
  })

  afterAll(() => {
    delete global.$t
  })

  it('uses backward-compatible options when export options are omitted', () => {
    const docInfo = {
      name: '用户接口',
      author: '张三',
      type: Enums.DOC_TYPE.MARKDOWN,
      description: '接口说明'
    }

    expect(MarkdownUtil.toMarkdown(docInfo)).toContain('maintainer：张三')
  })

  it('hides the maintainer when explicitly configured', () => {
    const docInfo = {
      name: '用户接口',
      author: '张三',
      type: Enums.DOC_TYPE.MARKDOWN,
      description: '接口说明'
    }

    expect(MarkdownUtil.toMarkdown(docInfo, { hideMaintainer: 1 })).not.toContain('张三')
  })
})
