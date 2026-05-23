import Database from 'better-sqlite3';
import {catergoryModel} from '../model/categoryModel.js'
import {purchaseModel} from '../model/purchaseModel.js';
import { purchaseitemsModel } from '../model/purchaseitemsModel.js'
import { saleModel } from '../model/salesModel.js';
import { productModel } from '../model/productsModel.js';
import { salesitemsModel } from '../model/sales_orders.js';
import { supplierModel } from '../model/supplierModel.js';
import { unitModel} from '../model/unitModel.js'

const db = new Database('pos.db');

db.pragma('foreign_keys = ON');
db.prepare(catergoryModel).run();
db.prepare(productModel).run();
db.prepare(unitModel).run();
db.prepare(supplierModel).run();
db.prepare(purchaseModel).run();
db.prepare(purchaseitemsModel).run();
db.prepare(saleModel).run();
db.prepare(salesitemsModel).run();
export default db;