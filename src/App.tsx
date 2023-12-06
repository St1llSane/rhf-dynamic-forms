import './index.css'
import DynamicFormParser from './DynamicFormParser'
import { inputs } from './constants/constants'

export default function App() {
	return (
		<div>
			<DynamicFormParser inputs={inputs} />
		</div>
	)
}
