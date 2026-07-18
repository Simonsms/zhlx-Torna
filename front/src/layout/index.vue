<template>
  <authenticated-layout>
    <template slot="topbar">
      <navbar />
    </template>
    <template slot="sidebar" slot-scope="{ collapsed }">
      <home-menu :collapsed="collapsed" />
    </template>
    <app-main />
  </authenticated-layout>
</template>

<script>
import { Navbar, AppMain, AuthenticatedLayout } from './components'
import HomeMenu from '@/components/HomeMenu'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    AuthenticatedLayout,
    HomeMenu
  }
}
</script>

