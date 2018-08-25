<template>
    <div class="md-layout">
        <form novalidate class="md-layout-item md-size-100 md-small-size-100" @submit.prevent="saveUser">
            <!--<md-card class="md-layout-item md-size-100 md-small-size-100">-->
                <md-card-header>
                    <div class="md-title">Adicionar Album</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="first-name">Titulo</label>
                                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.title" />
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="xxx">Artista</label>
                                <md-select v-model="form.artist" name="xxx" id="xxx">
                                    <md-option v-for="artista in selectArtistas" :value="artista.value" :key="artista.id" >{{ artista.text }}</md-option>
                                </md-select>
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="username">Lançamento</label>
                                <md-input name="last-name" id="username" type="date" autocomplete="family-name" v-model="form.year" />
                            </md-field>
                        </div>
                    </div>
                    <md-field>
                        <label for="xxx">Gravadora</label>
                        <md-select v-model="form.label" name="xxx" id="xxx">
                            <md-option v-for="label in selectLabels" :value="label.value" :key="label.id" >{{ label.text }}</md-option>
                        </md-select>
                    </md-field>

                    <md-field>
                        <label for="xxx">Genero</label>
                        <md-select v-model="form.genre" name="xxx" id="xxx">
                            <md-option v-for="genero in selectGeneros" :value="genero.value" :key="genero.id" >{{ genero.text }}</md-option>
                        </md-select>
                    </md-field>
                </md-card-content>

                <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="sending">Criar Musico</md-button>
                </md-card-actions>
            <!--</md-card>-->

            <md-snackbar :md-active.sync="userSaved">Seu cadastro com músico {{ lastUser }} foi salvo com sucesso!</md-snackbar>
            <md-snackbar :md-active.sync="userError">Algo deu errado. Tente novamente!</md-snackbar>
        </form>
    </div>
</template>

<script>

export default {
  name: 'FormValidation',
  data: () => ({
    form: {
      title: null,
      artist: null,
      label: null,
      genre: null,
    },
    auth: {
      headers: {Authorization: 'Token '}
    },
    selectGeneros: [],
    selectLabels: [],
    selectArtistas: [],
    userSaved: false,
    userError: false,
    sending: false,
    lastUser: null
  }),
  methods: {
    saveUser () {
      this.auth.headers.Authorization += localStorage.getItem('token')
      console.log(this.auth)
      this.$http.post('http://127.0.0.1:8000/albums/', this.form, this.auth).then((response) => {
        this.lastUser = this.form.name
        this.userSaved = true
        const self = this
        setTimeout(function () {
          self.$router.push({name: 'album', params: {id: response.data.id}})
        }, 2000)
      }, (err) => {
        this.userError = true
        console.log(err)
      })
    },
    loadArtists: function () {
      this.$http.get('http://127.0.0.1:8000/artists/').then((response) => {
        // this.selectMusicos = response.data.results
        let list = response.data.results.map(obj => {
          return {value: obj.id, text: obj.name}
        })
        this.selectArtistas = list
      }, (err) => {
        // this.userError = true
        console.log(err)
      })
    },
    loadGenres: function () {
      this.$http.get('http://127.0.0.1:8000/genres/').then((response) => {
        // this.selectMusicos = response.data.results
        let list = response.data.results.map(obj => {
          return {value: obj.id, text: obj.name}
        })
        this.selectGeneros = list
      }, (err) => {
        // this.userError = true
        console.log(err)
      })
    },
    loadLabes: function () {
      this.$http.get('http://127.0.0.1:8000/labels/').then((response) => {
        // this.selectMusicos = response.data.results
        let list = response.data.results.map(obj => {
          return {value: obj.id, text: obj.name}
        })
        this.selectLabels = list
      }, (err) => {
        // this.userError = true
        console.log(err)
      })
    }
  },
  mounted: function () {
    this.loadArtists()
    this.loadGenres()
    this.loadLabes()
  }
}
</script>
