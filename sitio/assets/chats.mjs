/** Persistencia de múltiples conversaciones. No requiere servidor ni cuenta externa.
 * El almacenamiento es por navegador/origen. No sincroniza entre dispositivos.
 */
export const STORE_KEY='sigred_chats_v5';
export const MAX_CHATS=30, MAX_MESSAGES=80;
export function freshChat(title='Nueva conversación'){
  const id=(typeof crypto!=='undefined'&&crypto.randomUUID)?crypto.randomUUID():`chat-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return {id,title,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),topic:null,messages:[]};
}
export function titleFromQuestion(message){
 const text=String(message||'').replace(/\s+/g,' ').trim();return text.length>46?text.slice(0,45).trimEnd()+'…':text||'Nueva conversación';
}
export function sanitizeMessage(m){
 if(!m||!['assistant','user'].includes(m.role)||typeof m.text!=='string')return null;
 return {role:m.role,text:m.text.slice(0,6000),time:typeof m.time==='string'?m.time:new Date().toISOString(),sources:Array.isArray(m.sources)?m.sources.filter(s=>typeof s==='string').slice(0,4):[],sourceLinks:Array.isArray(m.sourceLinks)?m.sourceLinks.filter(v=>v&&typeof v.name==='string'&&typeof v.path==='string').slice(0,7).map(v=>({name:v.name.slice(0,200),path:v.path.slice(0,500)})):[],mediaIds:Array.isArray(m.mediaIds)?m.mediaIds.filter(s=>typeof s==='string').slice(0,8):[],note:typeof m.note==='string'?m.note.slice(0,220):''};
}
export function sanitizeChats(chats){
 return (Array.isArray(chats)?chats:[]).filter(c=>c&&typeof c.id==='string').slice(0,MAX_CHATS).map(c=>({id:c.id.slice(0,90),title:String(c.title||'Nueva conversación').slice(0,90),createdAt:c.createdAt||new Date().toISOString(),updatedAt:c.updatedAt||new Date().toISOString(),topic:typeof c.topic==='string'?c.topic:null,messages:(Array.isArray(c.messages)?c.messages:[]).map(sanitizeMessage).filter(Boolean).slice(-MAX_MESSAGES)}));
}
export function readChats(storage=localStorage){
 try{
  const state=JSON.parse(storage.getItem(STORE_KEY)||'null');
  if(state?.version===5)return {chats:sanitizeChats(state.chats),activeId:state.activeId||null};
  // Migración no destructiva del historial V4: deja el dato viejo intacto.
  const old=JSON.parse(storage.getItem('sigred_conversation_v4')||'null');
  if(old?.version===4&&Array.isArray(old.entries)&&old.entries.length){const c=freshChat('Conversación anterior (V4)');c.messages=old.entries.map(sanitizeMessage).filter(Boolean).slice(-MAX_MESSAGES);return {chats:[c],activeId:c.id};}
 }catch{/* El sitio sigue disponible si el navegador bloquea almacenamiento. */}
 return {chats:[],activeId:null};
}
export function saveChats(state,storage=localStorage){
 try{const chats=sanitizeChats(state.chats).sort((a,b)=>String(b.updatedAt).localeCompare(String(a.updatedAt))).slice(0,MAX_CHATS);storage.setItem(STORE_KEY,JSON.stringify({version:5,chats,activeId:state.activeId}));return true;}catch{return false;}
}
export function getRecentMessages(chat,max=8){return chat.messages.filter(x=>['user','assistant'].includes(x.role)).slice(-max).map(x=>({role:x.role==='assistant'?'model':'user',text:x.text.slice(0,650)}));}
