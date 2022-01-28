export interface IUserProfile {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  id: string;
  profilePic: string;
  coverPhoto: string;
  likes?: string[];
  retweets?: string[];

  createdAt: Date;
}
