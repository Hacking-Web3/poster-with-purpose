export interface IPosterCard {
  id: string;
  author: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface IPostersList {
  title?: string;
  posters: IPosterCard[];
  numberElements?: number;
  actionButton?: "navigate" | "extend";
}

export interface ITagsList {
  title?: string;
  titlePosition?: "left" | "center";
  tags: string[];
}

export interface IUser {
  name: string;
  description: string;
  walletAdress: string;
  website: string;
  twitter: string;
  instagram: string;
  profilePicture: string;
}

export interface IUsersList {
  users: IUser[];
}

export interface IModalInformation {
  poster?: IPosterCard;
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
}

