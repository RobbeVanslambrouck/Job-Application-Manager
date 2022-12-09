export interface IEvent {
	title: string;
	description: string;
	creationDate: Date;
	startDate: Date | null;
	endDate: Date | null;
	location: string | null;
	timeFromNow(): string;
}

export class ApplicationEvent implements IEvent {
	title: string;
	description = '';
	creationDate = new Date();
	startDate: Date | null;
	endDate = null;
	location = null;

	constructor(title: string) {
		this.title = title;
		this.startDate = null;
	}

	timeFromNow(): string {
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

			for (const [unit, value] of units) {
				if (Math.abs(relativeTime) > value) {
					return rtfEn.format(Math.round(relativeTime / value), unit);
				}
			}
			return rtfEn.format(Math.round(relativeTime / 1000), 'second');
		};

		const getRelativeTime = (date: Date) => {
			return date.getTime() - Date.now();
		};

		if (this.startDate) {
			return getRelativeTimeFormat(getRelativeTime(this.startDate));
		}

		if (this.endDate) {
			return getRelativeTimeFormat(getRelativeTime(this.endDate));
		}

		return getRelativeTimeFormat(getRelativeTime(this.creationDate));
	}
}
