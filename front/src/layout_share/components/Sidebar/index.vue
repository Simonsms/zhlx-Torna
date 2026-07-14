<template>
  <public-portal-navigation
    :nodes="portalNodes"
    :home-path="homePath"
    :active-doc-id="$route.params.docId || ''"
    @navigate="navigatePortal"
  />
</template>

<script>
import { PublicPortalNavigation } from '@/layout_public/components'
import { normalizeShareMenu } from '@/utils/publicPortal'

export default {
  components: { PublicPortalNavigation },
  data() {
    return {
      portalNodes: []
    }
  },
  computed: {
    homePath() {
      return `/share/${this.$route.params.shareId}`
    }
  },
  mounted() {
    this.loadMenu()
  },
  methods: {
    loadMenu() {
      const id = this.$route.params.shareId
      this.get('/share/menu', { id: id }, resp => {
        this.portalNodes = normalizeShareMenu(resp.data, id)
        this.$emit('menu-loaded', this.portalNodes)
      })
    },
    navigatePortal(path) {
      this.goRoute(path)
    }
  }
}
</script>
