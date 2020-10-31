import React from "react"
import BigCookie from "./BigCookie"
import cookie from "../img/bigCookie.png"
import background from "../img/backgroundBlue.png"
import { ParticleManager } from "../particles"
import CookieDisplay from "./CookieDisplay"
import GameState from "../../../ccrewritten-core/"

interface AppState {
	gameState: GameState
}

export default class App extends React.Component<{}, AppState> {
	state = { gameState: new GameState() }
	render(): JSX.Element {
		return (
			<>
				<div
					style={{
						position: "absolute",
						backgroundImage: `url(${background})`,
						backgroundRepeat: "repeat",
						width: "100%",
						height: "100%",
						// Hahahaha
						zIndex: -9999999999999,
					}}
				/>
				<div
					style={{
						display: "grid",
						justifyItems: "center",
						gridTemplateColumns: "30% auto 20%",
						gridTemplateRows: "5% 15% 70% 10%",
						height: "100%",
						gridTemplateAreas: `'title title title'
															'cookie ticker store'
															'cookie art store'
															'. art store'`,
					}}
				>
					<div
						style={{
							gridArea: "title",
							placeSelf: "center",
							// Nice hack 😎
							backgroundColor: "black",
							color: "white",
						}}
					>
						Cookie clicker rewritten! This is a copy of{" "}
						<a href="https://orteil.dashnet.org/cookieclicker">
							cookie clicker
						</a>
						, please play that first!
					</div>
					<br />
					<CookieDisplay
						gameState={this.state.gameState}
						style={{ gridArea: "cookie" }}
					/>
					<BigCookie
						src={cookie}
						onClick={this.state.gameState.clickCookie.bind(
							this.state.gameState
						)}
						radius={128}
						style={{
							gridArea: "cookie",
							width: "256px",
							height: "256px",
							placeSelf: "center",
						}}
					/>
					<ParticleManager />
				</div>
			</>
		)
	}
}
