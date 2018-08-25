<template>
    <div class="md-layout">
        <form novalidate class="md-layout-item md-size-100 md-small-size-100" @submit.prevent="saveUser">
            <!--<md-card class="md-layout-item md-size-100 md-small-size-100">-->
                <md-card-header>
                    <div class="md-title">Adicionar Músico</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="first-name">First Name</label>
                                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.first_name" />
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="last-name">Last Name</label>
                                <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.last_name" />
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="username">Nascimento</label>
                                <md-input name="last-name" id="username" type="date" autocomplete="family-name" v-model="form.birthday" />
                            </md-field>
                        </div>
                    </div>
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
      first_name: null,
      last_name: null,
      birthday: null
    },
    auth: {
      headers: {Authorization: 'Token '}
    },
    userSaved: false,
    userError: false,
    sending: false,
    lastUser: null
  }),
  methods: {
    saveUser () {
      this.auth.headers.Authorization += localStorage.getItem('token')
      this.$http.post('http://127.0.0.1:8000/musicians/', this.form, this.auth).then((response) => {
        this.lastUser = this.form.first_name
        this.userSaved = true
      }, (err) => {
        this.userError = true
        console.log(err)
      })
    }
  }
}
</script>
