export const modules = ['console']

// import all route in subfolder
// consoleRoutes: {
//     './console/{name}.ts': module
// }

// console
const consoleRoutes = import.meta.globEager('@/router/modules/console/*')
export const consoleRoutesArray = Object.keys(consoleRoutes).map(index => {
    const singleRoute = consoleRoutes[index]?.default
    return singleRoute
}).sort((a, b) => (a.meta.order > b.meta.order ? 1 : -1))

// auth
const authRoutes = import.meta.globEager('@/router/modules/auth/*')
export const authRoutesArray = Object.keys(authRoutes).map(index => authRoutes[index]?.default)
console.log(authRoutesArray)
