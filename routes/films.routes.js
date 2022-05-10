import {Router} from 'express'
import * as films from '../controllers/films.controlles.js'
const router=Router();

router.route("/films").get(films.getAllMovies)
router.route("/films/category/:category").get(films.getAllMoviesbycat)
router.route("/films/:pagination").get(films.getMovies)
router.route("/films/category/:category/:pagination").get(films.getMoviesbycat)
router.route("/films/pagination/:category/total").get(films.totalPaginationMovies)

export default router