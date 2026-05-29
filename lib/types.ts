export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  username: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CreatePostInput {
  title: string;
  body: string;
  userId: number;
}
