<template>
  <authenticated-layout>
    <template slot="topbar">
      <navbar />
    </template>
    <template slot="sidebar" slot-scope="{ collapsed }">
      <admin-menu :collapsed="collapsed" />
    </template>
    <app-main />
  </authenticated-layout>
</template>

<script>
import { Navbar, AppMain } from './components'
import AuthenticatedLayout from '@/layout/components/AuthenticatedLayout'
import AdminMenu from '@/components/AdminMenu'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    AuthenticatedLayout,
    AdminMenu
  }
}
</script>
