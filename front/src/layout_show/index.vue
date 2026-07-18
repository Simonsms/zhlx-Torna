<template>
  <div class="public-portal-layout">
    <public-portal-state
      v-if="portalState"
      :type="portalState.type"
      :title="portalState.title"
      :description="portalState.description"
      :action-label="portalState.actionLabel"
      @action="initComposeProject"
    />
    <public-portal-shell
      v-else-if="canVisit"
      :home-path="homePath"
      :portal-title="portalTitle"
      :sidebar-open="sidebarView.opened"
      :mobile="device === 'mobile'"
      :without-animation="sidebarView.withoutAnimation"
      @close-sidebar="handleClickOutside"
    >
      <navbar slot="topbar" />
      <sidebar slot="sidebar" @menu-loaded="onMenuLoaded" />
      <public-portal-home
        v-if="isPortalHome"
        :title="portalTitle"
        :description="composeProject.description"
        :nodes="portalNodes"
        @navigate="navigatePortal"
      />
      <keep-alive v-else>
        <router-view :key="$route.fullPath" />
      </keep-alive>
    </public-portal-shell>
    <public-portal-access
      v-else-if="showPassword"
      :title="portalTitle"
      :loading="checkingPassword"
      @submit="onCheckPassword"
    />
    <public-portal-state
      v-else
      type="notFound"
      :title="$t('portalNotFoundTitle')"
      :description="$t('portalNotFoundDescription')"
    />
  </div>
</template>

<script>
import { Navbar, Sidebar } from './components'
import {
  PublicPortalAccess,
  PublicPortalHome,
  PublicPortalShell,
  PublicPortalState
} from '@/layout_public/components'
import ResizeMixin from './mixin/ResizeHandler'
import md5 from 'js-md5'

export default {
  name: 'LayoutComposeProject',
  components: {
    Navbar,
    Sidebar,
    PublicPortalAccess,
    PublicPortalHome,
    PublicPortalShell,
    PublicPortalState
  },
  mixins: [ResizeMixin],
  data() {
    return {
      composeProject: {
        id: '',
        isEncrypt: 0,
        name: '',
        description: ''
      },
      portalNodes: [],
      loading: true,
      loadFailed: false,
      checkingPassword: false
    }
  },
  computed: {
    sidebarView() {
      return this.$store.state.app.sidebarView
    },
    device() {
      return this.$store.state.app.device
    },
    homePath() {
      const showId = this.$route.params.showId
      return showId ? `/show/${showId}` : '/show'
    },
    portalTitle() {
      return this.composeProject.name || this.$t('document')
    },
    isPortalHome() {
      return !this.$route.params.docId
    },
    canVisit() {
      const config = this.composeProject
      return (config.type === this.getEnums().COMPOSE_PROJECT_TYPE.PUBLIC || this.rightEncrypt) && config.status === this.getEnums().STATUS.ENABLE
    },
    rightEncrypt() {
      return this.getAttr(this.getStoreKey(this.composeProject)) === 'true'
    },
    showPassword() {
      const config = this.composeProject
      return (config.type === this.getEnums().COMPOSE_PROJECT_TYPE.ENCRYPT && !this.rightEncrypt) && config.status === this.getEnums().STATUS.ENABLE
    },
    portalState() {
      if (this.loading) {
        return {
          type: 'loading',
          title: this.$t('portalLoadingTitle'),
          description: this.$t('portalLoadingDescription'),
          actionLabel: ''
        }
      }
      if (this.loadFailed) {
        return {
          type: 'error',
          title: this.$t('portalErrorTitle'),
          description: this.$t('portalErrorDescription'),
          actionLabel: this.$t('portalRetry')
        }
      }
      if (this.composeProject.status === this.getEnums().STATUS.DISABLE) {
        return {
          type: 'disabled',
          title: this.$t('portalDisabledTitle'),
          description: this.$t('portalDisabledDescription'),
          actionLabel: ''
        }
      }
      return null
    }
  },
  created() {
    this.initComposeProject()
  },
  methods: {
    initComposeProject() {
      this.loading = true
      this.loadFailed = false
      const showId = this.$route.params.showId
      if (!showId) {
        this.loading = false
        return
      }
      this.get('/compose/project/get', { id: showId }, resp => {
        this.composeProject = resp.data
        this.loading = false
      }, () => {
        this.loading = false
        this.loadFailed = true
      })
    },
    getStoreKey(composeProject) {
      return `torna.show.${composeProject.id}`
    },
    onCheckPassword(password) {
      this.checkingPassword = true
      this.post('/compose/project/checkPassword', {
        id: this.composeProject.id,
        password: md5(password.trim())
      }, () => {
        this.setAttr(this.getStoreKey(this.composeProject), 'true')
        location.reload()
      }, () => {
        this.checkingPassword = false
      })
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBarView', { withoutAnimation: false })
    },
    onMenuLoaded(nodes) {
      this.portalNodes = nodes
    },
    navigatePortal(path) {
      this.goRoute(path)
    }
  }
}
</script>
