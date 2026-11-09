export type Language = 'bn' | 'en';

export type Brand = 'apple' | 'samsung' | 'pixel' | 'xiaomi' | 'oneplus' | 'all';

export type Category = 
  | 'all'
  | 'iphone'
  | 'smartphones'
  | 'macbooks'
  | 'tablets'
  | 'smartwatches'
  | 'audio'
  | 'chargers'
  | 'accessories';

export interface ProductColor {
  name: string;
  nameBn: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  nameBn: string;
  brand: 'apple' | 'samsung' | 'pixel' | 'xiaomi' | 'oneplus';
  category: Category;
  price: number;
  oldPrice: number;
  warranty: string;
  warrantyBn: string;
  isOfficial: boolean;
  isHotDeal?: boolean;
  soldCount?: number;
  totalStock?: number;
  specs: string[];
  specsBn: string[];
  description: string;
  descriptionBn: string;
  imageType: string;
  imageUrl?: string;
  colors: ProductColor[];
  storageOptions: string[];
  inStock: boolean;
  tag?: string;
  tagBn?: string;
  detailedSpecs?: {
    display: string;
    processor: string;
    ramStorage: string;
    cameraRear: string;
    cameraFront: string;
    batteryCharging: string;
    buildRating: string;
    specialFeature: string;
  };
  detailedSpecsBn?: {
    display: string;
    processor: string;
    ramStorage: string;
    cameraRear: string;
    cameraFront: string;
    batteryCharging: string;
    buildRating: string;
    specialFeature: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface Outlet {
  id: string;
  name: string;
  nameBn: string;
  city: string;
  cityBn: string;
  location: string;
  locationBn: string;
  phones: string[];
  hours: string;
  hoursBn: string;
  mapUrl: string;
  isOpenToday: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryArea: 'dhaka' | 'outside';
  address: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  date: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
}

export interface TradeInDevice {
  brand: string;
  model: string;
  baseValue: number;
}
