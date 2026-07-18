<template>
  <main class="public-portal-state" :aria-busy="type === 'loading'" aria-live="polite">
    <section class="public-portal-state__card">
      <div class="public-portal-state__icon" :class="`public-portal-state__icon--${type}`" aria-hidden="true">
        <i :class="iconClass" />
      </div>
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
      <el-button v-if="actionLabel" type="primary" plain @click="$emit('action')">
        {{ actionLabel }}
      </el-button>
    </section>
  </main>
</template>

<script>
const ICONS = Object.freeze({
  loading: 'el-icon-loading',
  disabled: 'el-icon-lock',
  error: 'el-icon-warning-outline',
  notFound: 'el-icon-document-delete'
})

export default {
  name: 'PublicPortalState',
  props: {
    type: {
      type: String,
      default: 'notFound',
      validator: value => Object.prototype.hasOwnProperty.call(ICONS, value)
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    actionLabel: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconClass() {
      return ICONS[this.type]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.public-portal-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px 20px;
  color: $portalTextPrimary;
  background: $portalPageBackground;

  &__card {
    max-width: 520px;
    text-align: center;

    h1 {
      margin: 22px 0 10px;
      font-size: 26px;
    }

    p {
      margin: 0 0 24px;
      color: $portalTextSecondary;
      line-height: 1.7;
    }
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 68px;
    height: 68px;
    color: $portalPrimary;
    font-size: 30px;
    background: $portalPrimaryLight;
    border-radius: 20px;

    &--error,
    &--disabled {
      color: #d97706;
      background: #fff7e6;
    }
  }
}
</style>
