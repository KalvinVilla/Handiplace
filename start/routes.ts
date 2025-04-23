/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const FindController = () => import('#pages/find_controller')
const LandingController = () => import('#pages/landing_controller')
const RequestController = () => import('#pages/request_controller')
const PlaceController = () => import('#places/controllers/place_controller')

const LoginController = () => import('#admin/auth/controllers/login_controller')
const ShowDashboardController = () =>
  import('#admin/dashboard/controllers/show_dashbaord_controller')
const LangController = () => import('#i18n/controllers/locale_controller')

router.post('lang', [LangController, 'execute']).as('lang')

router.get('/', [LandingController, 'render'])
router.get('find', [FindController, 'render'])
router.get('/request', [RequestController, 'render'])
router.get('/place/:id', [PlaceController, 'render']).as('request.edit')

router
  .group(() => {
    router.get('/', [ShowDashboardController, 'render']).as('admin.dashboard')
    router.get('login', [LoginController, 'render']).as('admin.auth.login')
    router.post('login', [LoginController, 'execute']).as('auth.login')
  })
  .prefix('admin')

// FRAGMENT
const SearchPlaceFragment = () => import('#fragments/search_place')

router.get('fragments/places', [SearchPlaceFragment, 'handle']).as('fragments.places')
