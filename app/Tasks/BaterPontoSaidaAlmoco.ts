import { BaseRandomTimeTask } from './BaseRandomTimeTask'

export default class BaterPonto12h extends BaseRandomTimeTask {
  public static get schedule() {
    return '*/1 12 * * 1-5'
  }

  readonly hour = 12
  readonly minuteRange: [1, 17]
  readonly taskKey = '12h'
  readonly pontoCode = '12'
}
