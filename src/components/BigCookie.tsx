import React from "react"

interface BigCookieProps {
	onClick?: (e: MouseEvent) => void
	rescaleTimer?: number
}

interface BigCookieState {
	targetSize: number
	currentSize: number
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
		}
		this.onClickStart = this.onClickStart.bind(this)
		this.onClickEnd = this.onClickEnd.bind(this)
		this.onHoverStart = this.onHoverStart.bind(this)
		this.onHoverEnd = this.onHoverEnd.bind(this)
		this.handleId = setInterval(() => {
			this.setState(oldState => ({
				...oldState,
				currentSize:
					oldState.currentSize +
					(oldState.targetSize - oldState.currentSize) * 0.75,
			}))
		}, props.rescaleTimer ?? 50)
	}
	onClickStart(): void {
		this.setState(oldState => ({ ...oldState, targetSize: 0.75 }))
	}
	onClickEnd(): void {
		this.setState(oldState => ({ ...oldState, targetSize: 1.25 }))
	}
	onHoverStart(): void {
		this.setState(oldState => ({ ...oldState, targetSize: 1.25 }))
	}
	onHoverEnd(): void {
		this.setState(oldState => ({ ...oldState, targetSize: 1 }))
	}
	render(): JSX.Element {
		return (
			<div>
				<img
					onMouseDown={this.onClickStart}
					onMouseUp={this.onClickEnd}
					onMouseEnter={this.onHoverStart}
					onMouseLeave={this.onHoverEnd}
					onDragStart={ev => ev.preventDefault()}
					src="./img/bigCookie.png"
					style={{
						transform: `scale(${this.state.currentSize}, ${this.state.currentSize})`,
						userSelect: "none",
					}}
				/>
			</div>
		)
	}
}
