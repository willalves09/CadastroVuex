<template>
  <div class="mt-10">
    <div v-for="client of clients" :key="client.id" class="flex justify-center gap-20 ml-40 mr-40 mb-5 px-2 py-2 border-2 border-black">
      <div
        class="mt-2"
      >
        {{ client.id }}
      </div>
      <div
        class="mt-2"
      >
        {{ client.name }}
      </div>
      <div
        class="mt-2"
      >
        {{ client.email }}
      </div>
      <div
        class="mt-2"
      >
        {{ client.dataNascimento }}
      </div>
      <div
        class="mt-2"
      >
        {{ client.cpf }}
      </div>
      <div
        class="mt-2"
      >
        {{ client.qtdFilhos }}
      </div>
      <div>
        <!-- Teste Modal -->
        <label for="my-modal-2" class="btn bg-yellow-400 hover:bg-yellow-500 text-black modal-button" @click="editar = true">Editar</label>
        <input id="my-modal-2" type="checkbox" class="modal-toggle">
        <div v-if="editar" class="modal">
          <div class="modal-box">
            <formulario
              titulo="Dados Formulário"
              tipo-edicao="editar"
              @cancelar="editar = false"
              @validado="editar = false"
            />
            <div v-for="client of clients" :key="client.id">
              {{ client }}
            </div>
          </div>
        </div>
        <button class="bg-red-400 p-2" @click="deleteDados(client.id)">
          excluir
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Formulario from '@/components/Formulario'

export default {
  name: 'TabelaCadastro',
  components: { Formulario },
  data () {
    return {
      editar: true
    }
  },
  computed: {
    ...mapState(['clients'])
  },
  methods: {
    ...mapActions(['deleteDados'])
    // editarClient (client) {
    //   this.client = client
    //   this.$store.commit('editDados', this.client)
    // }
  }
}
</script>

<style scoped>

</style>
