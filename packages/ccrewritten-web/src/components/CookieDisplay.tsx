import React from "react"
import GameState from "../../../ccrewritten-core"

interface DisplayProps {
	gameState: GameState
	style?: React.CSSProperties
}

interface DisplayState {
	cookies: number
}

export default class CookieDisplay extends React.Component<
	DisplayProps,
	DisplayState
> {
	constructor(props: DisplayProps) {
		super(props)
		this.state = { cookies: 0 }
		this.props.gameState.event.on("cookies", () =>
			this.setState({ cookies: this.props.gameState.cookies })
		)
	}
	render(): JSX.Element {
		return <span style={this.props.style}>{this.state.cookies} cookies</span>
	}
}
