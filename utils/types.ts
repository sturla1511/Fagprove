export const types = ["PC", "Mac", "Mobile", "Mouse", "Keyboard", "Headset" ]

export const typeIcon = (type: string): string => {
	switch (type) {
		case 'PC':
			return '/icon/laptop.svg';
		case 'Mac':
			return '/icon/laptop.svg';
		case 'Mobile':
			return '/icon/mobile-notch.svg';
		case 'Mouse':
			return '/icon/mouse.svg';
		case 'Keyboard':
			return '/icon/keyboard.svg';
		case 'Headset':
			return '/icon/headset.svg';
	}
};

export const typeColor = (type: string): string => {
	switch (type) {
		case 'PC':
			return '#48ECF7';
		case 'Mac':
			return '#48ECF7';
		case 'Mobile':
			return '#98F6A1';
		case 'Mouse':
			return '#ffb84f';
		case 'Keyboard':
			return '#ffb84f';
		case 'Headset':
			return '#98F6A1';
	}
};

