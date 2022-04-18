export const modules = ['console']

// import all route in subfolder
// consoleRoutes: {
//     './console/{name}.ts': module
// }
const consoleRoutes = import.meta.globEager('@/router/modules/console/*')

export const consoleRoutesArray = Object.keys(consoleRoutes).map(index => {
    const singleRoute = consoleRoutes[index]?.default
    return singleRoute
}).sort((a, b) => (a.meta.order > b.meta.order ? 1 : -1))
