console.log("CCRewritten core activated!")

import ee from "eventemitter3"

export default class GameState {
	event = new ee.EventEmitter()
	cookies = 0
	earn(cookies: number): void {
		this.cookies += cookies
		this.event.emit("cookies")
	}
	clickCookie(): void {
		this.earn(1)
	}
}
