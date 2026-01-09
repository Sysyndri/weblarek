import { Api } from './components/base/Api';
import { ApiResponse } from './components/models/ApiResponse';
import { Buyer } from './components/models/Buyer';
import { MainCatalog } from './components/models/MainCatalog';
import { ProductBasket } from './components/models/ProductBascet';
import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';


const res = new ApiResponse(new Api(API_URL))

console.log(res.get())