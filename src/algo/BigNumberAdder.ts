export class BigNumberAdder {

    private logs: string[] = [];
  
    sum(stn1: string, stn2: string): string {
      this.logs = []; // Reset logs
      let number1 = stn1.replace(/^0+/, '');
      let number2 = stn2.replace(/^0+/, '');
  
      if (number1 === '' && number2 === '') return '0';
      if (number1 === '') return number2;
      if (number2 === '') return number1;
  
      const len1 = number1.length;
      const len2 = number2.length;
      const maxLen = Math.max(len1, len2);
  
      let result = '';
      let carry = 0;
  
      for (let i = 0; i < maxLen; ++i) {
        const digit1 = len1 - 1 - i >= 0 ? Number(number1[len1 - 1 - i]) : 0;
        const digit2 = len2 - 1 - i >= 0 ? Number(number2[len2 - 1 - i]) : 0;
  
        const sum = digit1 + digit2 + carry;
        carry = Math.floor(sum / 10);
        result = (sum % 10) + result;
  
        this.logs.push(`Chữ số thứ nhất: ${digit1}, Chữ số thứ hai: ${digit2}, Viết lại: ${sum % 10}, Nhớ: ${carry}`);
      }
  
      if (carry > 0) {
        result = carry + result;
      }
  
      return result.replace(/^0+/, '') === '' ? '0' : result;
    }
  
    getLogs(): string[] {
      return this.logs;
    }
  }

export const adder = new BigNumberAdder();
  