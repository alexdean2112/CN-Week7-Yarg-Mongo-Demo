class Movie {
    constructor(title, actor = "Not Specified") {
        this.title = title
        this.actor = actor
    } 
    async create (collection) {
        await collection.insertOne(this)
    }
    async read (collection) {
        return await collection.find({}).toArray()
    }
    async update (collection) {
        await collection.updateOne(
            {"title": this.title},
            { $set: {title: this.title, actor: this.actor}}
            )
    }
    async delete (collection) {
        await collection.deleteOne(this)
    }
}

module.exports = Movie