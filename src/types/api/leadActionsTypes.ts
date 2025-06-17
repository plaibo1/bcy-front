export interface ITaskSchedule {
  entityId: string;
  leadIds: string[];
  orderId: string;
  startDate?: string | null;
}

export interface ITaskScheduleDuration extends ITaskSchedule {
  durationInMinutes: number;
}

export interface ITaskScheduleResponse {
  unsentLeads:
    | [
        {
          reason: "string";
          leads: [
            {
              id: string;
              name: string;
              entityId: string;
              data: Record<string, unknown>;
            }
          ];
        }
      ]
    | null;
}
