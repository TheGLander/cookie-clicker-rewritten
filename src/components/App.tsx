import React from "react"
import BigCookie from "./BigCookie"

export default class App extends React.Component {
	render(): JSX.Element {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<h1>Cookie clicker rewritten!</h1>
				<BigCookie />
			</div>
		)
	}
}
