import { ActivityTicketType } from "./ActivitiyTicketType";
import ActivityRatingType from "./ActivityRatingType";

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
    rating:ActivityRatingType[];
    tickets: ActivityTicketType[]
}

export default Activity;