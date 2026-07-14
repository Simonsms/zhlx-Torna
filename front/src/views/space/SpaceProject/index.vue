<template>
  <div class="app-container project-list-page">
    <header class="project-list-page__header">
      <div>
        <h2>{{ $t('projectList') }}</h2>
        <p>{{ $t('projectListDescription') }}</p>
      </div>
      <div class="project-list-page__actions">
        <el-radio-group v-model="showType" size="mini" @change="onChangeShowType">
          <el-radio-button label="card">{{ $t('card') }}</el-radio-button>
          <el-radio-button label="grid">{{ $t('grid') }}</el-radio-button>
        </el-radio-group>
        <el-button v-if="hasRole(`space:${spaceId}`, [Role.dev, Role.admin])" type="primary" icon="el-icon-plus" @click="onProjectAdd">
          {{ $t('createProject') }}
        </el-button>
      </div>
    </header>

    <div v-if="data.length === 0" class="project-list-page__empty">
      <span class="project-list-page__empty-icon"><i class="el-icon-folder-opened" /></span>
      <h3>{{ $t('noProject') }}</h3>
      <p>{{ $t('projectListEmptyDescription') }}</p>
    </div>

    <template v-else>
      <div class="project-list-page__summary">
        {{ data.length }} {{ $t('projectItems') }}
      </div>

      <div v-if="showType === 'card'" class="project-card-grid">
        <article
          v-for="project in data"
          :key="project.id"
          class="project-card"
          role="button"
          tabindex="0"
          @click="enterProject(project)"
          @keyup.enter="enterProject(project)"
          @keyup.space="enterProject(project)"
        >
          <div class="project-card__header">
            <span class="project-card__icon"><i class="el-icon-folder-opened" /></span>
            <div class="project-card__title">
              <h3 :title="project.name">{{ project.name }}</h3>
              <span v-if="project.isPrivate" class="project-card__privacy">
                <i class="el-icon-lock" /> {{ $t('privateProject') }}
              </span>
            </div>
            <i class="el-icon-right project-card__arrow" />
          </div>

          <div class="project-card__description">
            <span>{{ $t('projectDesc') }}</span>
            <p :title="project.description">{{ project.description || '—' }}</p>
          </div>

          <footer class="project-card__meta">
            <div>
              <span>{{ $t('creator') }}</span>
              <strong>{{ project.creatorName || '—' }}</strong>
            </div>
            <div>
              <span>{{ $t('createTime') }}</span>
              <strong>{{ project.gmtCreate || '—' }}</strong>
            </div>
          </footer>
        </article>
      </div>

      <div v-else class="project-list-table">
        <el-table
          :data="data"
          border
          highlight-current-row
        >
          <el-table-column :label="$t('projectName')" prop="value">
            <template slot-scope="scope">
              <span>
                <el-link type="primary" style="font-size: 14px" @click="enterProject(scope.row)">{{ scope.row.name }}</el-link>
                <el-tooltip placement="right" :content="$t('privateProject')">
                  <i v-if="scope.row.isPrivate" class="el-icon-lock" />
                </el-tooltip>
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('projectDesc')" prop="description" />
          <el-table-column :label="$t('creator')" prop="creatorName" />
          <el-table-column :label="$t('createTime')" prop="gmtCreate" />
        </el-table>
      </div>
    </template>
    <project-create-dialog ref="projectCreateDlg" :success="onProjectAddSuccess" />
  </div>
