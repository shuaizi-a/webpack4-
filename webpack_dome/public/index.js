import "../public/css/index.css";
import $ from './js/jquery'
import axios from 'axios'

console.log($)
console.log(axios)
var mp = new BMap.Map("container");
mp.centerAndZoom(new BMap.Point(116.3964, 39.9093), 10);
mp.enableScrollWheelZoom();