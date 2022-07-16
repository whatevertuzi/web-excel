<template>
  <div class="home">
    <RecordIt/>
  </div>
</template>

<script>
// @ is an alias to /src
import RecordIt from '@/components/RecordExportIt.vue'

export default {
  name: 'ItRecord',
  components: {
    RecordIt
  }
}
</script>
