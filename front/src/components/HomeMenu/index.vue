<template>
  <nav class="console-navigation" aria-label="主导航">
    <div v-if="!collapsed" class="console-navigation__label">工作台</div>
    <el-menu
      class="console-navigation__menu"
      router
      :collapse="collapsed"
      :default-active="currentActive"
    >
      <el-menu-item index="/dashboard">
        <i class="el-icon-house" />
        <span slot="title">{{ $t('spaceList') }}</span>
      </el-menu-item>
    </el-menu>
  </nav>
</template>
<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentActive() {
      return this.$route.path
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

  ::v-deep .el-menu-item {
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

    &.is-active {
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
  }

  ::v-deep .el-menu--collapse {
    width: 48px;

    .el-menu-item i {
      margin-right: 0;
    }
  }
}
</style>
