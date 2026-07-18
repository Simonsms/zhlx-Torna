<template>
  <section class="workspace-tabs" aria-label="工作标签页">
    <div class="workspace-tabs__list" role="tablist">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="workspace-tabs__item"
        :class="{ 'is-active': tab.key === activeKey }"
      >
        <button
          type="button"
          class="workspace-tabs__title"
          role="tab"
          :aria-selected="tab.key === activeKey"
          :tabindex="tab.key === activeKey ? 0 : -1"
          :title="tab.title"
          @click="activateTab(tab)"
        >
          <i v-if="!tab.closable" class="el-icon-house" />
          <span>{{ tab.title }}</span>
        </button>
        <button
          v-if="tab.closable"
          type="button"
          class="workspace-tabs__close el-icon-close"
          :aria-label="`关闭 ${tab.title}`"
          @click="closeTab(tab)"
        />
      </div>
    </div>

    <el-dropdown trigger="click" placement="bottom-end" @command="handleCommand">
      <button type="button" class="workspace-tabs__menu" aria-label="标签页操作">
        <i class="el-icon-more" />
      </button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="closeCurrent" :disabled="!activeTab.closable">
          {{ $t('closeCurrent') }}
        </el-dropdown-item>
        <el-dropdown-item command="closeOthers" :disabled="tabs.length <= 1">
          {{ $t('closeOthers') }}
        </el-dropdown-item>
        <el-dropdown-item command="closeLeft" :disabled="!hasClosableLeft">
          {{ $t('closeLeft') }}
        </el-dropdown-item>
        <el-dropdown-item command="closeRight" :disabled="!hasClosableRight">
          {{ $t('closeRight') }}
        </el-dropdown-item>
        <el-dropdown-item command="closeAll" divided :disabled="tabs.length <= 1">
          {{ $t('closeAll') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </section>
</template>

<script>
import { createWorkspaceTabKey } from '@/store/modules/workspaceTabs'

export default {
  name: 'WorkspaceTabs',
  computed: {
    tabs() {
      return this.$store.state.workspaceTabs.tabs
    },
    activeKey() {
      return this.$store.state.workspaceTabs.activeKey
    },
    activeTab() {
      return this.tabs.find(tab => tab.key === this.activeKey) || this.tabs[0]
    },
    activeIndex() {
      return this.tabs.findIndex(tab => tab.key === this.activeKey)
    },
    hasClosableLeft() {
      return this.tabs.some((tab, index) => tab.closable && index < this.activeIndex)
    },
    hasClosableRight() {
      return this.tabs.some((tab, index) => tab.closable && index > this.activeIndex)
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        this.$store.dispatch('workspaceTabs/openRoute', route)
      }
    }
  },
  methods: {
    activateTab(tab) {
      if (createWorkspaceTabKey(this.$route) !== tab.key) {
        this.$router.push(tab.fullPath)
      }
    },
    closeTab(tab) {
      const closingActiveTab = tab.key === this.activeKey
      this.$store.dispatch('workspaceTabs/closeTab', tab.key).then(activeTab => {
        if (closingActiveTab) {
          this.goToActiveTab(activeTab)
        }
      })
    },
    handleCommand(command) {
      const handlers = {
        closeCurrent: () => this.closeTab(this.activeTab),
        closeOthers: () => this.$store.dispatch('workspaceTabs/closeOthers', this.activeKey),
        closeLeft: () => this.$store.dispatch('workspaceTabs/closeLeft', this.activeKey),
        closeRight: () => this.$store.dispatch('workspaceTabs/closeRight', this.activeKey),
        closeAll: () => this.$store.dispatch('workspaceTabs/closeAll').then(this.goToActiveTab)
      }
      const handler = handlers[command]
      if (handler) {
        handler()
      }
    },
    goToActiveTab(activeTab) {
      if (activeTab && createWorkspaceTabKey(this.$route) !== activeTab.key) {
        this.$router.push(activeTab.fullPath)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.workspace-tabs {
  position: relative;
  z-index: 8;
  display: flex;
  height: $consoleTabsHeight;
  background: $consoleSurface;
  border-bottom: 1px solid $consoleBorderColor;

  &__list {
    display: flex;
    flex: 1;
    min-width: 0;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
  }

  &__item {
    position: relative;
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    max-width: 220px;
    color: $consoleTextSecondary;
    border-right: 1px solid $consoleBorderColor;

    &::after {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      content: '';
      background: transparent;
    }

    &:hover,
    &.is-active {
      color: $consolePrimary;
      background: $consolePrimaryLight;
    }

    &.is-active::after {
      background: $consolePrimary;
    }
  }

  &__title,
  &__close,
  &__menu {
    padding: 0;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 0;
  }

  &__title {
    display: flex;
    align-items: center;
    min-width: 0;
    height: 100%;
    padding: 0 10px 0 12px;
    font-size: 13px;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    i {
      margin-right: 6px;
    }

    &:focus-visible {
      outline: 2px solid rgba($consolePrimary, 0.3);
      outline-offset: -2px;
    }
  }

  &__close {
    margin-right: 8px;
    font-size: 12px;
    border-radius: 50%;

    &:hover,
    &:focus-visible {
      color: $consoleSurface;
      background: $consoleTextSecondary;
      outline: none;
    }
  }

  &__menu {
    width: $consoleTabsHeight;
    height: $consoleTabsHeight;
    color: $consoleTextSecondary;
    border-left: 1px solid $consoleBorderColor;

    &:hover,
    &:focus-visible {
      color: $consolePrimary;
      background: $consolePrimaryLight;
      outline: none;
    }
  }
}
</style>
