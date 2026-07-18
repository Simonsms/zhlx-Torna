<template>
  <authenticated-layout>
    <template slot="topbar">
      <navbar />
    </template>
    <template slot="sidebar" slot-scope="{ collapsed }">
      <user-center-menu :collapsed="collapsed" />
    </template>
    <app-main />
  </authenticated-layout>
</template>

<script>
import { Navbar, AppMain, UserCenterMenu, AuthenticatedLayout } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    UserCenterMenu,
    AuthenticatedLayout
  }
}
</script>
