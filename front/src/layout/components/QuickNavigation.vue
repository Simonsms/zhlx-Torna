<template>
  <el-dropdown class="quick-navigation" trigger="click" @command="navigate">
    <el-button type="text" class="quick-navigation__trigger" :aria-label="$t('quickNavigation')">
      <i class="el-icon-menu" />
      {{ $t('quickNavigation') }}
      <i class="el-icon-arrow-down el-icon--right" />
    </el-button>
    <el-dropdown-menu slot="dropdown" class="quick-navigation__menu">
      <el-dropdown-item
        v-for="command in commands"
        :key="command.id"
        :command="command.path"
        :disabled="$route.path === command.path"
      >
        <i :class="command.icon" />
        {{ command.title }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { createNavigationCommands } from '@/utils/navigationCommands'

export default {
  name: 'QuickNavigation',
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
    }
  },
  methods: {
    navigate(path) {
      if (this.$route.path !== path) {
        this.$router.push(path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.quick-navigation {
  float: left;
  height: $consoleHeaderHeight;
  margin-left: 12px;
}

.quick-navigation__trigger {
  height: $consoleHeaderHeight;
  padding: 0 4px;
  color: $consoleTextSecondary;

  &:hover,
  &:focus {
    color: $consolePrimary;
  }
}

.quick-navigation__menu {
  min-width: 180px;
}
</style>
