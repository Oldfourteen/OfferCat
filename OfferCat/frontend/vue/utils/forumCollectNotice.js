export const FORUM_COLLECT_NOTICE_EVENT = 'forum_collect_notice'

export function emitForumCollectNotice() {
	if (typeof uni !== 'undefined' && typeof uni.$emit === 'function') {
		uni.$emit(FORUM_COLLECT_NOTICE_EVENT)
	}
}
