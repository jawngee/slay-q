function parseDate(date: Date | string | null): Date {
	if (date === null) {
		date = new Date();
	} else if (typeof date === "string") {
		date = new Date(date);
	}

	return date;
}

export function addYears(date: Date | string | null, years: number): Date {
	date = parseDate(date);

	const partial = years % 1;
	years = years > 0 ? Math.floor(years) : Math.ceil(years);

	const copy = new Date(Number(date));
	copy.setFullYear(date.getFullYear() + years);

	if (partial !== 0) {
		return addMonths(copy, 12 * partial);
	}

	return copy;
}

export function addMonths(date: Date | string | null, months: number): Date {
	date = parseDate(date);

	const partial = months % 1;
	months = months > 0 ? Math.floor(months) : Math.ceil(months);

	const copy = new Date(Number(date));
	copy.setMonth(date.getMonth() + months);

	if (partial !== 0) {
		const daysInMonth = new Date(copy.getFullYear(), copy.getMonth() + 1, 0).getDate();
		return addDays(copy, daysInMonth * partial);
	}

	return copy;
}

export function addDays(date: Date | string | null, days: number): Date {
	date = parseDate(date);

	const partial = days % 1;
	days = days > 0 ? Math.floor(days) : Math.ceil(days);

	const copy = new Date(Number(date));
	copy.setDate(date.getDate() + days);

	if (partial !== 0) {
		copy.setTime(copy.getTime() + partial * 24.0 * 60.0 * 60.0 * 1000.0);
	}

	return copy;
}

export function addHours(date: Date | string | null, hours: number): Date {
	return addMinutes(date, hours * 60.0);
}

export function addMinutes(date: Date | string | null, minutes: number): Date {
	return addSeconds(date, minutes * 60.0);
}

export function addSeconds(date: Date | string | null, seconds: number): Date {
	date = parseDate(date);

	const copy = new Date(Number(date));
	copy.setTime(copy.getTime() + seconds * 1000.0);

	return copy;
}

export function isPast(date: Date | string, orEqual: boolean = false): boolean {
	if (typeof date === "string") {
		date = new Date(date);
	}

	return date.getTime() < Date.now() || (orEqual && date.getTime() === Date.now());
}

export function isFuture(date: Date | string, orEqual: boolean = false): boolean {
	if (typeof date === "string") {
		date = new Date(date);
	}

	return date.getTime() > Date.now() || (orEqual && date.getTime() === Date.now());
}

export function isWithinDays(date: Date | string, days: number): boolean {
	if (typeof date === "string") {
		date = new Date(date);
	}

	return date.getTime() > addDays(new Date(), -days).getTime();
}

export function isWithinMonths(date: Date | string, months: number): boolean {
	if (typeof date === "string") {
		date = new Date(date);
	}

	return date.getTime() > addMonths(new Date(), -months).getTime();
}

export function isWithinYears(date: Date | string, years: number): boolean {
	if (typeof date === "string") {
		date = new Date(date);
	}

	return date.getTime() > addYears(new Date(), -years).getTime();
}

export function isWithinHours(date: Date | string, hours: number): boolean {
	if (typeof date === "string") {
		date = new Date(date);
	}

	return date.getTime() > addHours(new Date(), -hours).getTime();
}

export function isWithinMinutes(date: Date | string, minutes: number): boolean {
	if (typeof date === "string") {
		date = new Date(date);
	}

	return date.getTime() > addMinutes(new Date(), -minutes).getTime();
}

export function isWithinSeconds(date: Date | string, seconds: number): boolean {
	if (typeof date === "string") {
		date = new Date(date);
	}

	return date.getTime() > addSeconds(new Date(), -seconds).getTime();
}

export function dayDiff(date1: Date | string | null, date2: Date | string | null = null): number {
	date1 = parseDate(date1);
	date2 = parseDate(date2);

	return Math.floor((date1.getTime() - date2.getTime()) / (1000 * 3600 * 24));
}

export function thisMonth(date: Date | string | null): Date {
	date = parseDate(date);

	return new Date(date.getFullYear(), date.getMonth());
}

export function previousMonth(date: Date | string | null): Date {
	date = parseDate(date);

	return new Date(date.getFullYear(), date.getMonth() - 1);
}

export function nextMonth(date: Date | string | null): Date {
	date = parseDate(date);

	return new Date(date.getFullYear(), date.getMonth() + 1);
}
