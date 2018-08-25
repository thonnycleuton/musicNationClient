<template>
    <div>
        <md-table v-model="searched" md-sort="name" md-sort-order="asc">
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Artistas</h1>
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
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Artista" md-sort-by="name">
                    <router-link :to="{name: 'artista', params: {id: item.id}}">{{ item.name }}</router-link>
                </md-table-cell>
                <md-table-cell md-label="Criada em" md-sort-by="since">{{ item.since | moment("DD [de] MMMM [de] YYYY") }}</md-table-cell>
                <md-table-cell md-label="Integrantes" md-sort-by="since">
                    <span v-for="musician in item.musicians_list" v-bind:key="musician.id">
                        {{ musician.first_name }} {{ musician.last_name }},
                    </span>
                </md-table-cell>
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
    return items.filter(item => toLower(item.name).includes(toLower(term)))
  }

  return items
}

export default {
  name: 'TableSearch',
  data: () => ({
    search: null,
    searched: [],
    artistas: [],
    users: [],
    is_staff: false
  }),
  methods: {
    loadArtistas: function () {
      // console.log(this.$root.logado)
      this.$http.get('http://localhost:8000/artists/').then((response) => {
        this.users = response.data.results
        this.searched = response.data.results
      }, (err) => {
        console.log(err)
      })
    },
    newUser () {
      window.alert('Noop')
    },
    searchOnTable () {
      this.searched = searchByName(this.users, this.search)
    }
  },
  mounted () {
    this.is_staff = localStorage.getItem('especial')
    this.$parent.is_staff = localStorage.getItem('especial')
    this.$root.is_staff = localStorage.getItem('especial')
    console.log(this.$root)
    // alert(this.is_staff)
    this.loadArtistas()
  }
}
</script>
