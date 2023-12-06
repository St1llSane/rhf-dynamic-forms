import { useState } from 'react'
import {
	useForm,
	type SubmitHandler,
	useFieldArray,
} from 'react-hook-form'
import Input from './Input'

interface DynamicFormParserProps {
	inputs: Input[]
}

interface Input {
	name: string
	value: string
	placeholder?: string
}

export interface FormInputs {
	inputs: Input[]
}

const DynamicFormParser = ({ inputs }: DynamicFormParserProps) => {
	const [dynamicFormsCount, setDynamicFormsCount] = useState<number>(1)

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormInputs>({
		defaultValues: {
			inputs: inputs,
		},
	})

	const { fields, append, remove } = useFieldArray({
		name: 'inputs',
		control,
		rules: {
			required: {
				value: true,
				message: 'Phone number field is required.',
			},
		},
	})

	const firstInputName = inputs[0].name

	const inputsLength = inputs.length
	console.log(
		'🚀 ~ file: DynamicFormParser.tsx:51 ~ DynamicFormParser ~ inputsLength:',
		inputsLength,
	)
	const fieldsLength = fields.length
	console.log(
		'🚀 ~ file: DynamicFormParser.tsx:53 ~ DynamicFormParser ~ fieldsLength:',
		fieldsLength,
	)
	const inputsPartsNumber =
		inputsLength === fieldsLength
			? fieldsLength
			: fieldsLength / inputsLength

	// const inputsIndexesToDelete = Object.keys(fields).slice(inputsParts)
	const inputsIndexesToDelete =
		Object.keys(fields).slice(inputsPartsNumber)
	const inputsIndexesNumbersToDelete = inputsIndexesToDelete.map((index) =>
		Number(index),
	)
	console.log(
		'🚀 ~ file: DynamicFormParser.tsx:63 ~ DynamicFormParser ~ inputsIndexesNumbersToDelete:',
		inputsIndexesNumbersToDelete,
	)

	const handleAppendForm = () => {
		const arrayToAppend = fields.map((_, ii) => ({
			name: inputs[ii].name,
			value: '',
			placeholder: `${inputs[ii].placeholder} ${dynamicFormsCount}`,
		}))
		console.log(
			'🚀 ~ file: DynamicFormParser.tsx:107 ~ DynamicFormParser ~ arrayToAppend:',
			arrayToAppend,
		)

		append(arrayToAppend)

		setDynamicFormsCount((prev) => prev + 1)
		// console.log('dynamicFormsCount', dynamicFormsCount)
		// console.log('fields', fields)
	}

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		console.log('data', data)
	}

	return (
		<div className='h-screen flex items-center justify-center'>
			<form
				className='flex flex-col gap-y-5 w-96'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					<label>List of inputs</label>
					<div className='flex flex-col gap-y-3 w-[inherit] mt-2'>
						{fields.map((field, index) => (
							<Input
								field={field}
								firstInputName={firstInputName}
								inputsLength={inputsLength}
								fieldsLength={fieldsLength}
								index={index}
								inputsIndexesNumbersToDelete={inputsIndexesNumbersToDelete}
								dynamicFormsCount={dynamicFormsCount}
								errors={errors}
								register={register}
								remove={remove}
								setDynamicFormsCount={setDynamicFormsCount}
								key={field.id}
							/>
						))}
					</div>
				</div>

				<button
					className='border border-black w-fit px-3 py-1.5 bg-blue-200'
					type='button'
					onClick={handleAppendForm}
				>
					Добавить еще одну форму
				</button>
				<button
					className='border border-black px-3 py-1.5 bg-green-200 mt-5'
					type='submit'
				>
					Отправить
				</button>
			</form>
		</div>
	)
}

export default DynamicFormParser
