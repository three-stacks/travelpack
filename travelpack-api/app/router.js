'use strict';

const Nodal = require('nodal');
const router = new Nodal.Router();

/* Middleware */
/* executed *before* Controller-specific middleware */

const CORSMiddleware = Nodal.require('middleware/cors_middleware.js');
// const CORSAuthorizationMiddleware = Nodal.require('middleware/cors_authorization_middleware.js');
// const ForceWWWMiddleware = Nodal.require('middleware/force_www_middleware.js');
// const ForceHTTPSMiddleware = Nodal.require('middleware/force_https_middleware.js');

router.middleware.use(CORSMiddleware);
// router.middleware.use(CORSAuthorizationMiddleware);
// router.middleware.use(ForceWWWMiddleware);
// router.middleware.use(ForceHTTPSMiddleware);

/* Renderware */
/* executed *after* Controller-specific renderware */

const GzipRenderware = Nodal.require('renderware/gzip_renderware.js')

router.renderware.use(GzipRenderware);

/* Routes */

const IndexController = Nodal.require('app/controllers/index_controller.js');

/* generator: begin imports */

const V1PacksController = Nodal.require('app/controllers/v1/packs_controller.js');
const V1PhotosController = Nodal.require('app/controllers/v1/photos_controller.js');
const V1BudgetsController = Nodal.require('app/controllers/v1/budgets_controller.js');
const V1ItinerariesController = Nodal.require('app/controllers/v1/itineraries_controller.js');
const V1UsersController = Nodal.require('app/controllers/v1/users_controller.js');

/* generator: end imports */

router.route('/').use(IndexController);

/* generator: begin routes */

router.route('/v1/packs/{id}').use(V1PacksController);
router.route('/v1/photos/{id}').use(V1PhotosController);
router.route('/v1/budgets/{id}').use(V1BudgetsController);
router.route('/v1/itineraries/{id}').use(V1ItinerariesController);
router.route('/v1/users/{id}').use(V1UsersController);

/* generator: end routes */

module.exports = router;
