<template>
  <console-shell
    :sidebar-open="sidebar.opened"
    :mobile="device === 'mobile'"
    :without-animation="sidebar.withoutAnimation"
    @toggle-sidebar="toggleSideBar"
    @close-sidebar="handleClickOutside"
  >
    <template slot="brand">
      <logo :collapse="brandCollapsed" :no-style="true" />
    </template>
    <template slot="topbar">
      <navbar />
    </template>
    <template slot="sidebar">
      <home-menu :collapsed="menuCollapsed" />
    </template>
    <app-main />
  </console-shell>
</template>

<script>
import { Navbar, AppMain, ConsoleShell } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import HomeMenu from '@/components/HomeMenu'
import Logo from '@/components/Logo'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    ConsoleShell,
    HomeMenu,
    Logo
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    brandCollapsed() {
      return this.device === 'mobile' || !this.sidebar.opened
    },
    menuCollapsed() {
      return this.device !== 'mobile' && !this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

