import {
	FieldArrayWithId,
	FieldErrors,
	UseFieldArrayRemove,
	UseFormRegister,
} from 'react-hook-form'
import { FormInputs } from './DynamicFormParser'

interface InputProps {
	field: FieldArrayWithId<FormInputs, 'inputs', 'id'>
	firstInputName: string
	inputsLength: number
	fieldsLength: number
	index: number
	inputsIndexesNumbersToDelete: number[]
	dynamicFormsCount: number
	errors: FieldErrors<FormInputs>
	register: UseFormRegister<FormInputs>
	remove: UseFieldArrayRemove
	setDynamicFormsCount: (value: number) => void
}

const Input = ({
	field,
	firstInputName,
	inputsLength,
	fieldsLength,
	index,
	inputsIndexesNumbersToDelete,
	dynamicFormsCount,
	errors,
	register,
	remove,
	setDynamicFormsCount,
}: InputProps) => {
	const handleRemoveForm = () => {
		remove(inputsIndexesNumbersToDelete)
		setDynamicFormsCount(dynamicFormsCount - 1)
	}

	return (
		<div>
			{fieldsLength > inputsLength &&
				field.name === firstInputName &&
				index !== 0 && (
					<button
						className='text-red-500 mt-6 mb-3'
						onClick={handleRemoveForm}
					>
						Удалить
					</button>
				)}
			<div className='flex flex-col gap-y-1'>
				<div className='flex items-center gap-x-3'>
					<input
						className='border border-black px-3 py-1.5'
						placeholder={field.placeholder ? field.placeholder : ''}
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
	)
}

export default Input
