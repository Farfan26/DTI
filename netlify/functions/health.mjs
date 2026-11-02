/** Verificación pública: estado, nunca devuelve la API Key. */
export default async function handler(req){
 if(req.method!=='GET')return Response.json({error:'method_not_allowed'},{status:405});
 const keyPresent=!!(process.env.GEMINI_API_KEY||'').trim();const enabled=process.env.ENABLE_PUBLIC_AI==='true';
 return Response.json({ok:true,aiConfigured:keyPresent&&enabled,keyPresent,publicAiEnabled:enabled,liveApiVerified:false,imageEnabled:false,model:process.env.GEMINI_MODEL||'gemini-3.5-flash-lite',documentPages:80,knowledgeVersion:10,mode:'local_fallback'},{headers:{'Cache-Control':'no-store'}});
}
export const config={path:'/api/health'};
