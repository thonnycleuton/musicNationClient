import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Artista from '@/components/Artista'
import ArtistaAdd from '@/components/ArtistaAdd'
import MusicoAdd from '@/components/MusicoAdd'
import AlbumAdd from '@/components/AlbunsAdd'
import TrackAdd from '@/components/TracksAdd'
import Album from '@/components/Album'
import AlbumReview from '@/components/AlbumReview'
import Albums from '@/components/Albums'
import Login from '@/components/Login'
import Cadastro from '@/components/Cadastro'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'artistas',
      component: HelloWorld
    },
    {
      path: '/artistas/add',
      name: 'artista-add',
      component: ArtistaAdd
    },
    {
      path: '/musicos/add',
      name: 'musico-add',
      component: MusicoAdd
    },
    {
      path: '/artistas/:id',
      name: 'artista',
      component: Artista,
      props: true
    },
    {
      path: '/album/:id',
      name: 'album',
      component: Album,
      props: true
    },
    {
      path: '/album/:id/review',
      name: 'album-review',
      component: AlbumReview,
      props: true
    },
    {
      path: '/tracks/add',
      name: 'track-add',
      component: TrackAdd,
      props: true
    },
    {
      path: '/albums/',
      name: 'albums',
      component: Albums
    },
    {
      path: '/albums/add',
      name: 'album-add',
      component: AlbumAdd
    },
    {
      path: '/cadastro/',
      name: 'cadastro',
      component: Cadastro
    },
    {
      path: '/entrar/',
      name: 'login',
      component: Login,
      props: true
    }
  ]
})
