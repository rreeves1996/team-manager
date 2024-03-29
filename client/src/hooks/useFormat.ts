import React from 'react';

export default function useFormat() {
	function uppercaseFirstChars(string: string) {
		const splitString = string.split(' ');
		const newString: Array<string> = [];

		splitString.forEach((word) => {
			const splitWord = word.split('');
			const firstChar = splitWord.shift();
			const firstCharUppercase = firstChar?.toUpperCase();

			splitWord.unshift(firstCharUppercase!);

			const newWord = splitWord.join('');

			newString.push(newWord);
		});

		const formattedString = newString.join(' ');

		return formattedString;
	}

	function abbreviateName(string: string) {
		const splitName = string.split(' ');
		const firstName = splitName[0].split('');
		const formattedName = `${
			splitName[1]
				? `${firstName[0]}. ${splitName[splitName.length - 1]}`
				: `${splitName[0]}`
		}`;
		return formattedName;
	}
	return { uppercaseFirstChars, abbreviateName };
}
