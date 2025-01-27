export interface ITaskSchedule {
  entityId: string;
  leadIds: string[];
  orderId: string;
  startDate?: string | null;
}

export interface ITaskScheduleDuration extends ITaskSchedule {
  durationInMinutes: number;
}
