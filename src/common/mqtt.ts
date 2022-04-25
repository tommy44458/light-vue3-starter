import mqtt from 'mqtt'

interface MqttHook {
    disconnect: () => void,
    subscribe: (topicArray: string[], qos?: mqtt.QoS) => void,
    unSubscribe: (unTopic: string) => void,
    publish: (topic: string, message: string, qos?: mqtt.QoS) => void,
    registerEvent: (topic: string, callback: (topic: string, message: string) => void, vm?: any) => void,
    unRegisterEvent: (topic: string, vm?: any) => void,
    clearEvent: () => void,
}

interface Listener {
    callback: (topic: string, message: string) => void
    vm: any
}

// eslint-disable-next-line no-restricted-globals
const mqttHost = location.href.split('/')[2]

const option: mqtt.IClientOptions = {
    protocol: 'ws',
    host: mqttHost,
    port: parseInt(process.env.VITE_MQTT_PORT, 10),
    clean: false,
    keepalive: 60,
    clientId: `mqtt_client_${Math.random().toString(16).substring(2, 10)}`,
    connectTimeout: 4000,
}

if (process.env.VITE_MQTT_HOST !== 'localhost' && process.env.VITE_MQTT_HOST != null) {
    option.host = process.env.VITE_MQTT_HOST
}

let client: mqtt.MqttClient | null = null

const messageListeners = new Map()

const eq = (str1: string, str2: string) => {
    let arr1 = str1.split('/')
    let arr2 = str2.split('/')
    if (!str1.includes('#') && !str2.includes('#') && arr1.length !== arr2.length) {
        return false
    }
    if (arr2.length < arr1.length) {
        arr2 = str1.split('/')
        arr1 = str2.split('/')
    }
    let ret = true
    arr1.forEach((val, i) => {
        if (val === '+' || val === '#'
            || (arr2[i] && arr2[i] === '+')
            || (arr2[i] && arr2[i] === '#')
            || (arr2[i] && arr2[i] === val)) {
            return
        }
        ret = false
    })
    return ret
}

const onConnectFail = () => {
    client.on('error', error => {
        console.log('connect fail', error)
        client.end()
    })
}

const onMessage = () => {
    client.on('message', (topic: string, message: string) => {
        if (message) {
            messageListeners.forEach((listeners, key) => {
                if (eq(topic, key) && listeners && listeners.length) {
                    listeners.forEach((listener: Listener) => {
                        listener.callback(topic, message)
                    })
                }
            })
        }
    })
}

const onReconnect = () => {
    client.on('reconnect', (error: string) => {
        console.log('try to reconnect:', error)
    })
}

const connect = () => {
    client = mqtt.connect(`${option.protocol}://${option.host}:${option.port}`, option)
    client.on('connect', e => {
        console.log('success connect to host:', e)
    })
    onMessage()
    onReconnect()
    onConnectFail()
}

const disconnect = () => {
    client.end()
    client = null
    console.log('mqtt disconnected')
}

const subscribe = (topicArray: string[], qos: mqtt.QoS = 1) => {
    client.subscribe(topicArray, { qos })
}

const unSubscribe = (unTopic: string) => {
    client.unsubscribe(unTopic, (error: string) => {
        console.log(`unsubscribe: ${unTopic}`, error)
    })
}

const publish = (topic: string, message: string, qos: mqtt.QoS = 0) => {
    if (!client.connected) {
        console.log('client is disconnected')
    } else {
        client.publish(topic, message, { qos })
    }
}

const registerEvent = (topic: string, callback: (topic: string, message: string) => void, vm: any | null = null) => {
    if (typeof callback === 'function') {
        messageListeners.has(topic) || messageListeners.set(topic, [])
        messageListeners.get(topic).push({ callback, vm })
    }
}

const unRegisterEvent = (topic: string, vm: any | null = null) => {
    const listeners = messageListeners.get(topic)
    let index = -1

    if (listeners && listeners.length) {
        listeners.forEach((i: number, element: Listener) => {
            if (typeof element.callback === 'function' && element.vm === vm) {
                index = i
            }
        })

        if (index > -1) {
            listeners.splice(index, 1)
            messageListeners.set(topic, listeners)
        }
    }
}

const clearEvent = () => {
    messageListeners.clear()
}

export const mqttHook = (): MqttHook => {
    if (client == null) {
        connect()
    }

    return {
        disconnect,
        subscribe,
        unSubscribe,
        publish,
        registerEvent,
        unRegisterEvent,
        clearEvent,
    }
}

export const useMQTT = () => mqttHook()
