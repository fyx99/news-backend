import http from 'k6/http';
import { check, sleep } from 'k6';


export default function () {
  const res = http.get('http://138.68.74.3:3000/app/feed?offset=0');
  check(res, { 'status was 200': (r) => r.status == 200 });
}