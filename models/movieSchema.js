import Mongo from '../service/dbService.js';

const movieSchema = new Mongo.Schema(
    {
    email: {type: String, unique: true, required: true},
    movie: {type: [{
         name: {type: String, required: true},
         description: {type: String, required: true},
         urlImg: {type: String, required: true}
    }]}
    }
    )

const dataMovie = Mongo.model('Favorite', movieSchema);

export default dataMovie;