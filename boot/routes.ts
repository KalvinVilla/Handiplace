/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import FindController from '#pages/find_controller'
import LandingController from '#pages/landing_controller'
import RequestController from '#pages/request_controller'

import LoginController from '#admin/auth/controllers/login_controller'
import ShowDashboardController from '#admin/dashboard/controllers/show_dashbaord_controller'

router.get('/', [LandingController, 'render'])
router.get('find', [FindController, 'render'])
router.get('/request', [RequestController, 'render'])

router
  .group(() => {
    router.get('/', [ShowDashboardController, 'render']).as('admin.dashboard')
    router.get('login', [LoginController, 'render']).as('admin.auth.login')
    router.post('login', [LoginController, 'execute']).as('auth.login')
  })
  .prefix('admin')
