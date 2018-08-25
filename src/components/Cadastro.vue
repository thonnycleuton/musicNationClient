<template>
    <div class="md-layout">
        <form novalidate class="md-layout-item md-size-100 md-small-size-100" @submit.prevent="saveUser">
            <!--<md-card class="md-layout-item md-size-100 md-small-size-100">-->
                <md-card-header>
                    <div class="md-title">Cadastro</div>
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
                                <label for="username">Username</label>
                                <md-input name="last-name" id="username" autocomplete="family-name" v-model="form.username" />
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="password">Senha</label>
                                <md-input name="last-name" id="password" type="password" autocomplete="family-name" v-model="form.password" />
                            </md-field>
                        </div>
                    </div>

                    <md-field>
                        <label for="email">Email</label>
                        <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email"/>
                    </md-field>
                </md-card-content>

                <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="sending">Criar Conta</md-button>
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
      first_name: null,
      last_name: null,
      email: null,
      username: null,
      password: null
    },
    userSaved: false,
    userError: false,
    sending: false,
    lastUser: null
  }),
  methods: {
    saveUser () {
      this.$http.post('http://127.0.0.1:8000/profiles/', this.form).then((response) => {
        this.lastUser = this.form.username
        this.userSaved = true
        console.log(response)
      }, (err) => {
        this.userError = true
        console.log(err)
      })
    }
  }
}
</script>
