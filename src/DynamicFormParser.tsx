import { useState } from 'react'
import {
	useForm,
	type SubmitHandler,
	useFieldArray,
} from 'react-hook-form'

interface DynamicFormParserProps {
	inputs: Input[]
}

interface Input {
	name: string
	value: string
	placeholder?: string
}

interface FormInputs {
	inputs: Input[]
}

const DynamicFormParser = ({ inputs }: DynamicFormParserProps) => {
	const [dynamicFormsCount, setDynamicFormsCount] = useState(1)

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

	const {
		fields,
		append,
		// remove
	} = useFieldArray({
		name: 'inputs',
		control,
		rules: {
			required: {
				value: true,
				message: 'Phone number field is required.',
			},
		},
	})
	// console.log('🚀 ~ file: App.tsx:80 ~ App ~ fields:', fields)

	const inputsLength = inputs.length
	const fieldsLength = fields.length
	const inputsParts = fieldsLength / inputsLength
	console.log(
		'🚀 ~ file: DynamicFormParser.tsx:26 ~ DynamicFormParser ~ inputsParts:',
		inputsParts
	)

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
							<div key={field.id}>
								{/* {fields &&
									fields.length > inputs.length &&
									index > inputs.length - 1 && (
										<button
											className='text-red-500'
											onClick={() => {
												remove([2, 3])
												setDynamicFormsCount((prev) => prev - 1)
											}}
										>
											Удалить
										</button>
									)} */}
								<div className='flex flex-col gap-y-1'>
									<div className='flex items-center gap-x-3'>
										<input
											className='border border-black px-3 py-1.5'
											placeholder={
												field.placeholder ? field.placeholder : ''
											}
											type='text'
											{...register(`inputs.${index}.value`, {
												required: 'This field is required.',
											})}
										/>
									</div>
									<span className='text-red-500'>
										{errors?.inputs?.[index]?.value?.message}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>

				<button
					className='border border-black w-fit px-3 py-1.5 bg-blue-200'
					type='button'
					onClick={() => {
						append([
							{
								name: inputs[0].name,
								value: '',
								placeholder: `${inputs[0].placeholder} ${dynamicFormsCount}`,
							},
							{
								name: inputs[1].name,
								value: '',
								placeholder: `${inputs[1].placeholder} ${dynamicFormsCount}`,
							},
						])

						setDynamicFormsCount((prev) => prev + 1)
						// console.log('dynamicFormsCount', dynamicFormsCount)
						// console.log('fields', fields)
					}}
				>
					Добавить еще одну форму
				</button>
				<button
					className='border border-black px-3 py-1.5 bg-green-200 mt-5'
					type='submit'
					onClick={() => {
						console.log('fields', fields)
					}}
				>
					Отправить
				</button>
			</form>
		</div>
	)
}

export default DynamicFormParser
