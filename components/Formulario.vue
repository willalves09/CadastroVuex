<template>
  <div>
    <h3>{{ titulo }}</h3>
    <div class="text-center mt-10">
      <!-- Input Nome Completo -->
      <div>
        <label class="text-lg mr-2">Nome Completo</label>
        <!-- :class="{ 'bg-red-200' : $v.client.name.$error}" -->
        <input v-model.trim="client.name" type="text" class="custom-input" @change="$v.client.name.$touch()">
        <div>
          <span v-if="$v.client.name.$error" class="italic text-red-400">Este campo é requirido!<br></span>
          <span v-if="!$v.client.name.minLength" class="italic text-red-400">O nome deve ter no mínimo {{ $v.client.name.$params.minLength.min }} letras<br></span>
          <span v-if="!$v.client.name.alpha" class="italic text-red-400">Este campo aceita apenas letras<br></span>
          <span v-if="!$v.client.name.withParams" class="italic text-red-400">Por favor, digite seu sobrenome</span>
        </div>
      </div>
      <!-- Input Email -->
      <div>
        <label class="text-lg mr-2">Email</label>
        <input v-model.trim="client.email" type="text" class="custom-input" @change="$v.client.email.$touch()">
        <div>
          <span v-if="$v.client.email.$error" class="italic text-red-400">Este e-mail é inválido!</span>
        </div>
      </div>
      <!-- Input Data de Nascimento -->
      <div>
        <label class="text-lg mr-2">Data de Nascimento</label>
        <input v-model="client.dataNascimento" v-mask="'##/##/####'" type="text" class="custom-input" @change="$v.client.dataNascimento.$touch()">
        <div>
          <span v-if="$v.client.dataNascimento.$error" class="italic text-red-400">Este campo é requirido!<br></span>
          <span v-if="!$v.client.dataNascimento.minLength" class="italic text-red-400">Preencha todo o campo</span>
        </div>
      </div>
      <!-- Input CPF -->
      <div>
        <label class="text-lg mr-2">CPF</label>
        <input v-model="client.cpf" v-mask="'###.###.###-##'" type="text" class="custom-input" @change="$v.client.cpf.$touch()">
        <div>
          <span v-if="$v.client.cpf.$error" class="italic text-red-400">Este campo é requirido!</span>
          <span v-if="!$v.client.cpf.minLength" class="italic text-red-400">Preencha todo o campo</span>
        </div>
      </div>
      <!-- Input Quantidade de Filhos -->
      <div>
        <label class="text-lg mr-2">Quantidade de filhos</label>
        <input v-model.trim="client.qtdFilhos" type="text" class="custom-input" @change="$v.client.qtdFilhos.$touch()">
        <div>
          <span v-if="$v.client.qtdFilhos.$error" class="italic text-red-400">Este campo é requirido!<br></span>
          <span v-if="!$v.client.qtdFilhos.between" class="italic text-red-400">Digite um número entre {{ $v.client.qtdFilhos.$params.between.min }}
            e {{ $v.client.qtdFilhos.$params.between.max }}</span>
        </div>
      </div>
      <!-- Botão Salvar Cliente -->
      <div class="mt-5">
        <button class="bg-green-500 text-white p-2" @click.prevent="salvar">
          Salvar
        </button>
        <button class="bg-red-400 text-white p-2" @click="cancelar">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { between, email, helpers, minLength, numeric, required } from 'vuelidate/lib/validators'

const withParams = helpers.regex('withParams', /^([a-zA-Z0-9à-úÀ-Ú])+(?:(\s[a-zA-Z0-9à-úÀ-Ú]{2,})+)+$/)
const alpha = helpers.regex('alpha', /^[a-zA-Z]+(\s[a-zA-Z]+)*$/)

export default {
  name: 'FormularioCadastro',
  props: {
    titulo: {
      type: String,
      default () {
        return 'Digite aqui os dados'
      }
    },
    tipoEdicao: {
      type: String,
      default () {
        return 'cadastrar' // Pode ser "cadastrar" ou "editar"
      }
    },
    idClienteEditar: {
      type: Number,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      client: {
        id: 0,
        name: '',
        email: 'william@gmail.com',
        dataNascimento: '09122002',
        cpf: '12345678900',
        qtdFilhos: '2'
      }
    }
  },
  created () {
    if (this.tipoEdicao === 'editar') {
      const dados = this.$store.state.clients.filter((client) => {
        return client.id === this.idClienteEditar
      })
      if (dados.length > 0) {
        const cliente = dados[0]
        this.client = cliente
      } else {
        console.log('Erro ao editar cliente, nâo localizado!!!!!')
      }
    }
  },
  validations: {
    client: {
      name: { required, minLength: minLength(4), alpha, withParams },
      email: { required, email },
      dataNascimento: { required, minLength: minLength(10) },
      cpf: { required, minLength: minLength(14) },
      qtdFilhos: { required, between: between(1, 4), numeric }
    }
  },
  methods: {
    cancelar () {
      this.client = {}
      this.$emit('cancelar')
    },
    salvar () {
      if (!this.$v.$invalid) {
        if (this.tipoEdicao === 'cadastrar') {
          this.incrementId()
          this.$store.commit('saveDados', this.client)
          this.$emit('validado')
        } else if (this.tipoEdicao === 'editar') {
          window.alert('Atualizando...')
        }
      } else {
        this.$v.$touch()
      }
    },
    incrementId () {
      if (this.client.id === 0) {
        this.client.id = this.$store.state.clients.length + 1
      }
    }
  }
}
</script>

<style scoped>

.custom-input {
  @apply border border-black border-l-0 border-r-0 border-t-0 px-2 text-center
}

</style>
