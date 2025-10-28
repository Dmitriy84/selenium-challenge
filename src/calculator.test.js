"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const calculator_1 = require("./calculator");
describe('Calculator', () => {
    let calculator;
    beforeEach(() => {
        calculator = new calculator_1.Calculator();
    });
    describe('add', () => {
        it('should add two positive numbers', () => {
            const result = calculator.add(5, 3);
            (0, chai_1.expect)(result).to.equal(8);
        });
        it('should add negative numbers', () => {
            const result = calculator.add(-5, -3);
            (0, chai_1.expect)(result).to.equal(-8);
        });
        it('should handle zero', () => {
            const result = calculator.add(0, 5);
            (0, chai_1.expect)(result).to.equal(5);
        });
    });
    describe('subtract', () => {
        it('should subtract two numbers', () => {
            const result = calculator.subtract(10, 3);
            (0, chai_1.expect)(result).to.equal(7);
        });
    });
    describe('multiply', () => {
        it('should multiply two numbers', () => {
            const result = calculator.multiply(4, 5);
            (0, chai_1.expect)(result).to.equal(20);
        });
    });
    describe('divide', () => {
        it('should divide two numbers', () => {
            const result = calculator.divide(10, 2);
            (0, chai_1.expect)(result).to.equal(5);
        });
        it('should throw error when dividing by zero', () => {
            (0, chai_1.expect)(() => calculator.divide(10, 0)).to.throw('Cannot divide by zero');
        });
    });
});
//# sourceMappingURL=test.js.map