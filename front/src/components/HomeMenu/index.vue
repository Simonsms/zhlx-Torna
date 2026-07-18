<template>
  <console-navigation :label="$t('spaceList')" :collapsed="collapsed" :active-path="currentActive">
    <el-menu-item index="/dashboard">
      <i class="el-icon-house" />
      <span slot="title">{{ $t('spaceList') }}</span>
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
