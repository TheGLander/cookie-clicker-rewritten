import React, { Children } from "react"
const DEFAULT_QUALITY = 16
let manager: ParticleManager = null
interface ParticleProps {
	x: number
	y: number
	deltaX: number
	deltaY: number
	/**
	 * The amount of time before the particle dissapears, in seconds
	 */
	lifespan?: number | "infinity"
	size?: number
	/**
	 * If true, automatically fades the element
	 */
	autofade?: boolean
}

export class Particle {
	x: number
	y: number
	deltaX: number
	deltaY: number
	lifeLeft: number | "infinity"
	lifespan: number | "infinity"
	size: number
	children: JSX.Element
	autofade: boolean
	constructor(children: JSX.Element, props: ParticleProps) {
		if (props.autofade && props.lifespan === "infinity")
			throw new Error("Cannot auto-fade when the lifespan is infinite!")
		this.x = props.x
		this.y = props.y
		this.deltaX = props.deltaX
		this.deltaY = props.deltaY
		this.lifeLeft = props.lifespan ?? 1
		if (this.lifeLeft !== "infinity")
			this.lifeLeft =
				(this.lifeLeft * 1000) /
				(manager.props.updateTimeout ?? DEFAULT_QUALITY)
		this.lifespan = this.lifeLeft
		this.size = props.size ?? 1
		this.children = children
		this.autofade = props.autofade ?? false
	}
	updateParticle(): void {
		this.x += this.deltaX
		this.y += this.deltaY
		if (this.lifeLeft === "infinity") return
		this.lifeLeft -= 1
		if (this.lifeLeft <= 0) manager.removeParticle(this)
	}
	getElement(): JSX.Element {
		return (
			<div
				style={{
					left: this.x,
					top: this.y,
					position: "absolute",
					zIndex: 999999999,
					opacity:
						this.lifeLeft !== "infinity" && this.lifespan !== "infinity"
							? this.lifeLeft / this.lifespan
							: 1,
				}}
			>
				{this.children}
			</div>
		)
	}
}

interface ParticleManagerProps {
	updateTimeout?: number
}

interface ParticleManagerState {
	particles: Particle[]
	particleTick: number
}

export class ParticleManager extends React.Component<
	ParticleManagerProps,
	ParticleManagerState
> {
	handleId: number
	constructor(props: ParticleManagerProps) {
		super(props)
		manager = this
		this.state = { particles: [], particleTick: 0 }
		this.handleId = setInterval(() => {
			for (const particle of this.state.particles) particle.updateParticle()
			this.setState(oldState => ({ particleTick: oldState.particleTick + 1 }))
		}, props.updateTimeout ?? DEFAULT_QUALITY)
	}
	addParticle(particle: Particle) {
		this.setState(oldState => ({
			particles: [...oldState.particles, particle],
		}))
	}
	removeParticle(particle: Particle) {
		this.setState(oldState => {
			const newParticles = [...oldState.particles]
			if (newParticles.indexOf(particle) === -1) return null
			newParticles.splice(newParticles.indexOf(particle), 1)
			return { particles: newParticles }
		})
	}
	render(): JSX.Element {
		return (
			<div className="particleManager">
				{this.state.particles.map(val => val.getElement())}
			</div>
		)
	}
}
/**
 * Creates a new particle from the parameters
 */
export function createParticle(
	content: JSX.Element,
	params: ParticleProps
): void {
	if (!manager) throw new Error("No manager created yet!")
	manager.addParticle(new Particle(content, params))
}
