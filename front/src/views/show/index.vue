<template>
  <public-document-reader
    v-show="hasData"
    :sections="outlineSections"
    :dynamic-outline="extViewShow"
    dynamic-outline-selector=".public-document-reader-dynamic-content"
    :content-key="outlineContentKey"
  >
    <div class="doc-view-container">
      <el-tabs active-name="info" @tab-click="onTabSelect">
        <el-tab-pane name="info">
          <span slot="label"><i class="el-icon-document" /> {{ $t('apiInfo') }}</span>
          <doc-view ref="docView" :show-opt-bar="false" :init-subscribe="false" :item="item" portal-mode />
        </el-tab-pane>
        <el-tab-pane v-if="setting.showDebug" name="debug">
          <span slot="label"><i class="el-icon-s-promotion" /> {{ $t('debugApi') }}</span>
          <doc-debug :item="debugItem" :internal="false" />
        </el-tab-pane>
        <el-tab-pane v-for="page in extPageData" :key="page.id" :label="page.title" :label-content="() => page" />
      </el-tabs>
      <div v-show="extViewShow" class="public-document-reader-dynamic-content">
        <mavon-editor
          v-model="extViewContent"
          :box-shadow="false"
          :subfield="false"
          default-open="preview"
          :editable="false"
          :toolbars-flag="false"
        />
      </div>
    </div>
  </public-document-reader>
</template>
<script>
import DocView from '@/components/DocView'
import DocDebug from '@/components/DocDebug'
import { mavonEditor } from 'mavon-editor'
import { PublicDocumentReader } from '@/layout_public/components'
import { buildHttpOutline } from '@/utils/documentOutline'

export default {
  components: { DocView, DocDebug, mavonEditor, PublicDocumentReader },
  data() {
    return {
      item: {},
      debugItem: {},
      hasData: false,
      setting: {
        gatewayUrl: '',
        showDebug: 0,
        globalParams: [],
        globalReturns: []
      },
      extPageData: [],
      extViewContent: '',
      extViewShow: false
    }
  },
  computed: {
    outlineSections() {
      return this.extViewShow ? [] : buildHttpOutline(this.item, this.$t)
    },
    outlineContentKey() {
      return this.extViewShow ? this.extViewContent : (this.item.id || '')
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const docId = this.$route.params.docId
      const projectId = this.$route.params.showId
      if (docId) {
        const data = await this.getDocViewData(docId)
        this.setting = await this.getSetting(projectId)
        this.formatGlobal(this.setting.globalParams)
        this.formatGlobal(this.setting.globalReturns)
        if (this.setting.globalParams.length > 0) {
          data.globalParams = this.setting.globalParams
        }
        if (this.setting.globalReturns.length > 0) {
          data.globalReturns = this.setting.globalReturns
        }
        if (this.setting.gatewayUrl) {
          data.url = this.setting.gatewayUrl
        }
        this.initExtPage(projectId)
        this.initDocInfoView(data)
        this.item = data
        this.setTitle(data.name)
        this.hasData = true
      }
    },
    initExtPage(projectId) {
      this.get('/compose/additional/listvisible', { projectId: projectId }, resp => {
        this.extPageData = resp.data
      })
    },
    async getSetting(projectId) {
      return new Promise(ok => {
        this.get('/compose/project/setting/getall', { id: projectId }, resp => {
          ok(resp.data)
        })
      })
    },
    async getDocViewData(docId) {
      return new Promise(ok => {
        this.get('/doc/viewShow', { id: docId }, function(resp) {
          ok(resp.data)
        })
      })
    },
    formatGlobal(globalParams) {
      globalParams.forEach(row => {
        row.id = this.nextId() + ''
      })
    },
    onTabSelect(tab) {
      const fun = tab.labelContent
      this.extViewShow = fun !== undefined
      if (tab.labelContent) {
        this.extViewShow = true
        const page = fun()
        this.get('/compose/additional/get', { id: page.id }, resp => {
          const data = resp.data
          this.$nextTick(() => {
            this.extViewContent = data.content
          })
        })
      } else {
        this.selectTab(tab.name)
      }
    },
    selectTab(name) {
      this[`${name}Item`] = this.item
    }
  }
}
</script>
