import { BaseRandomTimeTask } from './BaseRandomTimeTask'

export default class BaterPonto07h extends BaseRandomTimeTask {
  public static get schedule() {
    return '*/1 7 * * 1-5'
  }

  readonly hour = 7
  readonly minuteRange: [15, 45]
  readonly taskKey = '07h'
  readonly pontoCode = '07'
}
