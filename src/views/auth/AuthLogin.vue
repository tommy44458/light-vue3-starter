<template>
	<div
		v-loading="isLogging"
		class="main-container overflow-hidden"
	>
		<ElContainer class="bg-fill-color">
			<ElContainer>
				<div
					class="flex h-full flex-col items-center justify-center pb-[110px]"
				>
					<ElImage
						class="mb-[36px] h-[50px] w-[50px]"
						:src="logoUrl"
						fill="scale-down"
					/>
					<ElCard
						class="w-[40vw] max-w-[480px] px-2"
						:class="{
							'!w-full': layoutStore.isMobile,
						}"
					>
						<p class="mb-3 text-xl font-bold">Log in</p>
						<p class="text-color-secondary mb-3 text-xs">
							We give you a wonderful experience.
						</p>
						<ElForm :model="authStore.userLogin">
							<div class="mb-3">
								<span class="mb-1 text-sm font-medium">
									Account
								</span>
								<ElFormItem>
									<ElInput
										data-qe-id="account-input"
										v-model="authStore.userLogin.account"
									/>
								</ElFormItem>
							</div>
							<div class="mb-4">
								<span class="mb-1 text-sm font-medium">
									Password
								</span>
								<ElFormItem prop="pass">
									<ElInput
										data-qe-id="password-input"
										v-model="authStore.userLogin.password"
										type="password"
										autocomplete="off"
										show-password
									/>
								</ElFormItem>
							</div>
							<ElRow class="flex-center mb-4">
								<ElCol :span="12">
									<div class="flex-center justify-start">
										<ElCheckbox
											v-model="authStore.isRememberMe"
											size="small"
											label="Remember me"
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
									data-qe-id="login-button"
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
				<ElFooter class="!h-8">
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
