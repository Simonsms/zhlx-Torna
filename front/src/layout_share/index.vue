<template>
  <div class="public-portal-layout">
    <public-portal-state
      v-if="portalState"
      :type="portalState.type"
      :title="portalState.title"
      :description="portalState.description"
      :action-label="portalState.actionLabel"
      @action="initShare"
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
        :description="shareConfig.remark"
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
  name: 'LayoutShare',
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
      shareConfig: {
        id: '',
        type: 0,
        shareName: '',
        remark: ''
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
      const shareId = this.$route.params.shareId
      return shareId ? `/share/${shareId}` : '/share'
    },
    portalTitle() {
      return this.shareConfig.shareName || this.$t('document')
    },
    isPortalHome() {
      return !this.$route.params.docId
    },
    canVisit() {
      const config = this.shareConfig
      return config.type === this.getEnums().SHARE_TYPE.PUBLIC || this.rightEncrypt
    },
    rightEncrypt() {
      return this.getAttr(this.getStoreKey(this.shareConfig)) === 'true'
    },
    showPassword() {
      return this.shareConfig.type === this.getEnums().SHARE_TYPE.ENCRYPT && !this.rightEncrypt
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
      return null
    }
  },
  created() {
    this.initShare()
  },
  methods: {
    initShare() {
      this.loading = true
      this.loadFailed = false
      const shareId = this.$route.params.shareId
      if (!shareId) {
        this.loading = false
        return
      }
      this.get('/share/get', { id: shareId }, resp => {
        this.shareConfig = resp.data
        this.loading = false
      }, () => {
        this.loading = false
        this.loadFailed = true
      })
    },
    getStoreKey(shareConfig) {
      return `torna.share.${shareConfig.id}`
    },
    onCheckPassword(password) {
      this.checkingPassword = true
      this.post('/share/checkPassword', {
        id: this.shareConfig.id,
        password: md5(password.trim())
      }, () => {
        this.setAttr(this.getStoreKey(this.shareConfig), 'true')
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
