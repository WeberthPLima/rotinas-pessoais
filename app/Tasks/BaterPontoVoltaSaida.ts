import { BaseRandomTimeTask } from './BaseRandomTimeTask'

export default class BaterPonto17h extends BaseRandomTimeTask {
  public static get schedule() {
    return '*/1 17 * * 1-5'
  }

  readonly hour = 17
  readonly minuteRange: [10, 30]
  readonly taskKey = '17h'
  readonly pontoCode = '17'
}