</template>
<script>
import ProjectCreateDialog from '@/components/ProjectCreateDialog'
const SHOW_TYPE_KEY = 'torna.project-show-type'
export default {
  name: 'SpaceProject',
  components: { ProjectCreateDialog },
  props: {
    spaceId: {
      type: String,
      default: ''
    },
    space: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      data: [],
      showType: 'card',
      search: ''
    }
  },
  watch: {
    spaceId(val) {
      this.loadData(val)
    },
    space(obj) {
      this.loadData(obj.id)
    }
  },
  created() {
    this.showType = this.getAttr(SHOW_TYPE_KEY) || 'card'
  },
  methods: {
    loadData(spaceId) {
      if (spaceId) {
        this.get('/space/project/list', { spaceId: spaceId }, resp => {
          this.data = resp.data
        })
      }
    },
    enterProject(item) {
      const space = this.getSpace()
      const from = {
        spaceId: space.id,
        spaceName: space.name,
        projectId: item.id,
        projectName: item.name
      }
      this.setFrom(from)
      this.goProjectHome(item.id)
    },
    onProjectAdd() {
      this.$refs.projectCreateDlg.show(this.spaceId)
    },
    onProjectAddSuccess() {
      this.loadData(this.spaceId)
    },
    onChangeShowType(val) {
      this.setAttr(SHOW_TYPE_KEY, val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.project-list-page {
  min-height: calc(100vh - 160px);
  padding: 30px 28px 48px;

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: 24px;
    border-bottom: 1px solid $consoleBorderColor;

    h2 {
      margin: 0 0 8px;
      color: $consoleTextPrimary;
      font-size: 24px;
      line-height: 1.3;
    }

    p {
      margin: 0;
      color: $consoleTextSecondary;
      font-size: 14px;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__summary {
    margin: 22px 0 14px;
    color: $consoleTextSecondary;
    font-size: 13px;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 360px;
    color: $consoleTextSecondary;
    text-align: center;

    h3 {
      margin: 18px 0 8px;
      color: $consoleTextPrimary;
      font-size: 18px;
    }

    p {
      margin: 0;
      font-size: 14px;
    }
  }

  &__empty-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    color: $consolePrimary;
    font-size: 28px;
    background: $consolePrimaryLight;
    border-radius: 18px;
  }
}

.project-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 380px));
  gap: 20px;
  align-items: stretch;
}

.project-card {
  display: flex;
  flex-direction: column;
  min-height: 248px;
  padding: 22px;
  overflow: hidden;
  background: $consoleSurface;
  border: 1px solid $consoleBorderColor;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  cursor: pointer;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;

  &:hover {
    border-color: #b8d2ff;
    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.1);
    transform: translateY(-2px);
  }

  &:focus-visible {
    border-color: $consolePrimary;
    outline: 2px solid rgba(37, 99, 235, 0.24);
    outline-offset: 2px;
  }

  &__header {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  &__icon {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    color: $consolePrimary;
    font-size: 20px;
    background: $consolePrimaryLight;
    border-radius: 10px;
  }

  &__title {
    flex: 1;
    min-width: 0;
    margin-left: 13px;

    h3 {
      margin: 0;
      overflow: hidden;
      color: $consoleTextPrimary;
      font-size: 16px;
      font-weight: 600;
      line-height: 1.45;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &__privacy {
    display: inline-block;
    margin-top: 3px;
    color: $consoleTextSecondary;
    font-size: 11px;
  }

  &__arrow {
    flex: 0 0 auto;
    margin-left: 12px;
    color: #a6adbb;
    transition: color 0.18s ease, transform 0.18s ease;
  }

  &:hover &__arrow {
    color: $consolePrimary;
    transform: translateX(3px);
  }

  &__description {
    flex: 1;
    padding: 18px 0;
    margin-top: 18px;
    border-top: 1px solid #edf0f5;

    > span,
    p {
      font-size: 13px;
    }

    > span {
      color: $consoleTextSecondary;
    }

    p {
      display: -webkit-box;
      min-height: 60px;
      margin: 7px 0 0;
      overflow: hidden;
      color: #344054;
      line-height: 1.6;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  }

  &__meta {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 20px;

    div {
      min-width: 0;
    }

    span,
    strong {
      display: block;
      font-size: 12px;
      line-height: 1.5;
    }

    span {
      color: $consoleTextSecondary;
    }

    strong {
      margin-top: 3px;
      overflow: hidden;
      color: $consoleTextPrimary;
      font-weight: 500;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.project-list-table {
  overflow: hidden;
  background: $consoleSurface;
  border: 1px solid $consoleBorderColor;
  border-radius: 10px;

  /deep/ .el-table::before {
    display: none;
  }
}

@media (max-width: 767px) {
  .project-list-page {
    padding: 20px 16px 36px;

    &__header {
      display: block;
    }

    &__actions {
      align-items: stretch;
      justify-content: space-between;
      margin-top: 20px;
    }
  }

  .project-card-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .project-card {
    min-height: 0;
  }
}
</style>
