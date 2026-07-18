<template>
  <nav v-if="sections.length > 0" class="public-document-outline" :aria-label="$t('portalOnThisPage')">
    <div class="public-document-outline__title">{{ $t('portalOnThisPage') }}</div>
    <button
      v-for="section in sections"
      :key="section.id"
      type="button"
      class="public-document-outline__item"
      :class="{
        'public-document-outline__item--active': section.id === activeId,
        'public-document-outline__item--nested': section.level && section.level > 2
      }"
      @click="$emit('select', section.id)"
    >
      {{ section.label }}
    </button>
  </nav>
</template>

<script>
export default {
  name: 'PublicDocumentOutline',
  props: {
    sections: {
      type: Array,
      default: () => []
    },
    activeId: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.public-document-outline {
  position: sticky;
  top: calc(#{$portalHeaderHeight} + 28px);
  padding-left: 18px;
  border-left: 1px solid $portalBorderColor;

  &__title {
    margin-bottom: 12px;
    color: $portalTextSecondary;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  &__item {
    display: block;
    width: 100%;
    padding: 7px 0;
    overflow: hidden;
    color: $portalTextSecondary;
    font-size: 12px;
    line-height: 1.45;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: transparent;
    border: 0;
    cursor: pointer;
    transition: color 0.18s ease, transform 0.18s ease;

    &:hover,
    &:focus-visible,
    &--active {
      color: $portalPrimary;
      outline: 0;
    }

    &--active {
      font-weight: 600;
      transform: translateX(4px);
    }

    &--nested {
      padding-left: 12px;
      font-size: 11px;
    }
  }
}
</style>
