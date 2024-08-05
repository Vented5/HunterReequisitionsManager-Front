"use client"
import React, {useContext} from 'react'
import '../public/styles/StepsProgressBar.css'

import {ReqContext} from '../app/RequestsG/page.jsx'

export default function StepsProgressBar() {

	const { selectedRequest } = useContext(ReqContext)
	const status = selectedRequest.status

	let className = ''
	const steps = ['requested', 'validated', 'shipped', 'completed']
	const nodo = []
	let bool = false

	for (let i = 0; i < 4; i++) {
		if(status != steps[i] && !bool ){
			className = 'stepper-item completed'
		}else if(status === steps[i]){
			bool = true
			className = 'stepper-item completed'
		}else {
			className = 'stepper-item'
		}
		if(status === steps[i-1] ){
			className = 'stepper-item active'
		}
		nodo[i] = <div key={i} className={className}>
		    <div className="step-counter">{i+1}</div>
		    <div className="step-name">{steps[i]}</div>
		  </div>

		if(status === 'denied') {
			bool = true
			nodo[1] = <div key={'denied' + toString(i)} className='stepper-item denied'>
		    <div className="step-counter">2</div>
		    <div className="step-name">Validation denied</div>
		  </div> 
		}
	}
	return(
		<> 
		 <div className="stepper-wrapper">
		 	{nodo}
		</div>
		</>
	)
}