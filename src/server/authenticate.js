import uuid from 'uuid'
import md5 from 'md5'
import { connectDB } from './connect-db'

let authenticationToken = [];

let assembleUserState = async user => {
    let db= await connectDB();
    let tasks= await db.collection(`tasks`).find({owner:user.id}).toArray();
    let groups= await db.collection(`groups`).find({owner:user.id}).toArray();
    return{
        tasks,
        groups,
        session:{authenticated:`AUTHENTICATED`,id:user.id}
    }

}

export const authenticationRoute = app => {
    app.post('/authenticate', async (req, res) => {
        let { username, password } = req.body;
        let db = await connectDB();
        let collection =await db.collection(`users`)
        let user = await collection.findOne({ name: username })
        console.log('hangi user', user)
        if (!user) {
            res.status(500).send('user not found')
        }
        let hash = md5(password)
        let passwordCorrect = hash === user.passwordHash
        if (!passwordCorrect) {
            res.status(500).send('password not correct')
        }
        let token = uuid();
        authenticationToken.push({
            token,
            userId: user.id
        })
        let state = await assembleUserState(user)
        res.send({ token, state })
    })

}