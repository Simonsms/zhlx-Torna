<template>
  <authenticated-layout>
    <template slot="topbar">
      <navbar />
    </template>
    <template slot="sidebar" slot-scope="{ collapsed }">
      <space-menu ref="spaceMenu" :collapsed="collapsed" />
    </template>
    <app-main />
  </authenticated-layout>
</template>

<script>
import { Navbar, AppMain, AuthenticatedLayout } from './components'
import SpaceMenu from '@/components/SpaceMenu'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    AuthenticatedLayout,
    SpaceMenu
  },
  data() {
    return {
      space: ''
    }
  },
  created() {
    const spaceId = this.$route.params.spaceId
    this.loadData(spaceId)
  },
  methods: {
    loadData(spaceId) {
      if (!this.space) {
        this.get('/space/info', { spaceId: spaceId }, resp => {
          this.space = resp.data
          this.$refs.spaceMenu.setSpaceData(this.space)
          this.setCurrentInfo(this.space, '')
        })
      }
    }
  }
}
</script>
