import { BaseRandomTimeTask } from './BaseRandomTimeTask'

export default class BaterPonto13h extends BaseRandomTimeTask {
  public static get schedule() {
    return '*/1 13 * * 1-5'
  }

  readonly hour = 13
  readonly minuteRange: [10, 20]
  readonly taskKey = '13h'
  readonly pontoCode = '13'
}
