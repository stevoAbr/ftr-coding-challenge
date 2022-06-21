var Timer = require('advanced-timer');

export default class CountDown {
    _timeInterval: number
    _callback: Function
    _timer: typeof Timer

    constructor(timeInterval: number, callback: Function) {
        this._timeInterval = timeInterval * 1000
        this._callback = callback
    }

    startTimer() {
        this._timer = new Timer(this._timeInterval)
        .action(this._callback)
        .start()
    }

    pauseTimer() {
        this._timer.pause()
    }

    stopTimer() {
        this._timer.stop()
    }

    resumeTimer() {
        this._timer.resume()
    }

}