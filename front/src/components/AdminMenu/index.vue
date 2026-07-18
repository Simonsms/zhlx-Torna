<template>
  <console-navigation :label="$t('adminManage')" :collapsed="collapsed" :active-path="currentActive">
    <el-menu-item index="/admin/users">
      <i class="el-icon-user" />
      <span slot="title">{{ $t('userManagement') }}</span>
    </el-menu-item>
    <el-menu-item index="/admin/template">
      <i class="el-icon-tickets" />
      <span slot="title">{{ $t('templateSetting') }}</span>
    </el-menu-item>
    <el-menu-item index="/admin/setting">
      <i class="el-icon-setting" />
      <span slot="title">{{ $t('systemSetting') }}</span>
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
    }
  }
}
</script>
