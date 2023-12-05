import {
	useForm,
	type SubmitHandler,
	useFieldArray,
} from 'react-hook-form'
import './index.css'

// type Inputs = {
// 	inputs: (
// 		| {
// 				documentType: string
// 				placeholder: string
// 		  }
// 		| {
// 				number: string
// 				placeholder: string
// 		  }
// 	)[]
// }
type Inputs = {
	inputs: {
		value: string
		placeholder: string
	}[]
}

const inputs = [
	{ value: '', placeholder: 'Number' },
	{ value: '', placeholder: 'Seria' },
]

export default function App() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<Inputs>({
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
	// console.log('🚀 ~ file: App.tsx:80 ~ App ~ fields:', fields)

	const onSubmit: SubmitHandler<Inputs> = (data) => {
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
							<div className='flex flex-col gap-y-1' key={field.id}>
								{/* <>{console.log('field', field)}</> */}
								<div className='flex items-center gap-x-3'>
									<input
										className='border border-black px-3 py-1.5'
										placeholder={field.placeholder}
										type='text'
										{...register(`inputs.${index}.value`, {
											required: 'This field is required.',
										})}
									/>
									{fields &&
										fields.length > inputs.length &&
										index > inputs.length - 1 && (
											<button
												className='text-red-500'
												onClick={() => remove(index)}
											>
												Удалить
											</button>
										)}
								</div>
								<span className='text-red-500'>
									{errors?.inputs?.[index]?.value?.message}
								</span>
							</div>
						))}
					</div>
				</div>

				<button
					className='border border-black px-3 py-1.5 bg-blue-200'
					type='button'
					onClick={() =>
						append([
							{
								value: '',
								placeholder: `${inputs[0].placeholder} 1`,
							},
							{ value: '', placeholder: `${inputs[1].placeholder} 1` },
						])
					}
				>
					Добавить еще одну форму
				</button>
				<button
					className='border border-black px-3 py-1.5 bg-green-200'
					type='submit'
				>
					Отправить
				</button>
			</form>
		</div>
	)
}
