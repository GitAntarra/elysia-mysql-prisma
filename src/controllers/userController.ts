import Elysia from "elysia";


export const userController = new Elysia()
 .post('', async({set})=> {
    set.status = 201
    return {
        err: false,
        msg: 'ini post user',
        data: null
    }
 })
 .get('', async({set})=> {
    set.status = 200
    return {
        err: false,
        msg: 'ini get all user',
        data: null
    }
 })
 .get('/:username', async({set})=> {
    set.status = 200
    return {
        err: false,
        msg: 'ini get one user',
        data: null
    }
 })
 .put('/:username', async({set})=> {
    set.status = 201
    return {
        err: false,
        msg: 'ini update user',
        data: null
    }
 })
 .delete('/:username', async({set})=> {
    set.status = 201
    return {
        err: false,
        msg: 'ini hapus user',
        data: null
    }
 })