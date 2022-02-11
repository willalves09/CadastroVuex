<template>
  <div>
    <Cadastro v-model="cliente" @salvar="1" @cancelar="2" />
  </div>
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
