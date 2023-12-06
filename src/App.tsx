import {
	useForm,
	type SubmitHandler,
	useFieldArray,
} from 'react-hook-form'
import './index.css'

type Inputs = {
	inputs: {
		documentType: string
		placeholder: string
	}[]
	// number: {
	// 	value: string | undefined
	// 	placeholder: string | undefined
	// }
	// phoneNumber: {
	// 	value: string | undefined
	// 	placeholder: string | undefined
	// }
}

// const inputs = [
// 	{
// 		series: {
// 			value: '',
// 			placeholder: '',
// 		},
// 		number: {
// 			value: '',
// 			placeholder: '',
// 		},
// 		phoneNumber: {
// 			value: '',
// 			placeholder: '',
// 		},
// 	},
// ]

export default function App() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: {
			inputs: [
				{ documentType: '', placeholder: 'placeholder' },
				// {
				// name: 'typeOfMarriageDocument',
				// label: 'Тип документа',
				// required: false,
				// placeholder: 'Тип документа',
				// },
				// {
				// name: 'numberOfMarriageDocument',
				// label: 'Номер',
				// required: false,
				// placeholder: 'Номер',
				// },
			],
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
	console.log('🚀 ~ file: App.tsx:80 ~ App ~ fields:', fields)

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data)
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
								<div className='flex items-center gap-x-3'>
									<input
										className='border border-black px-3 py-1.5'
										placeholder={`${field.placeholder} ${index}`}
										type='text'
										{...register(`inputs.${index}.documentType`, {
											required: 'Phone number field is required.',
										})}
									/>
									{fields && fields.length > 1 && index !== 0 && (
										<button
											className='text-red-500'
											onClick={() => remove(index)}
										>
											Удалить
										</button>
									)}
								</div>
								<span className='text-red-500'>
									{errors?.inputs?.[index]?.documentType?.message}
								</span>
							</div>
						))}
					</div>
				</div>

				<button
					className='border border-black px-3 py-1.5 bg-blue-200'
					type='button'
					onClick={() =>
						append({ documentType: '', placeholder: 'placeholder' })
					}
				>
					Добавить ещ е одну форму
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
