<template>
  <nav class="console-navigation" :aria-label="label">
    <div v-if="!collapsed" class="console-navigation__label">{{ label }}</div>
    <el-menu
      class="console-navigation__menu"
      router
      :collapse="collapsed"
      :default-active="activePath"
      :default-openeds="defaultOpeneds"
    >
      <slot />
    </el-menu>
  </nav>
</template>

<script>
export default {
  name: 'ConsoleNavigation',
  props: {
    label: {
      type: String,
      required: true
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    activePath: {
      type: String,
      default: ''
    },
    defaultOpeneds: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.console-navigation {
  height: 100%;
  padding: 12px 8px;
  background: $consoleSurface;

  &__label {
    padding: 4px 12px 8px;
    color: $consoleTextSecondary;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
  }

  &__menu {
    border-right: 0;

    &:not(.el-menu--collapse) {
      width: 100%;
    }
  }

  ::v-deep .el-menu-item,
  ::v-deep .el-submenu__title {
    height: 40px;
    margin-bottom: 4px;
    padding: 0 12px !important;
    color: $consoleTextPrimary;
    line-height: 40px;
    border-radius: 6px;

    i {
      margin-right: 10px;
      color: $consoleTextSecondary;
      font-size: 18px;
    }

    &:hover {
      color: $consolePrimary;
      background: $consolePrimaryLight;

      i {
        color: $consolePrimary;
      }
    }
  }

  ::v-deep .el-menu-item.is-active {
    color: $consolePrimary;
    font-weight: 600;
    background: $consolePrimaryLight;

    &::before {
      position: absolute;
      top: 8px;
      bottom: 8px;
      left: 0;
      width: 3px;
      content: '';
      background: $consolePrimary;
      border-radius: 0 3px 3px 0;
    }

    i {
      color: $consolePrimary;
    }
  }

  ::v-deep .el-submenu .el-menu-item {
    min-width: 0;
    padding-left: 42px !important;
  }

  ::v-deep .el-menu--collapse {
    width: 48px;

    .el-menu-item i,
    .el-submenu__title i {
      margin-right: 0;
    }
  }
}
</style>
