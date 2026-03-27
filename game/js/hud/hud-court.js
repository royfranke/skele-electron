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
	}

	openCourt(setupBoard) {
		if (!this.open) {
			this.open = true;
			this.isGameOver = false;
			this.scene.manager.hud.pullToHide();
			setupBoard();
			this.manager.startTurn();
		}
	}

	closeCourt({ teardown, resetGame } = {}) {
		if (this.open) {
			if (teardown != null) {
				teardown();
			}
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