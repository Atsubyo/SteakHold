export interface CoordinateXYType {
	x: number;
	y: number;
}

export interface CowAgentType {
	id: number;
	age: number;
	isAlive: boolean;
	weight: number;
	location: CoordinateXYType;
}
