export type ActivitySeanceType = {
  startDate: Date;
  endDate: Date;
  isSoldOut: boolean;
  url: string;
  location: SeanceLocationType;
  id:string;
};

export type ActivityTicketType = {
  city: string;
  seances: ActivitySeanceType[];
};

export type SeanceLocationType = {
  address: string;
  name: string;
  nameSlug:string;
};

