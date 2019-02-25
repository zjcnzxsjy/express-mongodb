const restApi = {
    success(response) {
        return {
            code: 0,
            message:'Operate Succeed!',
            data: response || null
        }
    },
    failed(err) {
        return {
            code: 1,
            message:'Operate Failed!'
        }
    }
}
module.exports = restApi;