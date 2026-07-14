<template>
  <main class="public-portal-access">
    <section class="public-portal-access__card" aria-labelledby="portal-access-title">
      <div class="public-portal-access__icon" aria-hidden="true">
        <i class="el-icon-lock" />
      </div>
      <div class="public-portal-access__eyebrow">{{ $t('portalAccessEyebrow') }}</div>
      <h1 id="portal-access-title">{{ title || $t('document') }}</h1>
      <p>{{ $t('portalPasswordDescription') }}</p>

      <el-form
        ref="accessForm"
        :model="formData"
        :rules="formRules"
        @submit.native.prevent="submit"
      >
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            :type="passwordVisible ? 'text' : 'password'"
            :placeholder="$t('visitPassword')"
            autocomplete="current-password"
            @keyup.enter.native="submit"
          >
            <el-button
              slot="append"
              type="button"
              :aria-label="passwordVisible ? $t('portalHidePassword') : $t('portalShowPassword')"
              @click="passwordVisible = !passwordVisible"
            >
              <i :class="passwordVisible ? 'el-icon-view' : 'el-icon-lock'" />
            </el-button>
          </el-input>
        </el-form-item>
        <el-button class="public-portal-access__submit" type="primary" native-type="submit" :loading="loading">
          {{ $t('portalUnlock') }}
        </el-button>
      </el-form>
    </section>
  </main>
</template>

<script>
export default {
  name: 'PublicPortalAccess',
  props: {
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      passwordVisible: false,
      formData: {
        password: ''
      },
      formRules: {
        password: [{ required: true, message: this.$t('passwordNotEmpty'), trigger: 'blur' }]
      }
    }
  },
  methods: {
    submit() {
      if (this.loading) {
        return
      }
      this.$refs.accessForm.validate(valid => {
        if (valid) {
          this.$emit('submit', this.formData.password)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.public-portal-access {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px 20px;
  color: $portalTextPrimary;
  background:
    radial-gradient(circle at 20% 10%, rgba(22, 119, 255, 0.14), transparent 32%),
    $portalPageBackground;

  &__card {
    width: 100%;
    max-width: 440px;
    padding: 44px;
    text-align: center;
    background: $portalSurface;
    border: 1px solid $portalBorderColor;
    border-radius: 16px;
    box-shadow: $portalShadow;

    h1 {
      margin: 10px 0 12px;
      font-size: 26px;
      line-height: 1.35;
    }

    > p {
      margin: 0 0 28px;
      color: $portalTextSecondary;
      line-height: 1.7;
    }
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    color: $portalPrimary;
    font-size: 22px;
    background: $portalPrimaryLight;
    border-radius: 14px;
  }

  &__eyebrow {
    margin-top: 20px;
    color: $portalPrimary;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  &__submit {
    width: 100%;
    height: 44px;
    margin-top: 4px;
    border-radius: 8px;
  }

  /deep/ .el-input__inner {
    height: 44px;
    line-height: 44px;
  }
}

@media (max-width: 480px) {
  .public-portal-access__card {
    padding: 34px 24px;
  }
}
</style>
