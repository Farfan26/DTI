/** Mini servidor para PRUEBAS LOCALES de las Functions. No reemplaza a netlify dev. */
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import chat from '../netlify/functions/chat.mjs';
import health from '../netlify/functions/health.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../sitio');
const mime={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpeg':'image/jpeg','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.pdf':'application/pdf','.txt':'text/plain'};
const server=http.createServer(async(req,res)=>{
 try{
 const pathname=new URL(req.url,'http://localhost').pathname;
 if(['/api/health','/api/chat'].includes(pathname)){
  const body=req.method==='POST'?await new Promise((ok,fail)=>{let chunks='';req.on('data',b=>chunks+=b);req.on('end',()=>ok(chunks));req.on('error',fail)}):undefined;
  const request=new Request('http://127.0.0.1'+pathname,{method:req.method,headers:req.headers,body});
  const response=await (pathname==='/api/chat'?chat(request):health(request));res.writeHead(response.status,Object.fromEntries(response.headers));return res.end(Buffer.from(await response.arrayBuffer()));
 }
 const target=path.resolve(root,'.'+(pathname==='/'?'/index.html':decodeURIComponent(pathname)));
 if(!target.startsWith(root+path.sep))throw new Error('unsafe');
 const b=await fs.readFile(target);res.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream'});res.end(b);
 }catch{res.writeHead(404);res.end('Not found')}
});server.listen(8791,'127.0.0.1',()=>console.log('SIGRED V9 PREVIEW http://127.0.0.1:8791'));
