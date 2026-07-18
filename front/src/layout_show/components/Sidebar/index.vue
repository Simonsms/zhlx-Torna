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
import { normalizeShowMenu } from '@/utils/publicPortal'

export default {
  components: { PublicPortalNavigation },
  data() {
    return {
      portalNodes: []
    }
  },
  computed: {
    homePath() {
      return `/show/${this.$route.params.showId}`
    }
  },
  mounted() {
    this.loadMenu()
  },
  methods: {
    loadMenu() {
      const id = this.$route.params.showId
      this.get('/compose/doc/menu', { projectId: id }, resp => {
        const treeData = this.convertTree(resp.data)
        this.portalNodes = normalizeShowMenu(treeData, id)
        this.$emit('menu-loaded', this.portalNodes)
      })
    },
    navigatePortal(path) {
      this.goRoute(path)
    }
  }
}
</script>
