<template>
    <div class="page-container">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-title">Music Nation</span>
                    <div class="md-toolbar-section-end">
                        <md-button @teste="isLogged" v-if="!logado" :to="{name: 'login'}">Entrar</md-button>
                        <md-button v-else  @click.prevent="sair()">Sair</md-button>
                        <md-button v-if="!logado" :to="{name: 'cadastro'}">Cadastro</md-button>
                    </div>

                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <md-toolbar class="md-transparent" md-elevation="0">
                    Navigation
                </md-toolbar>

                <md-list>
                    <md-list-item :to="{name: 'artistas'}">
                            <span class="md-list-item-text">
                                Artistas
                            </span>
                    </md-list-item>

                    <md-list-item :to="{name: 'albums'}">
                        <span class="md-list-item-text">Albuns</span>
                    </md-list-item>

                    <md-list-item :to="{name: 'album-add'}" v-if="logado && is_staff == 'true'">
                        <span class="md-list-item-text">Novo Album</span>
                    </md-list-item>

                    <md-list-item :to="{name: 'musico-add'}" v-if="logado && is_staff == 'true'">
                        <span class="md-list-item-text">Novo Musico</span>
                    </md-list-item>

                    <md-list-item :to="{name: 'artista-add'}" v-if="logado && is_staff == 'true'">
                        <span class="md-list-item-text">Novo Artista</span>
                    </md-list-item>

                    <md-list-item :to="{name: 'track-add'}" v-if="logado && is_staff == 'true'">
                        <span class="md-list-item-text">Nova faixa de musica</span>
                    </md-list-item>

                    <md-list-item @click.prevent="sair()" :to="{name: 'albums'}" v-if="logado">
                        <span class="md-list-item-text">Sair</span>
                    </md-list-item>

                    <md-list-item :to="{name: 'login'}" v-else>
                        <span class="md-list-item-text">Entrar</span>
                    </md-list-item>
                </md-list>
            </md-app-drawer>

            <md-app-content>
                <router-view/>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      showNavigation: false,
      showSidepanel: false,
      menuVisible: false,
      logado: window.logado,
      is_staff: false,
      auth: {
        headers: {Authorization: 'Token '}
      }
    }
  },
  methods: {
    isLogged: function (value) {
      alert()
      this.logado = value
    },
    sair: function () {
      window.logado = this.logado = false
      this.$root.logado = this.logado
      localStorage.removeItem('token')
      localStorage.removeItem('especial')
      localStorage.removeItem('current_user')
    }
  },
  created: function () {
    this.auth.headers.Authorization += localStorage.getItem('token')
    this.$http.get('http://localhost:8000/groupmembers/', this.auth).then((response) => {
      window.logado = this.logado = true
      this.$root.logado = this.logado
    }, (err) => {
      console.log(err)
    })
  },
  mounted: function () {
    this.is_staff = localStorage.getItem('especial')
    this.$parent.is_staff = localStorage.getItem('especial')
    this.$root.is_staff = localStorage.getItem('especial')
  }
}
</script>
