interface Categoryinterface {
    Name: string;
    subcategory: Array<SubCategoryinterface>;
}

interface SubCategoryinterface {
    Name: string;
}

interface Productinterface {
    _id: string;
    name: string;
    image: string;
    price: number;
    size: string;
    quantity: number;
}


interface UserOrderinterface {
    _id: string;
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
    _id: string;
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
    _id: string;
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