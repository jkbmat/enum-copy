import {FILE_IGNORE_STRING} from 'const'


export function read(file: string) {
	let writeBuffer = ''
	let isInCommentedBlock = false
	let isInEnumBlock = false
	
	if (file.startsWith(FILE_IGNORE_STRING)) {
		return ''
	}
	
	file.split(/\r?\n|\r/).forEach((line) => {
		let oneLine = line.trim()
		
		tryEndMultilineComment()
		
		if (isInCommentedBlock) {
			return
		}
		
		removePairedMultilineComments()
		
		if (oneLine.includes('//')) {
			oneLine = oneLine.slice(0, oneLine.indexOf('//'))
		}
		if (oneLine.includes('/*')) {
			oneLine = oneLine.slice(0, oneLine.indexOf('/*'))
			isInCommentedBlock = true
		}
		
		oneLine = oneLine.trim()
		
		if (!oneLine) {
			return
		}
		
		if (!isInEnumBlock) {
			if (oneLine.startsWith('export enum') || oneLine.startsWith('export const enum')) {
				oneLine = oneLine.slice('export '.length)
				isInEnumBlock = true
			}
		}
		
		
		if (isInEnumBlock) {
			writeBuffer += oneLine + '\n'
		}
		
		if (oneLine.startsWith('}')) {
			isInEnumBlock = false
		}
		
		
		function tryEndMultilineComment() {
			if (isInCommentedBlock && oneLine.includes('*/')) {
				oneLine = oneLine.slice(oneLine.indexOf('*/') + 2)
				isInCommentedBlock = false
			}
		}
		
		function removePairedMultilineComments() {
			while (oneLine.includes('/*') && oneLine.includes('*/', oneLine.indexOf('/*'))) {
				oneLine = oneLine.slice(oneLine.indexOf('/*'), oneLine.indexOf('*/', oneLine.indexOf('/*')) + 2)
			}
		}
	})
	
	return writeBuffer
}
