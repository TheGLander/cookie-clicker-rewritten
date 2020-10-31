import React from "react"
import { createParticle } from "../particles"

interface BigCookieProps {
	onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
	src: string
	radius: number
	rescaleTimer?: number
	style?: React.CSSProperties
}

interface BigCookieState {
	targetSize: number
	currentSize: number
	changeDelta: number
	clickable: boolean
}

export default class BigCookie extends React.Component<
	BigCookieProps,
	BigCookieState
> {
	handleId: number
	constructor(props: BigCookieProps) {
		super(props)
		this.state = {
			targetSize: 1,
			currentSize: 1,
			clickable: true,
			changeDelta: 0,
		}
		this.onClickStart = this.onClickStart.bind(this)
		this.onClickEnd = this.onClickEnd.bind(this)
		this.onHoverStart = this.onHoverStart.bind(this)
		this.onHoverEnd = this.onHoverEnd.bind(this)
		this.onMouseMove = this.onMouseMove.bind(this)
		this.handleId = setInterval(() => {
			if (this.state.currentSize !== this.state.targetSize)
				this.setState(oldState => ({
					changeDelta:
						oldState.changeDelta +
						(oldState.targetSize - oldState.currentSize) * 0.75,
				}))
			this.setState(oldState => ({ changeDelta: oldState.changeDelta * 0.75 }))
			this.setState(oldState => ({
				currentSize: oldState.currentSize + oldState.changeDelta,
			}))
		}, props.rescaleTimer ?? 50)
	}
	checkRadius(event: React.MouseEvent<HTMLImageElement, MouseEvent>): boolean {
		const rect = event.currentTarget.getBoundingClientRect()
		const offset = this.props.radius * (this.state.currentSize - 1)
		const x = event.clientX - rect.x + offset - this.props.radius
		const y = event.clientY - rect.y + offset - this.props.radius
		return Math.sqrt(x ** 2 + y ** 2) < this.props.radius
	}

	onClickStart(event: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
		if (!this.checkRadius(event)) return
		this.setState({ targetSize: 0.95 })
	}
	onClickEnd(event: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
		if (!this.checkRadius(event)) return
		this.setState({ targetSize: 1.05 })
		this.props.onClick?.(event)
		createParticle(
			<div
				style={{
					userSelect: "none",
					fontFamily: "Merriweather",
					fontSize: "20px",
				}}
			>
				+1
			</div>,
			{
				x: event.pageX,
				y: event.pageY - 21,
				deltaX: 0,
				deltaY: -2,
				lifespan: 4,
				autofade: true,
			}
		)
	}
	onHoverStart(event: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
		if (!this.checkRadius(event)) return
		this.setState({ targetSize: 1.05, clickable: true })
	}
	onHoverEnd(): void {
		this.setState({ targetSize: 1 })
	}
	onMouseMove(event: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
		this.setState({
			targetSize: this.checkRadius(event)
				? this.state.targetSize === 1
					? 1.05
					: this.state.targetSize
				: 1,
			clickable: this.checkRadius(event),
		})
	}
	render(): JSX.Element {
		return (
			<>
				<img
					onMouseDown={this.onClickStart}
					onMouseUp={this.onClickEnd}
					onMouseEnter={this.onHoverStart}
					onMouseLeave={this.onHoverEnd}
					onDragStart={ev => ev.preventDefault()}
					onMouseMove={this.onMouseMove}
					src={this.props.src}
					style={{
						transform: `scale(${this.state.currentSize}, ${this.state.currentSize})`,
						userSelect: "none",
						cursor: this.state.clickable ? "pointer" : "auto",
						...this.props.style,
					}}
				/>
			</>
		)
	}
}
