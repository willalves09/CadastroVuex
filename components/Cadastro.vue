<template>
  <div>
    <!-- Componente Formulário -->
    <button v-if="!cadastrar" class="btn btn-success" @click="cadastrar=true">
      Cadastrar
    </button>
    <formulario
      v-if="cadastrar"
      v-model="dados"
      titulo="Digite dados"
      tipo-edicao="cadastrar"
      @cancelar="cadastrar = false"
      @validado="cadastrar = false"
    />
    <!-- Lista/Array de Clientes -->
    <div class="mt-20">
      <div class="text-2xl text-white text-center bg-black p-2">
        Lista De Clientes
      </div>
      {{ clients }}
    </div>
    <!-- Tabela de clientes -->
    <div class="mt-20">
      <div class="text-3xl text-white text-center bg-black p-2">
        TABELA DE CLIENTES
      </div>
      <div class="flex justify-center gap-10 text-2xl mt-3">
        <div>Id</div>
        <div>Nome</div>
        <div>Email</div>
        <div>Data de Nascimento</div>
        <div>CPF</div>
        <div>Quantidade de Filhos</div>
        <div>Opções</div>
      </div>
    </div>
    <!-- Componente Tabela -->
    <Tabela />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Formulario from '@/components/Formulario'
import Tabela from '@/components/Tabela'

export default {
  name: 'CadastroCliente',
  components: {
    Formulario,
    Tabela
  },
  data () {
    return {
      cadastrar: false,
      dados: {}
    }
  },
  computed: {
    ...mapState(['clients'])
  }
}
</script>

<style scoped>
</style>
