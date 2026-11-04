/** SIGRED V20. Clasificación conservadora de evidencia; no afirma verificación externa. */
export const EVIDENCE = Object.freeze({
 D:'D · Documentado', C:'C · Cálculo reproducible', P:'P · Propuesta',
 S:'S · Simulación académica', ND:'ND · No disponible'
});
export const evidenceLabel = code => EVIDENCE[code] || EVIDENCE.ND;
export function classifyEvidence({answer='',reason='',sourceLinks=[],intent='',mode='local'}={}){
 const a=String(answer).toLowerCase();
 if(intent==='social')return 'ND'; // cortesía, no prueba documental
 if(intent==='offtopic'||reason==='outside_project'||reason==='not_documented'||reason==='pmo_domain_safe_fallback'||reason==='no_documentary_evidence')return 'ND';
 if(/no (existe|hay|se encuentra).{0,65}(evidencia|registrad|confirmad)|no est[aá] acreditad|sin referencia documental suficiente/i.test(answer)&&(!sourceLinks?.length))return 'ND';
 if(/simulaci[oó]n acad[eé]mica|escenario (hipot[eé]tico|ilustrativo|simulado)|supongamos que/i.test(answer))return 'S';
 if(/alternativas (recomendadas|propuestas)|propuesta (de|para)|se recomienda|recomendaci[oó]n pmo/i.test(answer)&&!sourceLinks?.length)return 'P';
 if(/\b(cpi|spi|eac|bac|pv|ev|ac)\b|c[aá]lculo reproducible/i.test(answer)&&sourceLinks?.length&&/\b(=|≈|formula|f[oó]rmula|calculad)/i.test(answer))return 'C';
 if(sourceLinks?.length)return 'D';
 return 'ND';
}
export function evidenceFooter(code){return `Clasificación de evidencia: ${evidenceLabel(code)}.`;}
