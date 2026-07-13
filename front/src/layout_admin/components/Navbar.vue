<template>
  <div class="navbar">
    <console-breadcrumb />
    <quick-navigation />
    <command-palette class="navbar-command-palette" />
    <div class="right-menu">
      <div class="right-menu-item topbar-secondary-action">
        <el-button type="primary" size="mini" @click="goRoute('/')">{{ $t('docManagement') }}</el-button>
      </div>
      <div class="right-menu-item topbar-help-action">
        <el-tooltip placement="bottom" :content="$t('helpCenter')">
          <el-button type="text" class="el-icon-question navbar-btn" style="color: #5a5e66" @click="openLink('/help')" />
        </el-tooltip>
      </div>
      <div class="right-menu-item">
        <user-message />
      </div>
      <div class="right-menu-item">
        <right-dropdown />
      </div>
    </div>
  </div>
</template>

<script>
import RightDropdown from '@/components/RightDropdown'
import UserMessage from '@/components/UserMessage'
import CommandPalette from '@/layout/components/CommandPalette'
import ConsoleBreadcrumb from '@/layout/components/ConsoleBreadcrumb'
import QuickNavigation from '@/layout/components/QuickNavigation'

export default {
  components: {
    RightDropdown,
    UserMessage,
    CommandPalette,
    ConsoleBreadcrumb,
    QuickNavigation
  }
}
</script>
