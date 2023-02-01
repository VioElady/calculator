import { Component } from '@angular/core';

enum ActiveOperationPhase {
  NO_OPERATION,
  OPERATION_STARTED,
  OPERATION_PRE_COMPLETE,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public inputText: string = '0';
  public lastValue: number = 0;
  public activeOperation: string = '';
  public activeOperationPhase = ActiveOperationPhase.NO_OPERATION;

  public addSymbol(symbol: string | number) {
    if (
      symbol === ',' &&
      (this.inputText.includes(',') ||
        !this.inputText.trim() ||
        this.inputText === '0')
    ) {
      return;
    }

    if (this.activeOperationPhase === ActiveOperationPhase.OPERATION_STARTED) {
      this.inputText = symbol.toString();
      this.activeOperationPhase = ActiveOperationPhase.OPERATION_PRE_COMPLETE;
      return;
    }

    if (this.inputText === '0') {
      this.inputText = '';
    }

    this.inputText += symbol;
  }

  public toogleMultiply() {
    if (this.activeOperationPhase === ActiveOperationPhase.NO_OPERATION) {
      this.toggleInProgressOperation();
      this.activeOperation = 'multiply';
      return;
    }

    if (
      this.activeOperationPhase !== ActiveOperationPhase.OPERATION_PRE_COMPLETE
    ) {
      return;
    }

    const newValue = Number(this.inputText.replace(',', '.'));
    this.inputText = (this.lastValue * newValue).toString().replace('.', ',');
    this.toggleInProgressOperation();
  }

  public toogleDivide() {
    if (this.activeOperationPhase === ActiveOperationPhase.NO_OPERATION) {
      this.toggleInProgressOperation();
      this.activeOperation = 'divide';
      return;
    }

    if (
      this.activeOperationPhase !== ActiveOperationPhase.OPERATION_PRE_COMPLETE
    ) {
      return;
    }

    const newValue = Number(this.inputText.replace(',', '.'));
    this.inputText = (this.lastValue / newValue).toString().replace('.', ',');
    this.toggleInProgressOperation();
  }

  public toogleAdd() {
    if (this.activeOperationPhase === ActiveOperationPhase.NO_OPERATION) {
      this.toggleInProgressOperation();
      this.activeOperation = 'add';
      return;
    }

    if (
      this.activeOperationPhase !== ActiveOperationPhase.OPERATION_PRE_COMPLETE
    ) {
      return;
    }

    const newValue = Number(this.inputText.replace(',', '.'));
    this.inputText = (this.lastValue + newValue).toString().replace('.', ',');
    this.toggleInProgressOperation();
  }

  public toogleSubtract() {
    if (this.activeOperationPhase === ActiveOperationPhase.NO_OPERATION) {
      this.toggleInProgressOperation();
      this.activeOperation = 'subtract';
      return;
    }

    if (
      this.activeOperationPhase !== ActiveOperationPhase.OPERATION_PRE_COMPLETE
    ) {
      return;
    }

    const newValue = Number(this.inputText.replace(',', '.'));
    this.inputText = (this.lastValue - newValue).toString().replace('.', ',');
    this.toggleInProgressOperation();
  }

  public toogleCalc(
    newOperation?: 'divide' | 'subtract' | 'add' | 'multiply'
  ): void {
    if (
      newOperation &&
      this.activeOperationPhase === ActiveOperationPhase.NO_OPERATION
    ) {
      this.toggleInProgressOperation();
      this.activeOperation = newOperation;
      return;
    }

    if (this.activeOperation === 'divide') {
      this.toogleDivide();
    } else if (this.activeOperation === 'subtract') {
      this.toogleSubtract();
    } else if (this.activeOperation === 'add') {
      this.toogleAdd();
    } else if (this.activeOperation === 'multiply') {
      this.toogleMultiply();
    }

    if (!newOperation) {
      this.activeOperationPhase = ActiveOperationPhase.NO_OPERATION;
      this.activeOperation = '';
    } else {
      this.activeOperation = newOperation;
      this.toggleInProgressOperation();
    }
  }

  public clearCalc() {
    if (
      this.activeOperationPhase === ActiveOperationPhase.OPERATION_PRE_COMPLETE
    ) {
      this.inputText = '0';
    } else {
      this.inputText = '0';
      this.activeOperation = '';
      this.activeOperationPhase = ActiveOperationPhase.NO_OPERATION;
    }
  }

  public toggleNegavtive() {
    if (!this.inputText.startsWith('-')) {
      this.inputText = `-${this.inputText}`;
    } else {
      this.inputText = this.inputText.substring(1);
    }
  }

  public percent() {
    this.inputText = (Number(this.inputText.replace(',', '.')) / 100)
      .toString()
      .replace('.', ',');
  }

  private toggleInProgressOperation() {
    this.lastValue = Number(this.inputText.replace(',', '.'));
    this.activeOperationPhase = ActiveOperationPhase.OPERATION_STARTED;
  }
}
