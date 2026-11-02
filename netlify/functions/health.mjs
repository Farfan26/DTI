/** Verificación pública: estado, nunca devuelve la API Key. */
export default async function handler(req){
 if(req.method!=='GET')return Response.json({error:'method_not_allowed'},{status:405});
 return Response.json({ok:true,aiConfigured:!!process.env.GEMINI_API_KEY&&process.env.ENABLE_PUBLIC_AI==='true',imageEnabled:false,model:process.env.GEMINI_MODEL||'gemini-3.5-flash-lite',documentPages:105,knowledgeVersion:8,mode:'local_fallback'},{headers:{'Cache-Control':'no-store'}});
}
export const config={path:'/api/health'};
