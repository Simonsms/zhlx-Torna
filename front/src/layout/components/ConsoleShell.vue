<template>
  <div
    class="console-shell"
    :class="{
      'console-shell--collapsed': !sidebarOpen,
      'console-shell--mobile': mobile,
      'console-shell--without-animation': withoutAnimation
    }"
  >
    <header class="console-shell__topbar">
      <div class="console-shell__brand">
        <slot name="brand" />
      </div>
      <div class="console-shell__topbar-content">
        <button
          type="button"
          class="console-shell__sidebar-toggle"
          :aria-label="sidebarToggleLabel"
          :title="sidebarToggleLabel"
          @click="$emit('toggle-sidebar')"
        >
          <i :class="sidebarOpen ? 'el-icon-s-fold' : 'el-icon-s-unfold'" />
        </button>
        <slot name="topbar" />
      </div>
    </header>

    <aside class="console-shell__sidebar">
      <slot name="sidebar" />
    </aside>

    <div
      v-if="mobile && sidebarOpen"
      class="console-shell__mask"
      @click="$emit('close-sidebar')"
    />

    <main class="console-shell__workspace">
      <slot />
    </main>
  </div>
</template>

<script>
export default {
  name: 'ConsoleShell',
  props: {
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
    },
    sidebarToggleLabel: {
      type: String,
      default: '切换导航栏'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.console-shell {
  min-height: 100vh;
  background: $consolePageBackground;
  color: $consoleTextPrimary;

  &__topbar {
    position: fixed;
    z-index: 1002;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    height: $consoleHeaderHeight;
    background: $consoleSurface;
    border-bottom: 1px solid $consoleBorderColor;
    box-shadow: $consoleShadow;
  }

  &__brand {
    display: flex;
    flex: 0 0 $consoleSidebarWidth;
    align-items: center;
    min-width: 0;
    padding: 0 16px;
    border-right: 1px solid $consoleBorderColor;
    transition: flex-basis 0.2s ease;
  }

  &__topbar-content {
    display: flex;
    flex: 1;
    align-items: stretch;
    min-width: 0;
  }

  &__sidebar-toggle {
    flex: 0 0 $consoleHeaderHeight;
    width: $consoleHeaderHeight;
    padding: 0;
    color: $consoleTextSecondary;
    font-size: 20px;
    cursor: pointer;
    background: transparent;
    border: 0;
    border-right: 1px solid $consoleBorderColor;
    transition: color 0.2s ease, background-color 0.2s ease;

    &:hover,
    &:focus-visible {
      color: $consolePrimary;
      background: $consolePrimaryLight;
      outline: none;
    }
  }

  &__sidebar {
    position: fixed;
    z-index: 1001;
    top: $consoleHeaderHeight;
    bottom: 0;
    left: 0;
    width: $consoleSidebarWidth;
    overflow: hidden auto;
    background: $consoleSurface;
    border-right: 1px solid $consoleBorderColor;
    transition: width 0.2s ease, transform 0.2s ease;
  }

  &__workspace {
    min-height: 100vh;
    padding-top: $consoleHeaderHeight;
    margin-left: $consoleSidebarWidth;
    transition: margin-left 0.2s ease;
  }

  &__mask {
    position: fixed;
    z-index: 1000;
    top: $consoleHeaderHeight;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(15, 23, 42, 0.42);
  }

  &--collapsed:not(.console-shell--mobile) {
    .console-shell__brand {
      flex-basis: $consoleSidebarCollapsedWidth;
      padding: 0 16px;
    }

    .console-shell__sidebar {
      width: $consoleSidebarCollapsedWidth;
    }

    .console-shell__workspace {
      margin-left: $consoleSidebarCollapsedWidth;
    }
  }

  &--mobile {
    .console-shell__brand {
      flex-basis: $consoleSidebarCollapsedWidth;
      padding: 0 16px;
    }

    .console-shell__sidebar {
      width: $consoleSidebarWidth;
    }

    .console-shell__workspace {
      margin-left: 0;
    }

    &.console-shell--collapsed .console-shell__sidebar {
      pointer-events: none;
      transform: translate3d(-$consoleSidebarWidth, 0, 0);
    }
  }

  &--without-animation {
    .console-shell__brand,
    .console-shell__sidebar,
    .console-shell__workspace {
      transition: none;
    }
  }
}
</style>
