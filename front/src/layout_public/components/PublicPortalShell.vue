<template>
  <div
    class="public-portal-shell"
    :class="{
      'public-portal-shell--collapsed': !sidebarOpen,
      'public-portal-shell--mobile': mobile,
      'public-portal-shell--without-animation': withoutAnimation
    }"
  >
    <header class="public-portal-shell__header">
      <router-link :to="homePath" class="public-portal-shell__brand">
        <img :src="logo" class="public-portal-shell__logo" alt="" aria-hidden="true">
        <span class="public-portal-shell__brand-name">{{ brandName }}</span>
      </router-link>
      <div v-if="portalTitle" class="public-portal-shell__portal-title" :title="portalTitle">
        {{ portalTitle }}
      </div>
      <div class="public-portal-shell__header-content">
        <slot name="topbar" />
      </div>
    </header>

    <aside class="public-portal-shell__sidebar">
      <slot name="sidebar" />
    </aside>

    <div
      v-if="mobile && sidebarOpen"
      class="public-portal-shell__mask"
      @click="$emit('close-sidebar')"
    />

    <main class="public-portal-shell__main">
      <slot />
    </main>
  </div>
</template>

<script>
import defaultSettings from '@/settings'
import logo from '@/assets/images/document-collaboration-logo.svg'

export default {
  name: 'PublicPortalShell',
  props: {
    homePath: {
      type: String,
      required: true
    },
    portalTitle: {
      type: String,
      default: ''
    },
    sidebarOpen: {
      type: Boolean,
      default: true
    },
    mobile: {
      type: Boolean,
      default: false
    },
    withoutAnimation: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      brandName: defaultSettings.title,
      logo
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.public-portal-shell {
  min-height: 100vh;
  color: $portalTextPrimary;
  background: $portalPageBackground;

  &__header {
    position: fixed;
    z-index: 1200;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    height: $portalHeaderHeight;
    padding: 0 24px;
    background: rgba(255, 255, 255, 0.96);
    border-bottom: 1px solid $portalBorderColor;
    box-shadow: 0 1px 8px rgba(31, 42, 68, 0.05);
  }

  &__brand {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    min-width: 0;

    &:focus-visible {
      border-radius: 8px;
      outline: 2px solid $portalPrimary;
      outline-offset: 4px;
    }
  }

  &__logo {
    width: 36px;
    height: 36px;
  }

  &__brand-name {
    margin-left: 10px;
    color: $portalTextPrimary;
    font-size: 18px;
    font-weight: 650;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  &__portal-title {
    max-width: 360px;
    margin-left: 24px;
    padding-left: 24px;
    overflow: hidden;
    color: $portalTextSecondary;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-left: 1px solid $portalBorderColor;
  }

  &__header-content {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    min-width: 0;
    height: 100%;

    /deep/ .navbar {
      width: 100%;
      height: 100%;
      background: transparent;
      box-shadow: none;
    }

    /deep/ .hamburger-container,
    /deep/ .right-menu {
      height: 100%;
      line-height: $portalHeaderHeight;
    }
  }

  &__sidebar {
    position: fixed;
    z-index: 1100;
    top: $portalHeaderHeight;
    bottom: 0;
    left: 0;
    width: $portalSidebarWidth;
    overflow: hidden;
    background: $portalSurface;
    border-right: 1px solid $portalBorderColor;
    transition: transform 0.22s ease, width 0.22s ease;

    /deep/ > div,
    /deep/ .el-scrollbar {
      height: 100%;
    }

    /deep/ .scrollbar-wrapper {
      overflow-x: hidden !important;
    }

    /deep/ .el-scrollbar__bar.is-horizontal {
      display: none;
    }
  }

  &__main {
    min-height: 100vh;
    padding-top: $portalHeaderHeight;
    margin-left: $portalSidebarWidth;
    transition: margin-left 0.22s ease;
  }

  &__mask {
    position: fixed;
    z-index: 1050;
    top: $portalHeaderHeight;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(15, 23, 42, 0.46);
  }

  &--collapsed:not(.public-portal-shell--mobile) {
    .public-portal-shell__sidebar {
      width: 0;
      border-right: 0;
    }

    .public-portal-shell__main {
      margin-left: 0;
    }
  }

  &--mobile {
    .public-portal-shell__sidebar {
      width: $portalSidebarWidth;
      box-shadow: $portalShadow;
    }

    .public-portal-shell__main {
      margin-left: 0;
    }

    &.public-portal-shell--collapsed .public-portal-shell__sidebar {
      pointer-events: none;
      transform: translate3d(-$portalSidebarWidth, 0, 0);
    }
  }

  &--without-animation {
    .public-portal-shell__sidebar,
    .public-portal-shell__main {
      transition: none;
    }
  }
}

@media (max-width: 767px) {
  .public-portal-shell {
    &__header {
      padding: 0 16px;
    }

    &__brand-name {
      font-size: 16px;
    }

    &__portal-title {
      display: none;
    }
  }
}
</style>
