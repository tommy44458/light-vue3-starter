import mqtt from 'mqtt'

interface MqttHook {
    disconnect: () => void,
    subscribe: (topicArray: string[], qos: mqtt.QoS) => void,
    unSubscribe: (unTopic: string) => void,
    publish: (topic: string, message: string, qos: mqtt.QoS) => void,
}

// eslint-disable-next-line no-restricted-globals
let mqttHost = location.href.split('/')[2]
if (process.env.MQTT_HOST !== 'localhost') {
    mqttHost = process.env.MQTT_HOST
}

const option: mqtt.IClientOptions = {
    protocol: 'ws',
    host: mqttHost,
    port: parseInt(process.env.MQTT_PORT, 10),
    clean: false,
    keepalive: 60,
    clientId: `mqtt_client_${Math.random().toString(16).substring(2, 10)}`,
    connectTimeout: 4000,
}

let client: mqtt.MqttClient | null = null

const messageEvent: any = {
    'dc:a6:32:6c:bc:b4/data_server/system_resource': (message: string) => {
        console.log('func', message)
    },
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
            console.log('from', topic, ': ', message.toString())
            // const res = JSON.parse(message.toString())
            if (topic in messageEvent) {
                messageEvent[topic](message)
            }
        }
    })
}

const onReconnect = () => {
    client.on('reconnect', (error: string) => {
        console.log('try to reconnect:', error)
    })
}

const connect = () => {
    client = mqtt.connect(option)
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

export const mqttHook = (): MqttHook => {
    if (client == null) {
        connect()
    }

    return {
        disconnect,
        subscribe,
        unSubscribe,
        publish,
    }
}

export const useMQTT = () => mqttHook()
