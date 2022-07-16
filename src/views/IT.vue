<template>
  <div class="home">
    <ExportExcel/>
  </div>
</template>

<script>
// @ is an alias to /src
import ExportExcel from '@/components/ExportIt.vue'

export default {
  name: 'HomeView',
  components: {
    ExportExcel
  }
}
</script>
