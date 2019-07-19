#!/usr/bin/env node

import fs from 'fs'
import {argv} from './argv'
import {read} from './read'


let writeBuffer = ''

walk(argv.sourceDir)
dealWithBuffer(writeBuffer)


function walk (path: string) {
	fs.readdirSync(path, {withFileTypes: true}).forEach((dirent) => {
		const direntPath = `${path}/${dirent.name}`
		
		if (dirent.isDirectory() && argv.recursive) {
			walk(direntPath)
			return
		}
		if (dirent.isFile()) {
			const output = read(fs.readFileSync(direntPath, 'utf8'))
			
			if (!output) {
				return
			}
		
			writeBuffer += argv.fileMarkings
				? `
// ------- FILE: ${direntPath}
${output}// ------- ENDFILE ${direntPath}\n`
				: `${output}\n`
		}
	})
}

function dealWithBuffer (buffer: string) {
	if (!argv.outputFile) {
		console.log(buffer)
		
		return
	}
	
	if (!argv.inject) {
		fs.writeFileSync(argv.outputFile, buffer)
		
		return
	}
	
	const outFile = fs.readFileSync(argv.outputFile, 'utf8')
	
	const injectPosition = outFile.indexOf(argv.injectString)
	
	if (injectPosition === -1) {
		throw new Error(`Inject string '${argv.injectString}' was not found in the output file.`)
	}
	
	fs.writeFileSync(argv.outputFile, outFile.replace(argv.injectString, buffer))
}

