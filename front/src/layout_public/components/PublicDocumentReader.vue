<template>
  <div class="public-document-reader">
    <article ref="content" class="public-document-reader__article">
      <slot />
    </article>
    <aside class="public-document-reader__outline">
      <public-document-outline :sections="resolvedSections" :active-id="activeId" @select="scrollToSection" />
    </aside>
  </div>
</template>

<script>
import PublicDocumentOutline from './PublicDocumentOutline'
import { extractHeadingOutline } from '@/utils/documentOutline'

const HEADER_OFFSET = 88

export default {
  name: 'PublicDocumentReader',
  components: { PublicDocumentOutline },
  props: {
    sections: {
      type: Array,
      default: () => []
    },
    dynamicOutline: {
      type: Boolean,
      default: false
    },
    dynamicOutlineSelector: {
      type: String,
      default: ''
    },
    contentKey: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      resolvedSections: [],
      activeId: '',
      scrollFrame: null,
      refreshTimer: null
    }
  },
  watch: {
    sections: {
      deep: true,
      handler() {
        this.scheduleRefresh()
      }
    },
    contentKey() {
      this.scheduleRefresh()
    },
    dynamicOutline() {
      this.scheduleRefresh()
    },
    dynamicOutlineSelector() {
      this.scheduleRefresh()
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll, { passive: true })
    this.scheduleRefresh()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
    if (this.scrollFrame) {
      window.cancelAnimationFrame(this.scrollFrame)
    }
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer)
    }
  },
  methods: {
    scheduleRefresh() {
      if (this.refreshTimer) {
        clearTimeout(this.refreshTimer)
      }
      this.refreshTimer = setTimeout(() => {
        this.refreshTimer = null
        this.refreshOutline()
      }, 0)
    },
    refreshOutline() {
      const contentRoot = this.dynamicOutlineSelector && this.$refs.content
        ? this.$refs.content.querySelector(this.dynamicOutlineSelector)
        : this.$refs.content
      this.resolvedSections = this.dynamicOutline
        ? extractHeadingOutline(contentRoot)
        : this.sections.slice()
      this.activeId = this.resolvedSections.length > 0 ? this.resolvedSections[0].id : ''
      this.updateActiveSection()
    },
    scrollToSection(id) {
      const target = document.getElementById(id)
      if (!target) {
        return
      }
      const top = target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET
      window.scrollTo({ top, behavior: 'smooth' })
      this.activeId = id
    },
    onScroll() {
      if (this.scrollFrame) {
        return
      }
      this.scrollFrame = window.requestAnimationFrame(() => {
        this.scrollFrame = null
        this.updateActiveSection()
      })
    },
    updateActiveSection() {
      let currentId = this.resolvedSections.length > 0 ? this.resolvedSections[0].id : ''
      for (const section of this.resolvedSections) {
        const target = document.getElementById(section.id)
        if (target && target.getBoundingClientRect().top <= HEADER_OFFSET + 16) {
          currentId = section.id
        }
      }
      this.activeId = currentId
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.public-document-reader {
  display: grid;
  grid-template-columns: minmax(0, 920px) 208px;
  gap: 36px;
  justify-content: center;
  min-height: calc(100vh - #{$portalHeaderHeight});
  padding: 32px 36px 80px;

  &__article {
    min-width: 0;
    padding: 36px 42px 64px;
    background: $portalSurface;
    border: 1px solid $portalBorderColor;
    border-radius: 14px;
    box-shadow: 0 4px 18px rgba(31, 42, 68, 0.05);

    /deep/ .doc-view-container > .el-tabs > .el-tabs__header {
      margin-bottom: 28px;
    }

    /deep/ .el-tabs__nav-wrap::after {
      height: 1px;
      background: $portalBorderColor;
    }

    /deep/ .el-tabs__item {
      height: 46px;
      color: $portalTextSecondary;
      line-height: 46px;
    }

    /deep/ .el-tabs__item.is-active {
      color: $portalPrimary;
      font-weight: 600;
    }

    /deep/ .doc-view,
    /deep/ .v-show-content {
      color: $portalTextPrimary;
      font-size: 14px;
      line-height: 1.75;
    }

    /deep/ .doc-view h2,
    /deep/ .doc-view h1 {
      color: $portalTextPrimary;
      letter-spacing: -0.02em;
    }

    /deep/ .doc-view h4 {
      padding-top: 22px;
      margin: 18px 0 14px;
      color: $portalTextPrimary;
      font-size: 16px;
      scroll-margin-top: 88px;
    }

    /deep/ .doc-view .doc-title {
      margin-top: 0;
      font-size: 30px;
      line-height: 1.3;
    }

    /deep/ .doc-view .doc-label {
      padding: 0;
      border-left: 0;
    }

    /deep/ .debug-url {
      padding: 13px 16px;
      color: #22304a;
      font-family: Consolas, Monaco, monospace;
      background: #f5f8fc;
      border: 1px solid $portalBorderColor;
      border-radius: 9px;
    }

    /deep/ .code-block,
    /deep/ pre {
      padding: 18px;
      overflow: auto;
      color: #d8e5f8;
      font-family: Consolas, Monaco, monospace;
      line-height: 1.65;
      background: #132238;
      border: 0;
      border-radius: 10px;
    }

    /deep/ .el-table {
      overflow: hidden;
      border: 1px solid $portalBorderColor;
      border-radius: 9px;
    }

    /deep/ .el-table th {
      color: #344054;
      background: #f7f9fc;
    }

    /deep/ .v-note-wrapper,
    /deep/ .v-show-content {
      min-height: 0 !important;
      padding-right: 0 !important;
      padding-left: 0 !important;
      background: #ffffff !important;
      border: 0 !important;
    }

    /deep/ [id^='portal-section-'],
    /deep/ [id^='portal-heading-'] {
      scroll-margin-top: 88px;
    }
  }

  &__outline {
    min-width: 0;
  }
}

@media (max-width: 1279px) {
  .public-document-reader {
    grid-template-columns: minmax(0, 920px);

    &__outline {
      display: none;
    }
  }
}

@media (max-width: 767px) {
  .public-document-reader {
    display: block;
    padding: 16px 12px 48px;

    &__article {
      padding: 24px 18px 48px;
      border-radius: 10px;
    }

    /deep/ .doc-view .doc-title {
      font-size: 24px;
    }
  }
}
</style>
