export function successNotification(title: string, message: string) {
    ElNotification({
        title,
        message,
        type: 'success',
    })
}

export function errorNotification(title: string, message: string) {
    ElNotification({
        title,
        message,
        type: 'error',
    })
}

export function warningNotification(title: string, message: string) {
    ElNotification({
        title,
        message,
        type: 'warning',
    })
}
