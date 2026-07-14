<template>
  <nav class="public-portal-navigation" :aria-label="$t('portalContents')">
    <div class="public-portal-navigation__header">
      <button type="button" class="public-portal-navigation__home" @click="openPath(homePath)">
        <i class="el-icon-s-home" />
        <span>{{ $t('portalHome') }}</span>
      </button>
      <div class="public-portal-navigation__heading">
        <span>{{ $t('portalContents') }}</span>
        <button type="button" :title="expandLabel" :aria-label="expandLabel" @click="toggleExpandAll">
          <i :class="expandAll ? 'el-icon-folder' : 'el-icon-folder-opened'" />
        </button>
      </div>
      <el-input
        v-model="keyword"
        size="small"
        clearable
        prefix-icon="el-icon-search"
        :placeholder="$t('portalNavigationSearch')"
      />
    </div>

    <div class="public-portal-navigation__tree">
      <el-tree
        :key="treeRenderKey"
        ref="tree"
        :data="filteredNodes"
        :props="treeProps"
        :node-key="'key'"
        :current-node-key="currentNodeKey"
        :default-expand-all="expandAll || Boolean(keyword)"
        :default-expanded-keys="defaultExpandedKeys"
        :expand-on-click-node="false"
        :highlight-current="true"
        :empty-text="$t('portalNoSearchResults')"
        @node-click="onNodeClick"
      >
        <span slot-scope="{ node, data }" class="public-portal-navigation__node">
          <i v-if="data.isFolder" class="el-icon-folder" />
          <span v-else-if="data.httpMethod" class="public-portal-navigation__method" :class="methodClass(data.httpMethod)">
            {{ data.httpMethod }}
          </span>
          <i v-else class="el-icon-document" />
          <span class="public-portal-navigation__node-label" :title="node.label">{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
  </nav>
</template>

<script>
import { filterPortalTree } from '@/utils/publicPortal'

export default {
  name: 'PublicPortalNavigation',
  props: {
    nodes: {
      type: Array,
      default: () => []
    },
    homePath: {
      type: String,
      required: true
    },
    activeDocId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      keyword: '',
      expandAll: false,
      treeRenderKey: 0,
      treeProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {
    filteredNodes() {
      return filterPortalTree(this.nodes, this.keyword)
    },
    currentNodeKey() {
      return this.findNodeKey(this.nodes, this.activeDocId)
    },
    defaultExpandedKeys() {
      const nodePath = this.findNodePath(this.nodes, this.activeDocId)
      return nodePath.slice(0, -1)
    },
    expandLabel() {
      return this.expandAll ? this.$t('collapse') : this.$t('expand')
    }
  },
  watch: {
    currentNodeKey(key) {
      this.$nextTick(() => {
        if (this.$refs.tree && key) {
          this.$refs.tree.setCurrentKey(key)
        }
      })
    }
  },
  methods: {
    findNodeKey(nodes, docId) {
      if (!docId) {
        return ''
      }
      for (const node of nodes || []) {
        if (node.docId === docId) {
          return node.key
        }
        const childKey = this.findNodeKey(node.children, docId)
        if (childKey) {
          return childKey
        }
      }
      return ''
    },
    findNodePath(nodes, docId, parents = []) {
      if (!docId) {
        return []
      }
      for (const node of nodes || []) {
        const currentPath = parents.concat(node.key)
        if (node.docId === docId) {
          return currentPath
        }
        const childPath = this.findNodePath(node.children, docId, currentPath)
        if (childPath.length > 0) {
          return childPath
        }
      }
      return []
    },
    methodClass(method) {
      return `public-portal-navigation__method--${method.toLowerCase()}`
    },
    onNodeClick(node) {
      if (!node.isFolder) {
        this.openPath(node.path)
      }
    },
    openPath(path) {
      if (path) {
        this.$emit('navigate', path)
      }
    },
    toggleExpandAll() {
      this.expandAll = !this.expandAll
      this.treeRenderKey += 1
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.public-portal-navigation {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: $portalTextPrimary;
  background: $portalSurface;

  &__header {
    flex: 0 0 auto;
    padding: 18px 16px 14px;
    border-bottom: 1px solid $portalBorderColor;
  }

  &__home {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 12px;
    margin-bottom: 18px;
    color: $portalTextPrimary;
    font-weight: 600;
    text-align: left;
    background: $portalPrimaryLight;
    border: 1px solid rgba(22, 119, 255, 0.12);
    border-radius: 10px;
    cursor: pointer;

    i {
      margin-right: 10px;
      color: $portalPrimary;
      font-size: 17px;
    }

    &:hover,
    &:focus-visible {
      color: $portalPrimary;
      border-color: rgba(22, 119, 255, 0.32);
      outline: 0;
    }
  }

  &__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 4px 10px;
    color: $portalTextSecondary;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;

    button {
      width: 28px;
      height: 28px;
      padding: 0;
      color: $portalTextSecondary;
      background: transparent;
      border: 0;
      border-radius: 6px;
      cursor: pointer;

      &:hover,
      &:focus-visible {
        color: $portalPrimary;
        background: $portalPrimaryLight;
        outline: 0;
      }
    }
  }

  &__tree {
    flex: 1;
    min-height: 0;
    padding: 10px 8px 24px;
    overflow: auto;

    /deep/ .el-tree {
      color: $portalTextPrimary;
      background: transparent;
    }

    /deep/ .el-tree-node__content {
      height: 38px;
      margin: 2px 0;
      border-radius: 8px;

      &:hover {
        background: #f3f7fc;
      }
    }

    /deep/ .el-tree-node.is-current > .el-tree-node__content {
      color: $portalPrimary;
      font-weight: 600;
      background: $portalPrimaryLight;
    }

    /deep/ .el-tree-node__expand-icon {
      color: #98a2b3;
    }
  }

  &__node {
    display: flex;
    flex: 1;
    align-items: center;
    min-width: 0;
    padding-right: 8px;

    > i {
      flex: 0 0 auto;
      margin-right: 8px;
      color: #8c98aa;
    }
  }

  &__node-label {
    overflow: hidden;
    font-size: 13px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__method {
    flex: 0 0 38px;
    margin-right: 6px;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: -0.02em;
    text-align: center;

    &--get {
      color: #0f9f6e;
    }

    &--post {
      color: #1677ff;
    }

    &--put,
    &--patch {
      color: #d97706;
    }

    &--delete {
      color: #dc2626;
    }
  }
}
</style>
