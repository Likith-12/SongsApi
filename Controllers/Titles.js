function getTitles(req,res){
    const titles = req.songs.map((s) => s.title)
    res.json(titles)
}

module.exports = {getTitles}