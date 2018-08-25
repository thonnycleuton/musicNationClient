<template>
    <div class="md-layout">
        <form novalidate class="md-layout-item md-size-100 md-small-size-100" @submit.prevent="saveUser">
            <!--<md-card class="md-layout-item md-size-100 md-small-size-100">-->
            <md-card-header>
                <div class="md-title">Entrar</div>
            </md-card-header>

            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                        <md-field>
                            <label for="first-name">Usuário</label>
                            <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.username" />
                        </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100">
                        <md-field>
                            <label for="password">Senha</label>
                            <md-input name="last-name" id="password" type="password" autocomplete="family-name" v-model="form.password" />
                        </md-field>
                    </div>
                </div>
            </md-card-content>

            <md-card-actions>
                <md-button type="submit" class="md-primary">Entrar</md-button>
            </md-card-actions>
            <!--</md-card>-->
            <md-snackbar :md-active.sync="userError">Username e/ou senha invalidos!</md-snackbar>

        </form>
    </div>
</template>

<script>

export default {
  name: 'FormValidation',
  data () {
    return {
      form: {
        username: null,
        password: null
      },
      userError: false,
      is_staff: false
    }
  },
  methods: {
    saveUser: function () {
      this.$http.post('http://127.0.0.1:8000/token/', this.form).then((response) => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('especial', response.data.is_staff)
        localStorage.setItem('current_user', response.data.id)
        window.logado = true
        this.$root.$children[0].logado = true

        this.is_staff = localStorage.getItem('especial')
        this.$parent.is_staff = localStorage.getItem('especial')
        this.$root.is_staff = localStorage.getItem('especial')

        this.$router.push({name: 'artistas'})
      }, (err) => {
        this.userError = true
        console.log(err)
      })
    }
  },
  mounted: function () {
  }
}
</script>
