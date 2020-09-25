/*import React from "react"

interface ParticleProps {
	x: number
	y: number
	deltaX: number
	deltaY: number
	lifespan?: number
	size?: number
}

interface ParticleState {
	x: number
	y: number
	lifeLeft: number
}

export class Particle extends React.Component<ParticleProps, ParticleState> {
	constructor(props: ParticleProps) {
		super(props)
		this.state = {
			x: props.x,
			y: props.y,
			lifeLeft: props.lifespan,
		}
	}
	updateParticle(): void {
		this.setState(oldState => ({
			x: oldState.x + this.props.deltaX,
			y: oldState.y + this.props.deltaY,
			lifeLeft: oldState.lifeLeft - 1,
		}))
	}
	render(): JSX.Element {
		return <>{this.props.children}</>
	}
}

interface ParticleManagerProps {
	updateTimeout?: number
}

interface ParticleManagerState {
	particles: Particle[]
}

export class ParticleManager extends React.Component<
	ParticleManagerProps,
	ParticleManagerState
> {
	handleId: number
	constructor(props: ParticleManagerProps) {
		super(props)
		this.state = { particles: [] }
		this.handleId = setInterval(() => {
			for (const particle of this.state.particles) particle.updateParticle()
		}, props.updateTimeout ?? 50)
	}
	render(): JSX.Element {
		return <>{this.state.particles.map()}</>
	}
}
*/
