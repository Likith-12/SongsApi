function getArtists(req, res){
    const artists = req.songs.map((s) => s.artist)
    res.json(artists)
}

module.exports = {getArtists}