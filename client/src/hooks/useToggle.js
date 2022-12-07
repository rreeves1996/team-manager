import React, { useState } from 'react';

export default function useToggle(defaultValue) {
	const [value, setValue] = useState(defaultValue);
	const [collapsed, setCollapsed] = useState(true);

	function toggleValue(value) {
		setValue((prevValue) => (typeof value === 'boolean' ? value : !prevValue));
	}

	function toggleCollapse() {
		setCollapsed((collapse) => !collapse);
	}

	return [value, toggleValue, collapsed, toggleCollapse];
}
