import React from "react"

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
	ogBoundRect: [number, number]
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
			ogBoundRect: null,
			clickable: true,
		}
		this.onClickStart = this.onClickStart.bind(this)
		this.onClickEnd = this.onClickEnd.bind(this)
		this.onHoverStart = this.onHoverStart.bind(this)
		this.onHoverEnd = this.onHoverEnd.bind(this)
		this.onMouseMove = this.onMouseMove.bind(this)
		this.handleId = setInterval(() => {
			if (this.state.currentSize !== this.state.targetSize)
				this.setState(oldState => ({
					currentSize:
						oldState.currentSize +
						(oldState.targetSize - oldState.currentSize) * 0.75,
				}))
		}, props.rescaleTimer ?? 50)
	}
	checkRadius(event: React.MouseEvent<HTMLImageElement, MouseEvent>): boolean {
		let rect = this.state.ogBoundRect
		if (rect === null) {
			const actualRect = event.currentTarget.getBoundingClientRect()
			rect = [actualRect.x, actualRect.y]
		}
		const x = event.clientX - rect[0] - this.props.radius
		const y = event.clientY - rect[1] - this.props.radius
		return Math.sqrt(x ** 2 + y ** 2) < this.props.radius
	}

	onClickStart(event: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
		if (!this.checkRadius(event)) return
		this.setState({ targetSize: 0.75 })
	}
	onClickEnd(event: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
		if (!this.checkRadius(event)) return
		this.setState({ targetSize: 1.25 })
		this.props.onClick?.(event)
	}
	onHoverStart(event: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
		if (this.state.currentSize === 1) {
			const rect = event.currentTarget.getBoundingClientRect()
			this.setState({ ogBoundRect: [rect.x, rect.y] })
		}
		if (!this.checkRadius(event)) return
		this.setState(oldState => ({ targetSize: 1.25, clickable: true }))
	}
	onHoverEnd(): void {
		this.setState({ targetSize: 1 })
	}
	onMouseMove(event: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
		this.setState({
			targetSize: this.checkRadius(event) ? 1.25 : 1,
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
