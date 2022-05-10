const Clarifai = require ('clarifai');

const app = new Clarifai.App({
  apiKey: 'e594d36be009441a97f520c9e27c3c88'
 });

const handleApiCall = (req, res) => {
   app.models
     .predict( Clarifai.FACE_DETECT_MODEL, req.body.input )
     .then(data => {
        res.json(data);
     })
     .catch(err => res.status(400).json('unable to get api'))
}

const handleImage = (req, res, db) => {
   const {id} = req.body;
   db('users').where('id', '=', id)
   .increment('entries',1)
   .returning('entries')
   .then(entries => {
      res.json(entries[0].entries);
   })
   .catch(err => res.status(400).json('unable to get entreis'))
} 


module.exports ={
   handleImage,
   handleApiCall
};