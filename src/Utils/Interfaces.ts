interface Categoryinterface {
    Name: string;
    subcategory: Array<SubCategoryinterface>;
}

interface SubCategoryinterface {
    Name: string;
}

interface Productinterface {
    id: number;
    Name: string;
    imageURL: string;
    Price: number;
    size: string;
    quantity: number;
    type: string;
    Category : string;
    Subcategory : string;
    Description: string;
}


interface UserOrderinterface {
    id: number;
    name: string;
    price: number;
    size: string;
    status: string;
    image: string;
    address: string;
    type: string;
    quantity: number;
}

interface AdminOrderinterface {
    id: number;
    name: string;
    price: number;
    size: string;
    status: string;
    image: string;
    user: {
      Name: string;
      Email: string;
      Phone: string;
    };
    address: string;
    type: string;
}

interface Cartinterface {
    id: number;
    name: string;
    description: string;
    price: number;
    size: string;
    quantity: number;
    image: string;
    type: string;
    status: string;
    address: string;
}


export type { Categoryinterface, Productinterface,  AdminOrderinterface , UserOrderinterface , Cartinterface, SubCategoryinterface};