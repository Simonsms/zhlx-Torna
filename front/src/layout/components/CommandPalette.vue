<template>
  <div class="command-palette">
    <button type="button" class="command-palette__trigger" @click="open">
      <i class="el-icon-search" />
      <span>{{ $t('functionSearch') }}</span>
      <kbd>Ctrl K</kbd>
    </button>

    <el-dialog
      :visible.sync="visible"
      :title="$t('functionNavigation')"
      width="560px"
      append-to-body
      custom-class="command-palette__dialog"
      @opened="focusInput"
      @closed="reset"
    >
      <el-input
        ref="commandInput"
        v-model="query"
        clearable
        prefix-icon="el-icon-search"
        :placeholder="$t('functionSearchPlaceholder')"
        @keydown.native.down.prevent="moveActive(1)"
        @keydown.native.up.prevent="moveActive(-1)"
        @keydown.native.enter.prevent="executeActive"
      />

      <div v-if="results.length" class="command-palette__results" role="listbox">
        <button
          v-for="(command, index) in results"
          :key="command.id"
          type="button"
          class="command-palette__result"
          :class="{ 'is-active': index === activeIndex }"
          @mouseenter="activeIndex = index"
          @click="execute(command)"
        >
          <i :class="command.icon" />
          <span class="command-palette__result-title">{{ command.title }}</span>
          <span class="command-palette__result-path">{{ command.path }}</span>
        </button>
      </div>
      <el-empty v-else :image-size="56" :description="$t('noMatchingFunction')" />
    </el-dialog>
  </div>
</template>

<script>
import {
  createNavigationCommands,
  filterNavigationCommands
} from '@/utils/navigationCommands'

export default {
  name: 'CommandPalette',
  data() {
    return {
      visible: false,
      query: '',
      activeIndex: 0
    }
  },
  computed: {
    currentSpace() {
      return this.$store.state.settings.currentSpace || {}
    },
    currentProject() {
      return this.$store.state.settings.currentProject || {}
    },
    commands() {
      const perms = this.$store.state.user.perms || {}
      return createNavigationCommands({
        spaceId: this.currentSpace.id,
        projectId: this.currentProject.id || this.$store.state.settings.projectId,
        isSuperAdmin: perms.isSuperAdmin,
        roleData: perms.roleData
      }).map(command => ({
        ...command,
        title: this.$t(command.titleKey)
      }))
    },
    results() {
      return filterNavigationCommands(this.commands, this.query)
    }
  },
  watch: {
    results() {
      this.activeIndex = 0
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleGlobalShortcut)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleGlobalShortcut)
  },
  methods: {
    open() {
      this.visible = true
    },
    focusInput() {
      this.$refs.commandInput && this.$refs.commandInput.focus()
    },
    reset() {
      this.query = ''
      this.activeIndex = 0
    },
    handleGlobalShortcut(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        this.open()
      }
    },
    moveActive(offset) {
      if (!this.results.length) {
        return
      }
      const nextIndex = this.activeIndex + offset
      this.activeIndex = (nextIndex + this.results.length) % this.results.length
    },
    executeActive() {
      const command = this.results[this.activeIndex]
      if (command) {
        this.execute(command)
      }
    },
    execute(command) {
      this.visible = false
      if (this.$route.fullPath !== command.path) {
        this.$router.push(command.path)
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.command-palette {
  &__trigger {
    display: flex;
    align-items: center;
    width: 100%;
    height: 34px;
    padding: 0 10px;
    color: $consoleTextSecondary;
    cursor: pointer;
    background: $consolePageBackground;
    border: 1px solid $consoleBorderColor;
    border-radius: 6px;

    &:hover,
    &:focus-visible {
      color: $consolePrimary;
      border-color: $consolePrimary;
      outline: none;
    }

    > span {
      flex: 1;
      margin-left: 8px;
      overflow: hidden;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    kbd {
      padding: 1px 5px;
      color: $consoleTextSecondary;
      font-family: inherit;
      font-size: 11px;
      background: $consoleSurface;
      border: 1px solid $consoleBorderColor;
      border-radius: 4px;
    }
  }

  &__dialog .el-dialog__body {
    padding-top: 8px;
  }

  &__results {
    max-height: 360px;
    margin-top: 12px;
    overflow-y: auto;
  }

  &__result {
    display: flex;
    align-items: center;
    width: 100%;
    height: 44px;
    padding: 0 12px;
    color: $consoleTextPrimary;
    cursor: pointer;
    background: transparent;
    border: 0;
    border-radius: 6px;

    > i {
      width: 24px;
      color: $consoleTextSecondary;
      font-size: 17px;
      text-align: left;
    }

    &:hover,
    &.is-active {
      color: $consolePrimary;
      background: $consolePrimaryLight;

      > i {
        color: $consolePrimary;
      }
    }
  }

  &__result-title {
    font-weight: 500;
  }

  &__result-path {
    flex: 1;
    margin-left: 16px;
    overflow: hidden;
    color: $consoleTextSecondary;
    font-size: 12px;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
