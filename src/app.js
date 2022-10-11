const yargs = require("yargs")
const { client , connection} = require("./db/connection")
const Movie = require("./utils")

const app = async (yargsObject) => {
    const collection = await connection()
    try {
        if (yargsObject.create) {
            const movie = new Movie(yargsObject.title, yargsObject.actor)
            await movie.create(collection)
            console.table(await movie.read(collection))
        } 
        else if (yargsObject.read) {
            const movie = new Movie(yargsObject.title, yargsObject.actor)
            console.table(await movie.read(collection))
        }
        else if (yargsObject.update) {
            const movie = new Movie(yargsObject.title, yargsObject.actor)
            await movie.update(collection)
            console.table(await movie.read(collection))
        }
        else if (yargsObject.delete) {
            const movie = new Movie(yargsObject.title, yargsObject.actor)
            await movie.delete(collection)
            console.table(await movie.read(collection))
        }
        else {
            console.log("Incorrect Command")
        }
        await client.close()
    } catch (error) {
        console.log(error)
        await client.close()
    }
}

app(yargs.argv)