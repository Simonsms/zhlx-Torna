<template>
  <console-shell
    :sidebar-open="sidebar.opened"
    :mobile="device === 'mobile'"
    :without-animation="sidebar.withoutAnimation"
    @toggle-sidebar="toggleSideBar"
    @close-sidebar="closeSideBar"
  >
    <template slot="brand">
      <logo :collapse="brandCollapsed" :no-style="true" />
    </template>
    <template slot="topbar">
      <slot name="topbar" />
    </template>
    <template slot="sidebar">
      <slot name="sidebar" :collapsed="menuCollapsed" />
    </template>
    <slot />
  </console-shell>
</template>

<script>
import ConsoleShell from './ConsoleShell'
import Logo from '@/components/Logo'
import ResizeMixin from '../mixin/ResizeHandler'

export default {
  name: 'AuthenticatedLayout',
  components: {
    ConsoleShell,
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
    closeSideBar() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>
