import { ActivityTicketType } from "./ActivitiyTicketType";

type Activity = {
    id:string;
    name:string;
    genre:string;
    activityType:string;
    duration:string | null;
    thumbnail : string;
    description:string;
    startingDate: Date;
    endDate:Date;
    tickets: ActivityTicketType[]
}

export default Activity;