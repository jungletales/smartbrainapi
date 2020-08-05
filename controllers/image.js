const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '2bf733cbf91d4ff0be77ab73bd949981'
   });
const handleApiCall = (req, res)=> {
    app.models.predict(`c0c0ac362b03416da06ab3fa36fb58e3`, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(() => res.status(400).json('face not detected'))
}   
const handleImage = (req, res, db)=> {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0]);
    })
    .catch(() => res.status(400).json('unable to work with api'))
}
module.exports = {
  handleImage,
  handleApiCall
};