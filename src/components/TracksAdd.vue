<template>
    <div class="md-layout">
        <form novalidate class="md-layout-item md-size-100 md-small-size-100" @submit.prevent="saveUser">
            <!--<md-card class="md-layout-item md-size-100 md-small-size-100">-->
                <md-card-header>
                    <div class="md-title">Adicionar Faixa</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="first-name">Titulo</label>
                                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.name" />
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="xxx">Album</label>
                                <md-select v-model="form.album" name="xxx" id="xxx">
                                    <md-option v-for="album in selectAlbums" :value="album.value" :key="album.id" >{{ album.text }}</md-option>
                                </md-select>
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="first-name">Ordem</label>
                                <md-input name="first-name" id="first-name2" type="number" autocomplete="given-name" v-model="form.number" />
                            </md-field>
                        </div>
                    </div>
                    <md-field>
                        <label for="first-name">Duração</label>
                        <md-input name="first-name" id="first-names" autocomplete="given-name" v-model="form.length" />
                    </md-field>
                </md-card-content>

                <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="sending">Criar Faixa</md-button>
                </md-card-actions>
            <!--</md-card>-->

            <md-snackbar :md-active.sync="userSaved">Seu cadastro com faixa {{ lastUser }} foi salvo com sucesso!</md-snackbar>
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
      album: null,
      number: null,
      length: null
    },
    auth: {
      headers: {Authorization: 'Token '}
    },
    selectAlbums: [],
    userSaved: false,
    userError: false,
    sending: false,
    lastUser: null
  }),
  methods: {
    saveUser () {
      this.auth.headers.Authorization += localStorage.getItem('token')
      console.log(this.auth)
      this.$http.post('http://127.0.0.1:8000/tracks/', this.form, this.auth).then((response) => {
        this.lastUser = this.form.name
        this.userSaved = true
        const self = this
        setTimeout(function () {
          self.$router.push({name: 'album', params: {id: response.data.album}})
        }, 2000)
      }, (err) => {
        this.userError = true
        console.log(err)
      })
    },
    loadAlbums: function () {
      this.$http.get('http://127.0.0.1:8000/albums/').then((response) => {
        // this.selectMusicos = response.data.results
        let list = response.data.results.map(obj => {
          return {value: obj.id, text: obj.title}
        })
        this.selectAlbums = list
      }, (err) => {
        // this.userError = true
        console.log(err)
      })
    },
  },
  mounted: function () {
    this.loadAlbums()
  }
}
</script>
