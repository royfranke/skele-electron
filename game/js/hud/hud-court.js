import HudCommon from "./hud-common.js";
/*
 * Base for courts
 * 
 */

export default class HudCourt extends HudCommon {

	initializeCourt(manager) {
		this.open = false;
		this.isGameOver = false;
		this.manager = manager;
		this.initializeTimer();
	}

	initializeTimer(options = {}) {
		this.timer = {
			enabled: false,
			mode: 'game',
			autoStart: false,
			gameDurationMs: 60000,
			roundDurationMs: 10000,
			showTenths: false,
            secondsOnly: false,
			font: 'SkeleTalk',
			fontSize: 12,
			position: {
				x: null,
				y: null
			},
			remainingMs: 0,
			running: false,
			paused: false,
			scope: null,
			onExpire: null,
			onTick: null,
			updateListener: null,
			ui: {
				block: null,
				text: null
			}
		};

		if (options.position != null) {
			this.timer.position = {
				x: options.position.x ?? this.timer.position.x,
				y: options.position.y ?? this.timer.position.y
			};
		}

		Object.assign(this.timer, options);
	}

	createTimerUI() {
		if (!this.timer.enabled || this.timer.ui.text != null) {
			return;
		}

		let x = this.timer.position.x;
		let y = this.timer.position.y;

		if (x == null || y == null) {
			if (this.boardView != null) {
				x = this.boardView.x + 12;
				y = this.boardView.y + this.boardView.height - 32;
			}
			else {
				x = this.view.right - 84;
				y = this.view.top + 8;
			}
		}

		
		this.timer.ui.text = this.scene.add.bitmapText(x + 8, y + 11, this.timer.font, '', this.timer.fontSize)
			.setOrigin(.5)
			.setScrollFactor(0)
			.setDepth(100200)
			.setTintFill(0x465e62);

        let timer_width = this.timer.ui.text.displayWidth + 16;
        this.timer.ui.block = this.makeBlock(x, y, timer_width, 20, 'BLOCK_MID_WHITE').setDepth(100100);

		if (this.timer.remainingMs <= 0) {
			this.timer.remainingMs = (this.timer.mode == 'round') ? this.timer.roundDurationMs : this.timer.gameDurationMs;
		}

		this.refreshTimerText();
		this.setTimerVisible(true);
	}

	setTimerVisible(visible = true) {
		if (this.timer.ui.block != null) {
			this.timer.ui.block.setVisible(visible);
		}
		if (this.timer.ui.text != null) {
			this.timer.ui.text.setVisible(visible);
		}
	}

	attachTimerUpdate() {
		if (!this.timer.enabled || this.timer.updateListener != null) {
			return;
		}

		this.timer.updateListener = (time, delta) => {
			this.updateTimer(delta);
		};

		this.scene.events.on('update', this.timer.updateListener, this);
	}

	detachTimerUpdate() {
		if (this.timer.updateListener != null) {
			this.scene.events.off('update', this.timer.updateListener, this);
			this.timer.updateListener = null;
		}
	}

	startGameTimer(durationMs = null) {
		this.startTimer('game', durationMs);
	}

	startRoundTimer(durationMs = null) {
		this.startTimer('round', durationMs);
	}

	startTimer(scope = 'game', durationMs = null) {
		if (!this.timer.enabled) {
			return;
		}

		this.createTimerUI();
		this.timer.scope = scope;

		if (durationMs != null) {
			this.timer.remainingMs = durationMs;
		}
		else {
			this.timer.remainingMs = (scope == 'round') ? this.timer.roundDurationMs : this.timer.gameDurationMs;
		}

		this.timer.running = true;
		this.timer.paused = false;
		this.refreshTimerText();
		this.setTimerVisible(true);
		this.attachTimerUpdate();
	}

	pauseTimer() {
		if (this.timer.enabled && this.timer.running) {
			this.timer.paused = true;
		}
	}

	resumeTimer() {
		if (this.timer.enabled && this.timer.running) {
			this.timer.paused = false;
		}
	}

	stopTimer() {
		if (!this.timer.enabled) {
			return;
		}
		this.timer.running = false;
		this.timer.paused = false;
		this.detachTimerUpdate();
	}

	resetTimer(durationMs = null) {
		if (!this.timer.enabled) {
			return;
		}

		if (durationMs != null) {
			this.timer.remainingMs = durationMs;
		}
		else {
			let scope = this.timer.scope != null ? this.timer.scope : this.timer.mode;
			this.timer.remainingMs = (scope == 'round') ? this.timer.roundDurationMs : this.timer.gameDurationMs;
		}

		this.refreshTimerText();
	}

