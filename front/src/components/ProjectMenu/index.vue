<template>
  <console-navigation :label="$t('projectInfo')" :collapsed="collapsed" :active-path="currentActive">
    <el-menu-item :index="getProjectHomeUrl(projectId)">
      <i class="el-icon-box" />
      <span slot="title">{{ $t('applicationManagement') }}</span>
    </el-menu-item>
    <el-menu-item :index="`/project/info/${projectId}`">
      <i class="el-icon-info" />
      <span slot="title">{{ $t('projectInfo') }}</span>
    </el-menu-item>
    <el-menu-item :index="`/project/member/${projectId}`">
      <i class="el-icon-user" />
      <span slot="title">{{ $t('projectMember') }}</span>
    </el-menu-item>
    <el-menu-item v-if="hasRole(`project:${projectId}`, [Role.admin, Role.dev])" :index="`/project/code/${projectId}`">
      <i class="el-icon-collection" />
      <span slot="title">{{ $t('constManager') }}</span>
    </el-menu-item>
    <el-menu-item :index="`/project/release/${projectId}`">
      <i class="el-icon-s-release" />
      <span slot="title">{{ $t('releaseManager') }}</span>
    </el-menu-item>
  </console-navigation>
</template>
<script>
import ConsoleNavigation from '@/layout/components/ConsoleNavigation'

export default {
  components: { ConsoleNavigation },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentActive() {
      return this.$route.path
    },
    projectId() {
      return this.$store.state.settings.projectId
    }
  },
  created() {
    const projectId = this.$route.params.projectId
    if (projectId) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'projectId',
        value: projectId
      })
    }
  }
}
</script>
