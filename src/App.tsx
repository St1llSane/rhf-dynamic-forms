import DynamicFormParser from './DynamicFormParser'
import { inputs } from './constants/constants'
import './index.css'

export default function App() {
	return (
		<div>
			<DynamicFormParser inputs={inputs} />
		</div>
	)
}
