<template>
    <div>
        <span class="md-title">{{ artista.name }}</span>
        <md-table v-model="integrantes" md-sort="first_name" md-sort-order="asc">
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Integrantes</h1>
                </div>

            </md-table-toolbar>

            <md-table-empty-state
                    md-label="Nenhum Integrante Encontrado"
                    :md-description="`Nenhum integrante encontrado.`">
            </md-table-empty-state>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Nome" md-sort-by="first_name">{{ item.first_name }} {{ item.last_name }}</md-table-cell>
                <md-table-cell md-label="Aniversário" md-sort-by="birthday">{{ item.birthday | moment("DD [de] MMMM [de] YYYY") }}</md-table-cell>
            </md-table-row>
        </md-table>

        <md-table v-model="albuns" md-sort="title" md-sort-order="asc">
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Álbuns</h1>
                </div>

            </md-table-toolbar>

            <md-table-empty-state
                    md-label="Nenhum Album Encontrado"
                    :md-description="`Nenhum album encontrado.`">
            </md-table-empty-state>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Nome" md-sort-by="title">
                <router-link :to="{name: 'album', params: {id: item.id}}">{{ item.title }}</router-link>
                </md-table-cell>
                <md-table-cell md-label="Gênero" md-sort-by="genre">{{ item.genre.name }}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>

export default {
  name: 'TableSearch',
  props: ['id'],
  computed: {
    getId: function () {
      if (this.id != null) {
        return this.id
      }
    }
  },
  data: () => ({
    artista: {},
    albuns: [],
    integrantes: []
  }),
  methods: {
    loadArtista: function () {
      this.$http.get('http://localhost:8000/artists/' + this.getId).then((response) => {
        this.artista = response.data
        this.albuns = this.artista.albuns_list
        this.integrantes = this.artista.musicians_list
        console.log(response.data)
      }, (err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.loadArtista()
  }
}
</script>
