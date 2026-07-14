<template>
  <div :class="{'has-logo':showLogo}" class="browse-sidebar">
    <logo v-if="showLogo" :collapse="false" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="side-opt-bar">
        <div class="side-opt-bar__heading">
          <span class="side-opt-bar__heading-icon"><i class="el-icon-collection" /></span>
          <div>
            <strong>{{ $t('viewDocumentDirectory') }}</strong>
            <small>{{ $t('viewDirectoryDescription') }}</small>
          </div>
        </div>

        <el-radio-group v-model="dimension" class="side-opt-bar__dimension" size="mini" @change="onDimensionChange">
          <el-radio-button :label="1">{{ $t('spaceDimension') }}</el-radio-button>
          <el-radio-button :label="2">{{ $t('projectDimension') }}</el-radio-button>
        </el-radio-group>

        <div class="side-opt-bar__tree-actions">
          <span>{{ $t('directoryState') }}</span>
          <el-radio-group v-model="expandAll" size="mini" @change="onTriggerStatus">
            <el-radio-button :label="true">{{ $t('expand') }}</el-radio-button>
            <el-radio-button :label="false">{{ $t('collapse') }}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <doc-select v-if="dimension === 1" ref="ref1" :node-click="onNodeClick" :on-space-change="onSpaceChange" />
      <doc-select-v2 v-if="dimension === 2" ref="ref2" :node-click="onNodeClick" :on-project-change="onProjectChange" />
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Logo from '@/components/Logo'
import DocSelect from '@/components/DocSelect'
import DocSelectV2 from '@/components/DocSelectV2'

export default {
  components: { Logo, DocSelect, DocSelectV2 },
  data() {
    return {
      types: this.getEnums().FOLDER_TYPE,
      dimension: 2,
      expandAll: false,
      docViewTabs: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebarView'
    ]),
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    }
  },
  mounted() {
    this.expandAll = (this.getAttr(this.getTriggerStatusKey()) || 'false') === 'true'
    this.dimension = parseInt(this.getAttr(this.getTriggerDimensionKey())) || 2
    this.$nextTick(() => {
      this.onTriggerStatus(this.expandAll)
    })
    this.docViewTabs = this.$store.state.settings.docViewTabSwitch
  },
  methods: {
    // 树点击事件
    onNodeClick(data, node, tree) {
      if (data.type === this.types.TYPE_DOC) {
        // 目前没想到好的办法传输文档名称到标签路由中
        // this.goRoute(`/view/${data.docId}`)
        this.toRoute({ path: `/view/${data.docId}` }, data.label || node.url)
      }
    },
    onSpaceChange(spaceId) {
      this.setSpaceId(spaceId)
    },
    onProjectChange(projectId) {
      this.setProjectId(projectId)
    },
    onTriggerStatus(val) {
      this.setAttr(this.getTriggerStatusKey(), val)
      this.getSelectRef().onTriggerStatus(val)
    },
    onDimensionChange(val) {
      this.setAttr(this.getTriggerDimensionKey(), val)
    },
    getSelectRef() {
      if (this.dimension === 1) {
        return this.$refs.ref1
      } else if (this.dimension === 2) {
        return this.$refs.ref2
      }
    },
    getTriggerStatusKey() {
      return `torna.doc.view.tree.trigger`
    },
    getTriggerDimensionKey() {
      return `torna.doc.view.dimension`
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.browse-sidebar {
  height: 100%;
  color: $consoleTextPrimary;
  background: #f8fafc;

  /deep/ .sidebar-logo-container {
    border-bottom: 1px solid $consoleBorderColor;
    box-shadow: none;
  }

  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  /deep/ .select-area {
    padding: 0 14px;

    .space-select,
    .project-select {
      width: 100%;
      padding: 0;
    }

    .el-input__inner {
      height: 36px;
      padding-left: 12px;
      color: $consoleTextPrimary;
      background: $consoleSurface;
      border-color: $consoleBorderColor;
      border-radius: 8px;
    }
  }

  /deep/ .menu-tree {
    padding: 12px 10px 20px;
    background: transparent;

    > .el-input {
      width: calc(100% - 8px);
      margin: 0 4px 10px !important;
    }

    .el-input__inner {
      height: 34px;
      background: $consoleSurface;
      border-color: $consoleBorderColor;
      border-radius: 8px;
    }

    .el-tree {
      color: #344054;
      background: transparent;
    }

    .el-tree-node__content {
      height: 36px;
      margin: 2px 0;
      padding-right: 8px;
      border-radius: 7px;
      transition: color 0.16s ease, background 0.16s ease;

      &:hover {
        color: $consolePrimary;
        background: $consolePrimaryLight;
      }
    }

    .el-tree-node.is-current > .el-tree-node__content {
      color: $consolePrimary;
      font-weight: 600;
      background: $consolePrimaryLight;
      box-shadow: inset 3px 0 0 $consolePrimary;
    }

    .el-tree-node__expand-icon {
      color: #98a2b3;
    }

    .tip {
      margin-left: 4px;
      color: #98a2b3;
      font-size: 11px;
    }
  }
}

.side-opt-bar {
  padding: 18px 14px 14px;

  &__heading {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    > div {
      min-width: 0;
      margin-left: 10px;
    }

    strong,
    small {
      display: block;
    }

    strong {
      color: $consoleTextPrimary;
      font-size: 15px;
      line-height: 1.4;
    }

    small {
      margin-top: 2px;
      overflow: hidden;
      color: $consoleTextSecondary;
      font-size: 11px;
      line-height: 1.4;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &__heading-icon {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    color: $consolePrimary;
    font-size: 17px;
    background: $consolePrimaryLight;
    border-radius: 9px;
  }

  &__dimension {
    display: flex;
    width: 100%;

    /deep/ .el-radio-button {
      flex: 1;
    }

    /deep/ .el-radio-button__inner {
      width: 100%;
      padding: 9px 8px;
    }
  }

  &__tree-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 14px;

    > span {
      color: $consoleTextSecondary;
      font-size: 12px;
    }

    /deep/ .el-radio-button__inner {
      padding: 6px 10px;
    }
  }
}
</style>
