import { Image } from "./Image";
import { Point } from "./Point";

export interface Mission {
	id: number,
	title: string,
	description: string,
	type: string,
	drone: { id: number },
	user: { id: number },
	startDate: string,
	endDate: string,
	missionPoints: Point[],
	missionImages: Image[],
}