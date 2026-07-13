<template>
  <console-navigation :label="$t('spaceInfo')" :collapsed="collapsed" :active-path="currentActive">
    <el-menu-item :index="projectIndex">
      <i class="el-icon-s-grid" />
      <span slot="title">{{ $t('projectList') }}</span>
    </el-menu-item>
    <el-menu-item :index="`/space/info/${spaceId}`">
      <i class="el-icon-info" />
      <span slot="title">{{ $t('spaceInfo') }}</span>
    </el-menu-item>
    <el-menu-item :index="`/space/member/${spaceId}`">
      <i class="el-icon-user" />
      <span slot="title">{{ $t('spaceMember') }}</span>
    </el-menu-item>
    <el-menu-item v-show="enableMeterSphere" v-if="hasRole(`space:${spaceId}`, [Role.admin])" :index="`/space/setting/${spaceId}`">
      <i class="el-icon-setting" />
      <span slot="title">{{ $t('spaceSetting') }}</span>
    </el-menu-item>
  </console-navigation>
</template>
<script>
import ConsoleNavigation from '@/layout/components/ConsoleNavigation'

export default {
  components: { ConsoleNavigation },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      spaceData: {
        id: '',
        isCompose: 0
      },
      enableMeterSphere: false
    }
  },
  computed: {
    projectIndex() {
      if (this.spaceData.isCompose) {
        return `/space/compose/${this.spaceId}`
      } else {
        return `/space/project/${this.spaceId}`
      }
    },
    spaceId() {
      return this.spaceData.id || this.$route.params.spaceId
    },
    currentActive() {
      return this.$route.path
    }
  },
  mounted() {
    this.pmsConfig().then(config => {
      this.enableMeterSphere = config.enableMeterSphere
    })
  },
  methods: {
    setSpaceData(data) {
      this.spaceData = data
    }
  }
}
</script>
