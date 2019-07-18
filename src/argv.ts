import yargs from 'yargs'
import {FILE_IGNORE_STRING, INJECT_STRING} from 'const'


export const argv = yargs
	.option(
		'sourceDir',
		{
			alias: 'd',
			type: 'string',
			description: 'Source directory',
			demandOption: 'You need to specify the source directory',
		}
	)
	.option(
		'outputFile',
		{
			alias: 'o',
			type: 'string',
			description: 'Output file',
		}
	)
	.option(
		'inject',
		{
			alias: 'i',
			type: 'boolean',
			description: 'Whether the output should be injected into the output file',
			implies: 'outputFile',
		}
	)
	.option(
		'injectString',
		{
			alias: 's',
			type: 'string',
			description: 'A string in the output file that marks where the output should be injected',
			default: INJECT_STRING,
		}
	)
	.option(
		'ignoreComment',
		{
			alias: 'c',
			type: 'string',
			description: 'A line marking that the file should be ignored',
			default: FILE_IGNORE_STRING,
		}
	)
	.option(
		'recursive',
		{
			alias: 'r',
			type: 'boolean',
			description: 'Whether the source files should be walked recursively',
			default: true,
		}
	)
	.option(
		'fileMarkings',
		{
			alias: 'm',
			type: 'boolean',
			description: 'Whether output shoud show which files the enums come from',
			default: true,
		}
	)
	.epilogue('❤')
	.parse()
