<template>
	<ElRow :gutter="20" class="h-screen w-full">
		<ElCol :span="6"> </ElCol>
		<ElCol :span="12">
			<template class="h-full flex-center">
				<ElCard class="w-400px p-10px">
					<el-space :fill="true" :size="20" wrap>
						<div class="flex-center">
							<ElImage
								class="h-50px"
								src="/src/assets/icon/logo.svg"
								fill="scale-down"
							/>
						</div>
						<ElForm :model="reactiveForm" label-width="100px">
							<ElFormItem label="Account">
								<ElInput v-model="reactiveForm.account" />
							</ElFormItem>
							<ElFormItem label="Password" prop="pass">
								<ElInput
									v-model="reactiveForm.password"
									type="password"
									autocomplete="off"
								/>
							</ElFormItem>
							<ElFormItem>
								<ElButton
									type="primary"
									@click="submitForm(reactiveForm)"
								>
									Login
								</ElButton>
								<ElButton @click="resetForm(reactiveForm)">
									Reset
								</ElButton>
							</ElFormItem>
						</ElForm>
					</el-space>
				</ElCard>
			</template>
		</ElCol>
		<ElCol :span="6" />
	</ElRow>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/modules/auth.ts'

const router = useRouter()
const authStore = useAuthStore()

const reactiveForm = reactive({
	account: '',
	password: '',
})

const submitForm = async () => {
	await authStore.login(reactiveForm)
	const currentAccount = authStore.getCurrentAccount()

	if (currentAccount != null) {
		ElMessage.success(`Wellcome, ${currentAccount}.`)
		router.push('/console/device')
	} else {
		ElMessage.error('Oops, your account or password are wrong.')
	}
}
const resetForm = () => {
	reactiveForm.account = ''
	reactiveForm.password = ''
}
</script>
