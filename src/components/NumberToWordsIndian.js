import React from 'react';

const NumberToWordsIndian = ({ number }) => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const convertNumberToWords = (num) => {
    if (num === 0) return 'Zero';

    let words = '';

    if (num >= 1000) {
      words += ones[Math.floor(num / 1000)] + ' Thousand ';
      num %= 1000;
    }

    if (num >= 100) {
      words += ones[Math.floor(num / 100)] + ' Hundred ';
      num %= 100;
    }

    if (num >= 20) {
      words += tens[Math.floor(num / 10)] + ' ';
      num %= 10;
    } else if (num >= 10) {
      words += teens[num - 10] + ' ';
      num = 0; // Teens handled, so reset num
    }

    if (num > 0) {
      words += ones[num] + ' ';
    }

    return words.trim();
  };

  const words = convertNumberToWords(number);

  return (
    <div>
      <p>{words}</p>
    </div>
  );
};

export default NumberToWordsIndian;
