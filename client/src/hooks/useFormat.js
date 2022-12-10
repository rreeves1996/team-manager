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

	function abbreviateName(string) {
		const splitName = string.split(' ');
		const firstName = splitName[0].split('');
		const formattedName = `${firstName[0]}. ${splitName[splitName.length - 1]}`;

		return formattedName;
	}
	return { uppercaseFirstChars, abbreviateName };
}
