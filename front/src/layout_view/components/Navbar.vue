<template>
  <div class="navbar">
    <hamburger :is-active="sidebarView.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <div class="right-menu">
      <div class="right-menu-item">
        <el-button class="view-favorite-button" type="text" icon="el-icon-star-off" @click="goFavorites">
          {{ $t('myFavorites') }}
        </el-button>
      </div>
      <div class="right-menu-item">
        <el-button type="primary" size="mini" icon="el-icon-monitor" @click="goAdminPage">{{ $t('managementModel') }}</el-button>
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
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import RightDropdown from '@/components/RightDropdown'
import UserMessage from '@/components/UserMessage'

export default {
  components: {
    Hamburger, RightDropdown, UserMessage
  },
  computed: {
    ...mapGetters([
      'sidebarView',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBarView')
    },
    goFavorites() {
      this.goRoute('/user/subscribe/doc')
    },
    goAdminPage() {
      const docId = this.$route.params.docId
      if (docId) {
        this.get('/module/infoByDocId', { docId: docId }, resp => {
          const module = resp.data
          const projectId = module.projectId
          this.setProjectConfig(projectId, { moduleId: module.id })
          this.goProjectHome(projectId)
        })
      } else {
        const projectId = this.getProjectId()
        const uri = projectId ? this.getProjectHomeUrl(projectId) : '/'
        this.goRoute(uri)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.view-favorite-button {
  padding: 8px 12px;
  color: $consoleTextSecondary;
  font-weight: 500;
  border-radius: 8px;

  &:hover,
  &:focus {
    color: $consolePrimary;
    background: $consolePrimaryLight;
  }
}
</style>
