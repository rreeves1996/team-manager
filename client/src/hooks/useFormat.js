import React from 'react';

export default function useFormat() {
	function uppercaseFirstChars(string) {
		const splitString = string.split(' ');
		const newString = [];

		splitString.forEach((word) => {
			const splitWord = word.split('');
			const firstChar = splitWord.shift();
			const firstCharUppercase = firstChar.toUpperCase();

			splitWord.unshift(firstCharUppercase);

			const newWord = splitWord.join('');

			newString.push(newWord);
		});

		const formattedString = newString.join(' ');

		return formattedString;
	}

	return { uppercaseFirstChars };
}
