export class SnapshotFactory {
  createSnapshot({ activeAxis, averageWait, horizontalQueue, verticalQueue }) {
    return {
      activeAxis,
      averageWait,
      horizontalQueue,
      verticalQueue,
      totalQueue: horizontalQueue + verticalQueue
    };
  }
}
