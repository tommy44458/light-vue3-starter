# A LIGHT Vue3 Starter Admin Template.

<p align="center">  
    <img src="https://img.shields.io/badge/-Vue3-34495e?logo=vue.j" />
    <img src="https://img.shields.io/badge/-Vite2.7-646cff?logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/-Pinia-yellow?logo=picpay&logoColor=white" />
	<img src="https://img.shields.io/badge/-Windicss-blue?logo=Windicss&logoColor=white">
    <img src="https://img.shields.io/badge/-ESLint-4b32c3?logo=eslint&logoColor=white" />
    <img src="https://img.shields.io/badge/-Prettier-ef9421?logo=Prettier&logoColor=white">
	<img src="https://img.shields.io/badge/-ElementPlus-blue?logo=ElementPlus&logoColor=white">
<p> 

This template should help get you started developing with Vue3, Pinia, WindiCSS, ElementPlus, Mqtt and TypeScript in Vite. The template uses Vue3 `<script setup>` SFCs. Also, this template also supports MQTT so that it can easily become a control system for IoT devices.

![image](https://github.com/tommy44458/vue3-vite-pinia-windi-mqtt-starter/blob/main/src/assets/demo_page1.png)

### Check out the [Online DEMO](https://light-vue3-starter-tommy44458.vercel.app/).

```sh
// login info
Account: tommy
Password: tommy
```

## This starter template includes:

-   [Vue 3](https://vuejs.org/guide/introduction.html)
-   [Vite](https://vitejs.dev/guide/)
-   [Pinia](https://pinia.vuejs.org/)
-   [WindiCSS](https://windicss.org/)
-   [Vue Router](https://github.com/vuejs/router)
-   [ElementPlus UI](https://element-plus.org/en-US/)
-   [Stylus](https://github.com/stylus/stylus)
-   [Stylelint](https://github.com/stylelint/stylelint)
-   [Eslint](https://eslint.org/)
-   [eslint-config-airbnb-typescript](https://github.com/iamturns/eslint-config-airbnb-typescript)
-   [mqtt-vue-hook](https://github.com/tommy44458/mqtt-vue-hook)

## Collaboration-code specification
Many tech teams generally use [Airbnb](https://github.com/airbnb/javascript) to constrain code specifications at present.
- Through `pre-commit` to implement  lint check,unit test,code formatting,etc.。 
- Combined with the VsCode（formatting automatically when saving：editor.formatOnSave: true）
- Combined with the Git hooks（execute before commit：pre-commit => yarn lint）
- IDE configuration（`.editorconfig`）,ESLint configuration（`.eslintrc.js` 和 `.eslintignore`）,StyleLint configuration（`.stylelintrc`, `.stylelintignore`）,for details, please refer to the corresponding configuration file。  

Close code specification 
add `.eslintignore`  and  `.stylelintignore`  to `src/`  directory respectively to ignore 

## Recommended IDE Setup

-   [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Support MQTT client
	
#### src/main.ts
``` ts
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// protocol = 'wss', 'ws', 'mqtt', ...
// host = ip or domain
// port = 8083, 1883, ...
import mqttVueHook from 'mqtt-vue-hook'
// app.use(mqttVueHook, options)
app.use(mqttVueHook, `${protocol}://${host}:${port}`, {
  clean: false,
  keepalive: 60,
  clientId: `mqtt_client_${Math.random().toString(16).substring(2, 10)}`,
  connectTimeout: 4000,
})
```
	
#### views/console/ConsolePage1.vue
	
``` vue
<script setup lang="ts">
import { useMQTT } from 'mqtt-vue-hook'

const mqttHook = useMQTT()

const form = reactive({
	// ...data
})

const mqttSubscribe = () => {
	mqttHook.subscribe(['+/vue3/starter/console/page1'], 1)

	// if receive mes from '+/vue3/starter/console/page1' before excute callback function.
	mqttHook.registerEvent(
		'+/vue3/starter/console/page1',
		// callback funtion
		(topic: string, message: string) => {
			const mesJson = JSON.parse(message.toString())
			ElNotification({
				title: `MQTT TOPIC: ${topic}`,
				message: mesJson,
				type: 'info',
			})
		},
		'key',
	)
}

const onPublish = () => {
	mqttHook.publish(
		'tommy44458/vue3/starter/console/page1',
		JSON.stringify({
			// ...form.data
		}),
	)
}

onMounted(() => {
	mqttSubscribe()
})

onUnmounted(() => {
	// remove Event by topic and key
	mqttHook.unRegisterEvent('+/vue3/starter/console/page1', 'key')
	mqttHook.unSubscribe('+/vue3/starter/console/page1')
})
```

## Getting Started

#### Install

```sh
yarn install
```

#### Dev

```sh
yarn dev
```

#### Build

```sh
yarn build
```

#### Syntax check

```sh
// eslint
yarn lint
// stylelint
yarn lint:style
```
