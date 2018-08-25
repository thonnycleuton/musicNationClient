<template>
    <div class="md-layout">
        <form novalidate class="md-layout-item md-size-100 md-small-size-100" @submit.prevent="saveUser">
            <!--<md-card class="md-layout-item md-size-100 md-small-size-100">-->
                <md-card-header>
                    <div class="md-title">Novo Review / Album: {{ album_name }}</div>
                </md-card-header>

                <md-card-content>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="movie">Sua nota</label>
                                <md-select v-model="form.rank" name="movie" id="movie">
                                    <md-option value="1">1</md-option>
                                    <md-option value="2">2</md-option>
                                    <md-option value="3">3</md-option>
                                    <md-option value="4">4</md-option>
                                    <md-option value="5">5</md-option>
                                    <md-option value="6">6</md-option>
                                    <md-option value="7">7</md-option>
                                    <md-option value="8">8</md-option>
                                    <md-option value="9">9</md-option>
                                    <md-option value="10">10</md-option>
                                </md-select>
                            </md-field>
                        </div>
                    </div>
                    <md-field>
                        <label>Seu review</label>
                        <md-textarea v-model="form.review"></md-textarea>
                    </md-field>
                </md-card-content>

                <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="sending">SUBMETER</md-button>
                </md-card-actions>
            <!--</md-card>-->

            <md-snackbar :md-active.sync="userSaved">Seu review foi salvo com sucesso!</md-snackbar>
            <md-snackbar :md-active.sync="userError">Algo deu errado. Tente novamente!</md-snackbar>
        </form>
    </div>
</template>

<script>

export default {
  name: 'FormValidation',
  props: ['id'],
  computed: {
    getId: function () {
      if (this.id != null) {
        return this.id
      }
    }
  },
  data: () => ({
    form: {
      review: null,
      album: null,
      rank: 1
    },
    album_name: '',
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
      this.form.album = this.getId
      this.form.user = parseInt(localStorage.getItem('current_user'))
      console.log(JSON.stringify(this.form))
      this.$http.post('http://127.0.0.1:8000/albumreviews/', this.form, this.auth).then((response) => {
        // this.lastUser = this.form.name
        this.userSaved = true
        const self = this
        setTimeout(function () {
          self.$router.push({name: 'album', params: {id: self.getId}})
        }, 2000)
      }, (err) => {
        this.userError = true
        console.log(err)
      })
    },
    loadAlbums: function () {
      this.$http.get('http://127.0.0.1:8000/albums/'+ this.getId).then((response) => {
        this.album_name = response.data.title
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
