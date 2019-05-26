import { random, sample } from "lodash";
export class Task {
    constructor(formula, taskState) {
        this.formula = formula;
        this.taskState = taskState;
    }
}
function resultWrongifier(correctRes, erroneous = 10) {
    let correctResChecked = correctRes <= erroneous
        ? random(correctRes + erroneous, erroneous * 2)
        : correctRes;
    let error = random(1, +((correctResChecked * erroneous) / 100).toFixed());
    console.log(correctRes, correctResChecked, error);
    if (correctRes - error > 0) {
        return random(0, 1) ? correctRes - error : correctRes + error;
    }
    return correctRes + error;
}
function createPlusTask(isCorrect) {
    const num1 = random(1, 100);
    const num2 = random(1, 100);
    const correctResult = num1 + num2;
    const result = isCorrect ? correctResult : resultWrongifier(correctResult);
    return new Task(`${num1} + ${num2} = ${result}`, isCorrect);
}
function createMinusTask(isCorrect) {
    const num1 = random(1, 100);
    const num2 = random(1, num1);
    const correctResult = num1 - num2;
    const result = isCorrect ? correctResult : resultWrongifier(correctResult);
    return new Task(`${num1} - ${num2} = ${result}`, isCorrect);
}
function createMultiplyTask(isCorrect) {
    const num1 = random(1, 20);
    const num2 = random(1, 10);
    const correctResult = num1 * num2;
    const result = isCorrect ? correctResult : resultWrongifier(correctResult);
    return new Task(`${num1} * ${num2} = ${result}`, isCorrect);
}
function createDivideTask(isCorrect) {
    const num2 = random(1, 10);
    const correctResult = random(1, 10);
    const num1 = correctResult * num2;
    const result = isCorrect ? correctResult : resultWrongifier(correctResult);
    return new Task(`${num1} / ${num2} = ${result}`, isCorrect);
}
const tasksCreators = [
    createPlusTask,
    createMinusTask,
    createMultiplyTask,
    createDivideTask
];
export function taskGenerator() {
    const creator = sample(tasksCreators);
    return creator(sample([true, false]));
}
//# sourceMappingURL=task-generator.js.map