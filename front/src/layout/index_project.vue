<template>
  <authenticated-layout>
    <template slot="topbar">
      <navbar />
    </template>
    <template slot="sidebar" slot-scope="{ collapsed }">
      <project-menu :collapsed="collapsed" />
    </template>
    <app-main />
  </authenticated-layout>
</template>

<script>
import { Navbar, AppMain, AuthenticatedLayout } from './components'
import ProjectMenu from '@/components/ProjectMenu'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    AuthenticatedLayout,
    ProjectMenu
  },
  computed: {
    currentProjectId() {
      return this.$route.params.projectId || this.$store.state.settings.projectId
    }
  },
  mounted() {
    const projectId = this.currentProjectId
    this.initCurrentInfo(projectId)
  },
  methods: {
    initCurrentInfo(projectId) {
      let fromData = this.getFrom()
      if (!fromData) {
        if (projectId) {
          this.get('/project/space', { projectId: projectId }, resp => {
            fromData = resp.data
            this.setTitle(fromData.projectName)
            this.setCurrentInfo({
              id: fromData.spaceId,
              name: fromData.spaceName
            }, {
              id: fromData.projectId,
              name: fromData.projectName
            })
          })
        }
      } else {
        this.setTitle(fromData.projectName)
        this.setCurrentInfo({
          id: fromData.spaceId,
          name: fromData.spaceName
        }, {
          id: fromData.projectId,
          name: fromData.projectName
        })
      }
    }
  }
}
</script>
