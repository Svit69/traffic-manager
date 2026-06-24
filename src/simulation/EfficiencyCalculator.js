export class EfficiencyCalculator {
  calculateEfficiency(snapshot) {
    const queuePenalty = snapshot.totalQueue * 5;
    const waitPenalty = Math.min(snapshot.averageWait * 3, 40);
    const balanceBonus = snapshot.verticalQueue < 5 ? 16 : 0;
    return Math.max(0, Math.min(100, 100 - queuePenalty - waitPenalty + balanceBonus));
  }

  calculateAverageWait(completedVehicles) {
    if (completedVehicles.length === 0) return 0;
    const totalWait = completedVehicles.reduce((sum, vehicle) => sum + vehicle.waitingTicks, 0);
    return totalWait / completedVehicles.length;
  }
}