	updateTimer(deltaMs) {
		if (!this.timer.enabled || !this.timer.running || this.timer.paused) {
			return;
		}

		this.timer.remainingMs -= deltaMs;
		if (this.timer.remainingMs < 0) {
			this.timer.remainingMs = 0;
		}

		this.refreshTimerText();

		if (this.timer.onTick != null) {
			this.timer.onTick(this.timer.remainingMs, this.timer.scope);
		}

		if (this.timer.remainingMs == 0) {
			let scope = this.timer.scope;
			this.stopTimer();

			if (scope == 'round') {
				this.onRoundTimerExpired();
			}
			else {
				this.onGameTimerExpired();
			}

			if (this.timer.onExpire != null) {
				this.timer.onExpire(scope);
			}
		}
	}

	refreshTimerText() {
		if (!this.timer.enabled || this.timer.ui.text == null) {
			return;
		}
		this.timer.ui.text.setText(this.formatTimer(this.timer.remainingMs));
	}

	formatTimer(ms = 0) {
		let clamped = Math.max(0, Math.floor(ms));
		let totalSeconds = Math.floor(clamped / 1000);
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = totalSeconds % 60;

		let minuteDisplay = String(minutes).padStart(2, '0');

        if (this.timer.secondsOnly) {
            return String(seconds);
		}

        let secondDisplay = String(seconds).padStart(2, '0');

		if (!this.timer.showTenths) {
			return minuteDisplay + ':' + secondDisplay;
		}

		let tenths = Math.floor((clamped % 1000) / 100);
		return minuteDisplay + ':' + secondDisplay + '.' + tenths;
	}

	onGameTimerExpired() {}

	onRoundTimerExpired() {}

	teardownTimer() {
		if (this.timer == null) {
			return;
		}

		this.stopTimer();

		if (this.timer.ui.block != null) {
			this.timer.ui.block.destroy();
			this.timer.ui.block = null;
		}
		if (this.timer.ui.text != null) {
			this.timer.ui.text.destroy();
			this.timer.ui.text = null;
		}

		this.timer.remainingMs = 0;
		this.timer.scope = null;
	}

	openCourt(setupBoard) {
		if (!this.open) {
			this.open = true;
			this.isGameOver = false;
			this.scene.manager.hud.pullToHide();
			setupBoard();
			if (this.timer.enabled) {
				this.createTimerUI();
				if (this.timer.autoStart) {
					if (this.timer.mode == 'round') {
						this.startRoundTimer();
					}
					else {
						this.startGameTimer();
					}
				}
			}
			this.manager.startTurn();
		}
	}

	closeCourt({ teardown, resetGame } = {}) {
		if (this.open) {
			if (teardown != null) {
				teardown();
			}
			this.teardownTimer();
			this.destroyButton(this.back_button);
			this.destroyButton(this.end_button);
			if (resetGame != null) {
				resetGame();
			}
			if (this.manager != null && this.manager.destroyListeners != null) {
				this.manager.destroyListeners();
			}
			this.open = false;
			this.scene.manager.hud.pullToShow();
		}
	}

	makeEndButtonCommon(selectEvent, backEvent) {
		var callback_select_end = function () {
			this.scene.events.emit(backEvent);
		}

		this.scene.events.addListener(selectEvent, callback_select_end, this);

		this.end_button = this.makeButton(this.boardView.x + this.boardView.width - 12, this.boardView.y + this.boardView.height - 36, 'CLOSE', 'X', 'SHAMROCK');

		this.end_button.click_area.on('pointerdown', () => {
			this.scene.events.emit(backEvent);
		});
	}

	tallyScoreCommon(finalStep = null) {
		this.destroyButton(this.back_button);
		this.board.score[0].object.setFont('SkeleHype');
		this.board.score[0].object.setRightAlign();
		this.board.score[0].object.setFontSize(16);
		this.scene.tweens.add({
			targets: this.board.score[0].object,
			y: '-=32',
			duration: 2000,
			ease: 'Sine.easeInOut'
		});

		let timeline = this.scene.add.timeline([
			{
				at: 500,
				run: () => {
					this.setHype('BEST . . . ' + this.reference_score.streak_best);
				}
			},
			{
				at: 1500,
				run: () => {
					this.setHype('BEST . . . ' + this.reference_score.streak_best + '\nHITS . . . ' + this.reference_score.correct);
				}
			},
			{
				at: 2500,
				run: () => {
					this.setHype('BEST . . . ' + this.reference_score.streak_best + '\nHITS . . . ' + this.reference_score.correct + '\nFINAL . . . ' + (this.reference_score.streak_best * this.reference_score.correct));
					if (finalStep != null) {
						finalStep();
					}
				}
			}
		]);

		timeline.play();
	}

	drawScoreCommon(score) {
		this.reference_score = score;
		if (score.streak > 1) {
			this.setHype('STREAK! X' + score.streak);
		}
		else {
			this.setHype();
		}

		this.setHits(score.correct);
		this.setMisses(score.incorrect);
	}

}