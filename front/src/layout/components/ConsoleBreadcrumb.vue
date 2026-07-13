<template>
  <el-breadcrumb class="console-breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="item in items" :key="item.id">
      <router-link v-if="item.path" :to="item.path">{{ item.label }}</router-link>
      <span v-else class="console-breadcrumb__current">{{ item.label }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { createContextBreadcrumb } from '@/utils/contextNavigation'

export default {
  name: 'ConsoleBreadcrumb',
  computed: {
    currentSpace() {
      return this.$store.state.settings.currentSpace || {}
    },
    currentProject() {
      return this.$store.state.settings.currentProject || {}
    },
    items() {
      return createContextBreadcrumb({
        route: this.$route,
        currentSpace: this.currentSpace,
        currentProject: this.currentProject,
        translate: key => this.$t(key)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.console-breadcrumb.el-breadcrumb {
  float: left;
  max-width: 430px;
  margin-left: 16px;
  overflow: hidden;
  font-size: 13px;
  line-height: $consoleHeaderHeight;
  text-overflow: ellipsis;
  white-space: nowrap;

  ::v-deep .el-breadcrumb__inner a {
    color: $consoleTextSecondary;
    font-weight: 400;

    &:hover,
    &:focus-visible {
      color: $consolePrimary;
      outline: 2px solid rgba($consolePrimary, 0.22);
      outline-offset: 2px;
    }
  }
}

.console-breadcrumb__current {
  color: $consoleTextPrimary;
  font-weight: 500;
}
</style>
