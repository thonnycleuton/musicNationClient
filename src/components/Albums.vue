<template>
    <div>
        <md-table v-model="searched" md-sort="name" md-sort-order="asc">
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Albuns</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Buscar por nome" v-model="search" @input="searchOnTable" />
                </md-field>
            </md-table-toolbar>

            <md-table-empty-state
                    md-label="Nenhum Artista Encontrado"
                    :md-description="`Nenhum artista encontrado para '${search}'. Tente uma nova busca.`">
            </md-table-empty-state>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Nome" md-sort-by="title">
                    <router-link :to="{name: 'album', params: {id: item.id}}">{{ item.title }}</router-link>
                </md-table-cell>
                <md-table-cell md-label="Gênero" md-sort-by="genre">{{ item.genre.name }}</md-table-cell>
                <md-table-cell md-label="Ano" md-sort-by="year">{{ item.year | moment("DD [de] MMMM [de] YYYY") }}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase()
}

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.title).includes(toLower(term)))
  }

  return items
}

export default {
  name: 'TableSearch',
  data: () => ({
    search: null,
    searched: [],
    artistas: []
  }),
  methods: {
    loadArtistas: function () {
      // console.log(this.$root.logado)
      this.$http.get('http://localhost:8000/albums/').then((response) => {
        this.artistas = response.data.results
        this.searched = response.data.results
      }, (err) => {
        console.log(err)
      })
    },
    newUser () {
      window.alert('Noop')
    },
    searchOnTable () {
      this.searched = searchByName(this.artistas, this.search)
    }
  },
  mounted () {
    this.loadArtistas()
  }
}
</script>
