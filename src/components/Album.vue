<template>
    <div>
        <span class="md-title">{{ album.title }} - {{ album.year  | moment("YYYY")}}</span>
        <md-table v-model="musicas" md-sort="title" md-sort-order="asc">
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Faixas</h1>
                </div>

            </md-table-toolbar>
            <md-table-empty-state
                    md-label="Nenhuma Faixa Encontrado"
                    :md-description="`Nenhuma faixa encontrado.`">
            </md-table-empty-state>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Ordem" md-sort-by="id" md-numeric>{{ item.number }}</md-table-cell>
                <md-table-cell md-label="Artista" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Duração" md-sort-by="length">{{ item.length | moment("mm:ss") }}</md-table-cell>
            </md-table-row>
        </md-table>

        <div id="reviews" style="margin-top: 10px">
            <div class="md-toolbar-section-start">
                <h1 class="md-title">Reviews</h1>
                <h1 class="md-headline" style="margin-left: 50px"><router-link :to="{name: 'album-review', params: {id: getId}}">Novo Review</router-link></h1>
            </div>
            <md-table v-model="reviews" md-sort="title" md-sort-order="asc">
                <md-table-empty-state
                        md-label="Nenhum review Encontrado"
                        :md-description="`Nenhuma review encontrado.`">
                </md-table-empty-state>
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell v-if="!item.editmode" md-label="Ranking" md-sort-by="user" md-numeric>{{ item.rank }}/10</md-table-cell>
                    <md-table-cell v-else md-label="Ranking" md-sort-by="user" md-numeric>
                        <md-field>
                            <md-input name="last-name" type="number" :value="item.rank" id="last-name" autocomplete="family-name" v-model="item.rank" />/10
                        </md-field>
                    </md-table-cell>

                    <md-table-cell md-label="Usuario" md-sort-by="first_name">{{ item.user.first_name }}</md-table-cell>
                    <md-table-cell v-if="!item.editmode" md-label="Review" md-sort-by="review">{{ item.review }}</md-table-cell>
                    <md-table-cell v-else md-label="Review" md-sort-by="review">
                        <md-field>
                            <md-textarea v-model="item.review">{{ item.review }}</md-textarea>
                        </md-field>
                    </md-table-cell>
                    <md-table-cell v-if="current_user == item.user.id" md-numeric="">
                        <md-button v-if="item.editmode" @click="salvar(item)" class="md-raised md-primary">Salvar</md-button>
                        <md-button v-if="!item.editmode" @click="editar(item)" class="md-raised md-primary">Editar</md-button>
                        <md-button v-else @click="cancelar(item)" class="md-raised md-primary">Cancelar</md-button>
                        <md-button @click="apagar(item)" class="md-raised md-accent">Apagar</md-button>
                    </md-table-cell>
                    <md-table-cell v-else md-numeric=""></md-table-cell>
                </md-table-row>
            </md-table>
        </div>
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
    current_user: false,
    album: {},
    musicas: [],
    reviews: [],
    form: {
      id: null,
      review: null,
      album: null,
      rank: 1
    },
    auth: {
      headers: {Authorization: 'Token '}
    }
  }),
  methods: {
    salvar: function (item) {
      this.auth.headers.Authorization += localStorage.getItem('token')
      this.form.album = this.getId
      this.form.user = parseInt(localStorage.getItem('current_user'))
      this.form.id = item.id

      this.$http.put('http://127.0.0.1:8000/albumreviews/' + this.getId + '/', item, this.auth).then((response) => {
        this.$set(item, 'editmode', false)
      }, (err) => {
        console.log(err)
      })
    },
    editar: function (item) {
      this.$set(item, 'editmode', true)
    },
    cancelar: function (item) {
      this.$set(item, 'editmode', false)
    },
    apagar (item) {
      this.auth.headers.Authorization += localStorage.getItem('token')
      this.form.id = item.id
      console.log(item)
      this.$http.delete('http://127.0.0.1:8000/albumreviews/' + item.id + '/', this.auth).then((response) => {
        let myArray = this.reviews.filter(function (obj) {
          return obj.id !== item.id
        })
        this.reviews = myArray
      }, (err) => {
        console.log(err)
      })
    },
    loadArtista: function () {
      this.$http.get('http://localhost:8000/albums/' + this.getId).then((response) => {
        this.album = response.data
        this.musicas = this.album.album_tracks
        this.reviews = this.album.album_reviews
        console.log(this.album)
      }, (err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.current_user = localStorage.getItem('current_user')
    this.loadArtista()
  }
}
</script>
