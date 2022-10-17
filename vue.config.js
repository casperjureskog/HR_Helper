// module.exports = {
//     devServer: {
//         proxy: {
//             '/V1': {
//                 target: 'http://localhost:8080',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/V1': ''
//                 }
//             },
//             '/V2': {
//                 target: 'https://node-api-to-do.herokuapp.com/users',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/V2': ''
//                 }
//             },

//         }
//     }
// }