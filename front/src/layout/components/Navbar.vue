<template>
  <div class="navbar">
    <console-breadcrumb />
    <quick-navigation />
    <command-palette class="navbar-command-palette" />
    <div class="right-menu">
      <div v-if="isSuperAdmin()" class="right-menu-item topbar-secondary-action">
        <el-button type="primary" size="mini" @click="goRoute('/admin/users')">{{ $t('adminManage') }}</el-button>
      </div>
      <div class="right-menu-item topbar-secondary-action">
        <el-button type="success" size="mini" icon="el-icon-view" @click="goViewPage">{{ $t('previewModel') }}</el-button>
      </div>
      <div class="right-menu-item topbar-help-action">
        <el-tooltip placement="bottom" :content="$t('helpCenter')">
          <el-button type="text" class="el-icon-question navbar-btn" @click="openLink('/help')" />
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
import CommandPalette from './CommandPalette'
import ConsoleBreadcrumb from './ConsoleBreadcrumb'
import QuickNavigation from './QuickNavigation'

export default {
  components: {
    RightDropdown,
    UserMessage,
    CommandPalette,
    ConsoleBreadcrumb,
    QuickNavigation
  },
  created() {
    this.initPerm()
  },
  methods: {
    goViewPage() {
      this.goRoute('/view')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

}
</style>
