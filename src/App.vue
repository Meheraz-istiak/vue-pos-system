<template>
  <router-view />
</template>

<script>
import { useThemeSettingsStore } from "@/store/themeSettings";

export default {
  name: 'App',
  mounted() {
    this.$store.themeSettingsStore = useThemeSettingsStore()
  }
}
</script>

<style></style>
