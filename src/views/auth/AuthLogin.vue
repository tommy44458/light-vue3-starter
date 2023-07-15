<template>
	<div
		v-loading="isLogging"
		class="main-container overflow-hidden"
	>
		<ElContainer class="bg-fill-color">
			<ElContainer>
				<div
					class="h-full flex flex-col justify-center items-center pb-110px"
				>
					<ElImage
						class="h-100px mb-36px"
						:src="logoUrl"
						fill="scale-down"
					/>
					<ElCard
						class="w-40vw max-w-480px px-8px"
						:class="{
							'!w-full': layoutStore.isMobile,
						}"
					>
						<p class="text-20px leading-28px font-700" w:mb="12px">
							Log in
						</p>
						<p
							class="text-color-secondary text-12px leading-20px"
							w:mb="12px"
						>
							We give you a wonderful experience experiment.
						</p>
						<ElForm :model="authStore.userLogin">
							<div w:mb="12px">
								<p class="text-14px font-500" w:mb="4px">
									Account
								</p>
								<ElFormItem>
									<ElInput
										v-model="authStore.userLogin.account"
									/>
								</ElFormItem>
							</div>
							<div w:mb="16px">
								<p class="text-14px font-500" w:mb="4px">
									Password
								</p>
								<ElFormItem prop="pass">
									<ElInput
										v-model="authStore.userLogin.password"
										type="password"
										autocomplete="off"
										show-password
									/>
								</ElFormItem>
							</div>
							<ElRow w:mb="16px">
								<ElCol :span="12">
									<div class="flex-center justify-start">
										<ElCheckbox
											v-model="authStore.isRememberMe"
											size="small"
											label="Remember me"
											@change="
												authStore.rememberMeOrNot()
											"
										/>
									</div>
								</ElCol>
								<ElCol :span="12">
									<div class="flex-center justify-end">
										<ElButton
											type="primary"
											class="!p-0"
											size="small"
											link
										>
											Forgot password
										</ElButton>
									</div>
								</ElCol>
							</ElRow>
							<ElFormItem>
								<ElButton
									type="primary"
									class="w-full"
									@click="submitForm()"
								>
									Log in
								</ElButton>
							</ElFormItem>
						</ElForm>
					</ElCard>
				</div>
				<ElFooter class="!h-32px">
					<LayoutFooter />
				</ElFooter>
			</ElContainer>
		</ElContainer>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/modules/auth'
import { useLayoutStore } from '@/store/modules/layout'
import logoUrl from '@/assets/logo.png'

const router = useRouter()
const authStore = useAuthStore()
const layoutStore = useLayoutStore()

const isLogging = ref(false)

const submitForm = async () => {
	const interval = setTimeout(() => {
		authStore.clearLoginInfo()
		isLogging.value = false
		ElNotification({
			message: 'Login failed, please refresh page and try again.',
			position: 'bottom-right',
			type: 'error',
		})
	}, 10000)
	if (authStore.login(authStore.userLogin)) {
		clearInterval(interval)
		router.push('/console/task')
	}
	isLogging.value = false
}

const keypressEvent = async (e: KeyboardEvent) => {
	if (e.key === 'Enter') {
		isLogging.value = true
		await submitForm()
	}
}

onMounted(async () => {
	if (authStore.getCurrentAccount()) {
		router.push('/console/task')
	} else {
		authStore.initLoginForm()
	}
	document.addEventListener('keypress', keypressEvent)
})

onUnmounted(() => {
	document.removeEventListener('keypress', keypressEvent)
})
</script>
