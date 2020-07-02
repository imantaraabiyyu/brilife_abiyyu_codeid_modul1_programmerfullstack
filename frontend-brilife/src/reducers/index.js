import { combineReducers } from "redux";
import { Contraception, Contraceptions } from "./contraceptions";
import { ContraceptionUser, ContraceptionUsers } from "./contraception_users";
import { Chart, Stats, Table } from "./home";
import { Province, Provinces } from "./provinces";
export default combineReducers({
  Stats,
  Chart,
  Table,
  Provinces,
  Province,
  Contraceptions,
  Contraception,
  ContraceptionUsers,
  ContraceptionUser
});
