

// import {random, sample} from 'lodash';


// export class Task {

//     taskState: boolean;
//     formula: string;
    
//     constructor (formula, taskState){
//         this.formula = formula;
//         this.taskState = taskState;
//     }


// }


// function createPlusTask(isCorrect) {
//     const num1 = random(1, 100);
//     const num2 = random(1, 100);
//     const correctResult = num1 + num2;
//     const result = isCorrect ? correctResult : correctResult + random(1, 20);
//     return new Task(`${num1} + ${num2} = ${result}`, isCorrect);
// }


// function createMinusTask(isCorrect) {
//     const num1 = random(1, 100);
//     const num2 = random(1, num1);
//     const correctResult = num1 - num2;
//     const result = isCorrect ? correctResult : correctResult + random(1, 20);
//     return new Task(`${num1} - ${num2} = ${result}`, isCorrect);
// }

// function createMultiplyTask(isCorrect) {
//     const num1 = random(1, 20);
//     const num2 = random(1, 10);
//     const correctResult = num1 * num2;
//     const result = isCorrect ? correctResult : correctResult + random(1, 20);
//     return new Task(`${num1} * ${num2} = ${result}`, isCorrect);
// }

// function createDivideTask(isCorrect) {
//     const num2 = random(1, 10);
//     const correctResult = random(1, 10);
//     const num1 = correctResult * num2;
//     const result = isCorrect ? correctResult : correctResult + random(1, 5);
//     return new Task(`${num1} / ${num2} = ${result}`, isCorrect);
// }

// const tasksCreators = [
//     createPlusTask,
//     createMinusTask,
//     createMultiplyTask,
//     createDivideTask,
// ];


// export function taskGenerator() {
//     const creator = sample(tasksCreators);
//     return creator(sample([true, false]));
// }




