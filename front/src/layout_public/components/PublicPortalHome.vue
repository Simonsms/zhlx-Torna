<template>
  <section class="public-portal-home">
    <div class="public-portal-home__hero">
      <div class="public-portal-home__eyebrow">{{ $t('portalEyebrow') }}</div>
      <h1>{{ title }}</h1>
      <p>{{ description || $t('portalDefaultDescription') }}</p>

      <div class="public-portal-home__search">
        <i class="el-icon-search" />
        <input
          v-model="keyword"
          type="search"
          :placeholder="$t('portalSearchPlaceholder')"
          :aria-label="$t('portalSearchPlaceholder')"
        >
        <button v-if="keyword" type="button" :aria-label="$t('clear')" @click="keyword = ''">
          <i class="el-icon-close" />
        </button>
      </div>

      <div v-if="keyword" class="public-portal-home__search-results">
        <button
          v-for="document in searchResults"
          :key="document.key"
          type="button"
          class="public-portal-home__search-result"
          @click="openPath(document.path)"
        >
          <span class="public-portal-home__method">{{ document.httpMethod || 'DOC' }}</span>
          <span>
            <strong>{{ document.name }}</strong>
            <small v-if="document.url">{{ document.url }}</small>
          </span>
          <i class="el-icon-right" />
        </button>
        <div v-if="searchResults.length === 0" class="public-portal-home__empty-result">
          {{ $t('portalNoSearchResults') }}
        </div>
      </div>

      <div class="public-portal-home__actions">
        <el-button v-if="firstDocument" type="primary" @click="openPath(firstDocument.path)">
          {{ $t('portalQuickStart') }} <i class="el-icon-right el-icon--right" />
        </el-button>
        <span>{{ documentCount }} {{ $t('portalDocuments') }} · {{ folderCount }} {{ $t('portalCategories') }}</span>
      </div>
    </div>

    <div class="public-portal-home__content">
      <div class="public-portal-home__section-heading">
        <div>
          <span>{{ $t('portalBrowseEyebrow') }}</span>
          <h2>{{ $t('portalBrowseTitle') }}</h2>
        </div>
        <p>{{ $t('portalBrowseDescription') }}</p>
      </div>

      <div v-if="categories.length > 0" class="public-portal-home__category-grid">
        <button
          v-for="category in categories"
          :key="category.key"
          type="button"
          class="public-portal-home__category"
          :disabled="!category.firstDocumentPath"
          @click="openPath(category.firstDocumentPath)"
        >
          <span class="public-portal-home__category-icon">
            <i :class="category.isFolder ? 'el-icon-folder-opened' : 'el-icon-document'" />
          </span>
          <span class="public-portal-home__category-body">
            <strong>{{ category.name }}</strong>
            <small>{{ category.documentCount }} {{ $t('portalDocuments') }}</small>
          </span>
          <i class="el-icon-right" />
        </button>
      </div>

      <div v-else class="public-portal-home__empty">
        <i class="el-icon-document" />
        <h3>{{ $t('portalNoDocuments') }}</h3>
        <p>{{ $t('portalNoDocumentsDescription') }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import {
  buildPortalCategories,
  countPortalFolders,
  flattenPortalDocuments,
  searchPortalDocuments
} from '@/utils/publicPortal'

export default {
  name: 'PublicPortalHome',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    nodes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      keyword: ''
    }
  },
  computed: {
    documents() {
      return flattenPortalDocuments(this.nodes)
    },
    firstDocument() {
      return this.documents.length > 0 ? this.documents[0] : null
    },
    documentCount() {
      return this.documents.length
    },
    folderCount() {
      return countPortalFolders(this.nodes)
    },
    categories() {
      return buildPortalCategories(this.nodes)
    },
    searchResults() {
      return searchPortalDocuments(this.nodes, this.keyword).slice(0, 8)
    }
  },
  methods: {
    openPath(path) {
      if (path) {
        this.$emit('navigate', path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.public-portal-home {
  min-height: calc(100vh - #{$portalHeaderHeight});
  background: $portalPageBackground;

  &__hero {
    position: relative;
    padding: 72px 64px;
    overflow: visible;
    color: #ffffff;
    background:
      radial-gradient(circle at 82% 18%, rgba(73, 151, 255, 0.46), transparent 34%),
      linear-gradient(128deg, #0d2855 0%, #1253a3 54%, #1677ff 100%);

    &::after {
      position: absolute;
      right: 7%;
      bottom: -52px;
      width: 240px;
      height: 240px;
      content: '';
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.13);
      border-radius: 48px;
      transform: rotate(20deg);
      pointer-events: none;
    }

    h1 {
      position: relative;
      z-index: 1;
      max-width: 780px;
      margin: 12px 0 16px;
      font-size: 52px;
      line-height: 1.18;
      letter-spacing: -0.025em;
    }

    > p {
      position: relative;
      z-index: 1;
      max-width: 720px;
      margin: 0;
      color: rgba(255, 255, 255, 0.78);
      font-size: 16px;
      line-height: 1.8;
    }
  }

  &__eyebrow,
  &__section-heading span {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  &__eyebrow {
    color: #8dc4ff;
  }

  &__search {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    max-width: 720px;
    height: 58px;
    margin-top: 32px;
    color: $portalTextSecondary;
    background: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.55);
    border-radius: 14px;
    box-shadow: 0 18px 42px rgba(4, 22, 50, 0.28);

    > i {
      margin-left: 20px;
      font-size: 20px;
    }

    input {
      flex: 1;
      min-width: 0;
      height: 100%;
      padding: 0 14px;
      color: $portalTextPrimary;
      font: inherit;
      background: transparent;
      border: 0;
      outline: 0;
    }

    button {
      width: 52px;
      height: 100%;
      color: $portalTextSecondary;
      background: transparent;
      border: 0;
      cursor: pointer;
    }
  }

  &__search-results {
    position: absolute;
    z-index: 4;
    width: 720px;
    max-width: calc(100% - 128px);
    max-height: 360px;
    margin-top: 8px;
    overflow: auto;
    background: #ffffff;
    border: 1px solid $portalBorderColor;
    border-radius: 12px;
    box-shadow: $portalShadow;
  }

  &__search-result {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 13px 16px;
    color: $portalTextPrimary;
    text-align: left;
    background: #ffffff;
    border: 0;
    border-bottom: 1px solid $portalBorderColor;
    cursor: pointer;

    &:hover,
    &:focus-visible {
      background: $portalPrimaryLight;
      outline: 0;
    }

    > span:nth-child(2) {
      display: flex;
      flex: 1;
      flex-direction: column;
      min-width: 0;
    }

    strong,
    small {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    small {
      margin-top: 4px;
      color: $portalTextSecondary;
    }
  }

  &__method {
    flex: 0 0 54px;
    margin-right: 12px;
    color: $portalPrimary;
    font-size: 11px;
    font-weight: 700;
  }

  &__empty-result {
    padding: 28px;
    color: $portalTextSecondary;
    text-align: center;
  }

  &__actions {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    margin-top: 24px;

    span {
      margin-left: 18px;
      color: rgba(255, 255, 255, 0.65);
      font-size: 13px;
    }

    /deep/ .el-button--primary {
      color: #0f4f9f;
      font-weight: 600;
      background: #ffffff;
      border-color: #ffffff;
      box-shadow: 0 8px 20px rgba(5, 28, 62, 0.2);
    }
  }

  &__content {
    max-width: 1160px;
    padding: 56px 40px 80px;
    margin: 0 auto;
  }

  &__section-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 24px;

    span {
      color: $portalPrimary;
    }

    h2 {
      margin: 8px 0 0;
      font-size: 28px;
      letter-spacing: -0.02em;
    }

    p {
      max-width: 440px;
      margin: 0;
      color: $portalTextSecondary;
      line-height: 1.7;
    }
  }

  &__category-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }

  &__category {
    display: flex;
    align-items: center;
    min-height: 112px;
    padding: 22px;
    color: $portalTextPrimary;
    text-align: left;
    background: $portalSurface;
    border: 1px solid $portalBorderColor;
    border-radius: 14px;
    box-shadow: 0 3px 10px rgba(31, 42, 68, 0.03);
    cursor: pointer;
    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;

    &:hover:not(:disabled),
    &:focus-visible:not(:disabled) {
      border-color: rgba(22, 119, 255, 0.45);
      box-shadow: $portalShadow;
      outline: 0;
      transform: translateY(-2px);
    }

    &:disabled {
      cursor: default;
      opacity: 0.6;
    }

    > .el-icon-right {
      color: #a6afc0;
    }
  }

  &__category-icon {
    display: inline-flex;
    flex: 0 0 44px;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    margin-right: 16px;
    color: $portalPrimary;
    font-size: 20px;
    background: $portalPrimaryLight;
    border-radius: 12px;
  }

  &__category-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;

    strong {
      overflow: hidden;
      font-size: 15px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    small {
      margin-top: 8px;
      color: $portalTextSecondary;
    }
  }

  &__empty {
    padding: 72px 24px;
    color: $portalTextSecondary;
    text-align: center;
    background: $portalSurface;
    border: 1px dashed #ccd4e0;
    border-radius: 16px;

    > i {
      color: #b1bdd0;
      font-size: 42px;
    }

    h3 {
      margin: 18px 0 8px;
      color: $portalTextPrimary;
    }

    p {
      margin: 0;
    }
  }
}

@media (max-width: 1199px) {
  .public-portal-home {
    &__hero {
      padding-right: 48px;
      padding-left: 48px;
    }

    &__category-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
}

@media (max-width: 767px) {
  .public-portal-home {
    &__hero {
      padding: 48px 20px;

      h1 {
        font-size: 34px;
      }
    }

    &__search-results {
      width: calc(100% - 40px);
    }

    &__actions,
    &__section-heading {
      align-items: flex-start;
      flex-direction: column;
    }

    &__actions span {
      margin: 14px 0 0;
    }

    &__content {
      padding: 40px 20px 64px;
    }

    &__section-heading p {
      margin-top: 12px;
    }

    &__category-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
