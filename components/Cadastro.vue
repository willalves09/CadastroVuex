<template>
  <div>
    <div>
      <div v-if="add_cliente" class="text-center mt-10">
        <div>
          {{ client.id }}
        </div>
        <div>
          <label class="text-lg mr-2">Nome Completo</label>
          <input v-model="client.name" type="text" class="custom-input">
        </div>
        <div>
          <label class="text-lg mr-2">Email</label>
          <input v-model="client.email" type="text" class="custom-input">
        </div>
        <div>
          <label class="text-lg mr-2">Data de Nascimento</label>
          <input v-model="client.data_nascimento" v-mask="'##/##/####'" type="text" class="custom-input">
        </div>
        <div>
          <label class="text-lg mr-2">CPF</label>
          <input v-model="client.cpf" v-mask="'###.###.###-##'" type="text" class="custom-input">
        </div>
        <div>
          <label class="text-lg mr-2">Quantidade de filhos</label>
          <input v-model="client.qtd_filhos" type="text" class="custom-input">
        </div>
        <div class="mt-5">
          <button class="bg-yellow-400 text-white p-2">
            Atualizar
          </button>
          <button class="bg-black text-white p-2" @click="salvar">
            Cadastrar
          </button>
        </div>
      </div>
    </div>
    <div class="text-center mt-10">
      <button class="bg-green-500 text-white p-2" @click="add_cliente = true">
        Cadastrar Cliente
      </button>
    </div>
    <div class="mt-20">
      <div class="text-2xl text-white text-center bg-black p-2">
        Lista De Clientes
      </div>
      {{ clients }}
    </div>
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
          {{ client.data_nascimento }}
        </div>
        <div
          class="mt-2"
        >
          {{ client.cpf }}
        </div>
        <div
          class="mt-2"
        >
          {{ client.qtd_filhos }}
        </div>
        <div>
          <button class="bg-yellow-400 p-2" @click="editar(client)">
            edita
          </button>
          <button class="bg-red-400 p-2" @click="deleteDados(client.id)">
            exclui
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'CadastroCliente',
  data () {
    return {
      add_cliente: false,
      client: {
        id: 0,
        name: '',
        email: '',
        data_nascimento: '',
        cpf: '',
        qtd_filhos: ''
      }
    }
  },
  validations: {
    name: required,
    id: required,
    email: required,
    data_nascimento: required,
    cpf: required,
    qtd_filhos: required
  },
  computed: {
    ...mapState(['clients'])
  },
  methods: {
    ...mapActions(['deleteDados']),
    salvar () {
      console.log(this.client)
      this.client.id = this.incrementId()
      this.$store.commit('saveDados', this.client)
      this.client = {}
    },
    editar (client) {
      this.$store.commit('editDados', this.client)
    },
    incrementId () {
      let maiorId = 0
      this.$store.state.clients.forEach((client) => {
        if (maiorId < client.id) {
          maiorId = client.id
        }
      })
      console.log(maiorId)
      return maiorId + 1
    }
  }
}
</script>

<style scoped>

.custom-input {
  @apply border border-black border-l-0 border-r-0 border-t-0 px-2 text-center
}

</style>
