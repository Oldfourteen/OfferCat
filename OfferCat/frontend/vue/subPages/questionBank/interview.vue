<template>
	<QuestionBankPageShell :theme="theme" page-type="interview" :refresh-seed="refreshSeed" />
</template>

<script>
	import QuestionBankPageShell from './components/QuestionBankPageShell.vue'
	import themeMixin from '@/utils/themeMixin.js'

	export default {
		mixins: [themeMixin],
		components: {
			QuestionBankPageShell
		},
		data() {
			return {
				refreshSeed: 0
			}
		},
		onShow() {
			this.refreshSeed += 1
		}
	}
</script>
