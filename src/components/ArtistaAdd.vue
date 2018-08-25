<template>
    <div class="md-layout">
        <form novalidate class="md-layout-item md-size-100 md-small-size-100" @submit.prevent="saveArtista">
            <!--<md-card class="md-layout-item md-size-100 md-small-size-100">-->
                <md-card-header>
                    <div class="md-title">Adicionar Artista</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="first-name">Nome</label>
                                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.name" />
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="last-name">Criada em</label>
                                <md-input name="last-name" type="date" id="last-name" autocomplete="family-name" v-model="form.since" />
                            </md-field>
                        </div>
                    </div>

                    <md-field>
                        <label for="xxx">Musicos</label>
                        <md-select v-model="form.musicians" name="xxx" id="xxx" multiple>
                            <md-option v-for="musico in selectMusicos" :value="musico.value" :key="musico.id" >{{ musico.text }}</md-option>
                        </md-select>
                    </md-field>
                </md-card-content>

                <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="sending">Adicionar Artista</md-button>
                </md-card-actions>
            <!--</md-card>-->

            <md-snackbar :md-active.sync="userSaved">Seu cadastro com usuario {{ lastUser }} foi salvo com sucesso!</md-snackbar>
            <md-snackbar :md-active.sync="userError">Algo deu errado. Tente novamente!</md-snackbar>
        </form>
    </div>
</template>

<script>

export default {
  name: 'FormValidation',
  data: () => ({
    form: {
      name: null,
      since: null,
      musicians: []
    },
    auth: {
      headers: {Authorization: 'Token '}
    },
    userSaved: false,
    userError: false,
    sending: false,
    lastUser: null,
    selectMusicos: {}
  }),
  methods: {
    loadMusicos () {
      this.$http.get('http://127.0.0.1:8000/musicians/').then((response) => {
        // this.selectMusicos = response.data.results
        let list = response.data.results.map(obj => {
          return {value: obj.id, text: obj.first_name + ' ' + obj.last_name}
        })
        this.selectMusicos = list
      }, (err) => {
        // this.userError = true
        console.log(err)
      })
    },
    saveArtista () {
      this.auth.headers.Authorization += localStorage.getItem('token')
      console.log(JSON.stringify(this.form))
      this.$http.post('http://127.0.0.1:8000/artists/', this.form, this.auth).then((response) => {
        this.lastUser = this.form.name
        this.userSaved = true
        console.log(response)
      }, (err) => {
        this.userError = true
        console.log(err)
      })
    }
  },
  mounted: function () {
    this.loadMusicos()
  }
}
</script>
