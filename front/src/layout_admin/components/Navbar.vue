<template>
  <div class="navbar">
    <command-palette class="navbar-command-palette" />
    <div class="right-menu">
      <div class="right-menu-item">
        <el-button type="primary" size="mini" @click="goRoute('/')">{{ $t('docManagement') }}</el-button>
      </div>
      <div class="right-menu-item">
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

export default {
  components: {
    RightDropdown,
    UserMessage,
    CommandPalette
  }
}
</script>
