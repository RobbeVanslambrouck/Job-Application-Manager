export interface IEvent {
	title: string;
	description: string;
	creationDate: Date;
	startDate: Date | null;
	endDate: Date | null;
	location: string | null;
}

export function createEvent(
	title: string,
	description = '',
	creationDate = new Date(),
	startDate: Date | null = null,
	endDate: Date | null = null,
	location: string | null = null
): IEvent {
	return {
		title: title,
		description: description,
		creationDate: creationDate,
		startDate: startDate,
		endDate: endDate,
		location: location
	};
}

export function relativeTimeFormat(event: IEvent, date = new Date()): string {
	const rtfEn = new Intl.RelativeTimeFormat('en');

	const getRelativeTimeFormat = (relativeTime: number) => {
		const units: Map<Intl.RelativeTimeFormatUnit, number> = new Map([
			['year', 1000 * 60 * 60 * 24 * 365],
			['month', (1000 * 60 * 60 * 24 * 365) / 12],
			['week', 1000 * 60 * 60 * 24 * 7],
			['day', 1000 * 24 * 60 * 60],
			['hour', 1000 * 60 * 60],
			['minute', 1000 * 60]
		]);

		for (const [u, v] of units) {
			if (Math.abs(relativeTime) > v) {
				return rtfEn.format(Math.round(relativeTime / v), u);
			}
		}
		return rtfEn.format(Math.round(relativeTime / 1000), 'second');
	};

	const getRelativeTime = (d: Date) => {
		return d.getTime() - date.getTime();
	};

	if (event.startDate) {
		return getRelativeTimeFormat(getRelativeTime(event.startDate));
	}

	if (event.endDate) {
		return getRelativeTimeFormat(getRelativeTime(event.endDate));
	}

	return getRelativeTimeFormat(getRelativeTime(event.creationDate));
}

export function getEventRelativeTime(event: IEvent, date = new Date()): number {
	const getRelativeTime = (d: Date) => {
		return d.getTime() - date.getTime();
	};
	if (!event.startDate && !event.endDate) {
		return getRelativeTime(event.creationDate);
	}

	if (!event.startDate && event.endDate) {
		return getRelativeTime(event.endDate);
	}

	if (event.startDate && !event.endDate) {
		return getRelativeTime(event.startDate);
	}

	const startDateRelativeTime = getRelativeTime(event.startDate as Date);
	const endDateRelativeTime = getRelativeTime(event.endDate as Date);

	if (startDateRelativeTime < 0) return startDateRelativeTime;
	if (endDateRelativeTime > 0) return endDateRelativeTime;
	return 0;
}
