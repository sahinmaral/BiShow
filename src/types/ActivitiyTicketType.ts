export type ActivitySeanceType = {
  startDate: Date;
  endDate: Date;
  isSoldOut: boolean;
  buyUrl: string;
  location: SeanceLocationType;
};

export type ActivityTicketType = {
  city: string;
  seances: ActivitySeanceType[];
};

export type SeanceLocationType = {
  address: string;
  name: string;
};

