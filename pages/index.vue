<template>
  <Cadastro v-model="cliente" />
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      cliente: {}
    }
  }
}
</script>
