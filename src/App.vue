<script>
import DefaultHeader from '@/components/DefaultHeader.vue'
import SelectRegion from '@/components/modals/SelectRegion.vue'

export default {
  name: 'App',
  components: { DefaultHeader, SelectRegion },
  data() {
    return {
      openModal: false,
      cityId: localStorage.getItem('city_id')
    }
  }
}
</script>

<template>
  <DefaultHeader
    v-model="openModal"
    :city-id="cityId"
  />
  <div class="layout">
    <RouterView :city-id="cityId" />
  </div>
  <Teleport to="body">
    <SelectRegion
      v-if="openModal"
      v-model="openModal"
      v-model:city-id="this.cityId"
    />
  </Teleport>
</template>

<style scoped>
.layout {
  max-width: 1280px;
  margin: 10px auto;
}
</style>
