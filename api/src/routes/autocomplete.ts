import { Router } from "express"
import Autocomplete from "../controllers/autocompleteController"

const router:Router = Router()

router.get('/autocomplete', Autocomplete.getAutocomplete);

module.exports = router;
