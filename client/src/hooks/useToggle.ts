import React, { useState } from 'react';

export default function useToggle() {
	const [collapsed, setCollapsed] = useState(true);

	function toggleCollapse() {
		setCollapsed((collapsed) => !collapsed);
	}

	return [collapsed, toggleCollapse];
}
