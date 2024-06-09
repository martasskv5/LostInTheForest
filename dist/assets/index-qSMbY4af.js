(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const g="0.4.0";let _=!1,S,Y,z,N,Z,ee,te,ne,re;function xe(t,e={auto:!1}){if(_)throw new Error(`you must \`import 'groq-sdk/shims/${t.kind}'\` before importing anything else from groq-sdk`);if(S)throw new Error(`can't \`import 'groq-sdk/shims/${t.kind}'\` after \`import 'groq-sdk/shims/${S}'\``);_=e.auto,S=t.kind,Y=t.fetch,t.Request,t.Response,t.Headers,z=t.FormData,t.Blob,N=t.File,Z=t.ReadableStream,ee=t.getMultipartRequestOptions,te=t.getDefaultAgent,ne=t.fileFromPath,re=t.isFsReadStream}class Se{constructor(e){this.body=e}get[Symbol.toStringTag](){return"MultipartBody"}}function Ee({manuallyImported:t}={}){const e=t?"You may need to use polyfills":"Add one of these imports before your first `import … from 'groq-sdk'`:\n- `import 'groq-sdk/shims/node'` (if you're running on Node)\n- `import 'groq-sdk/shims/web'` (otherwise)\n";let n,s,r,o;try{n=fetch,s=Request,r=Response,o=Headers}catch(i){throw new Error(`this environment is missing the following Web Fetch API type: ${i.message}. ${e}`)}return{kind:"web",fetch:n,Request:s,Response:r,Headers:o,FormData:typeof FormData<"u"?FormData:class{constructor(){throw new Error(`file uploads aren't supported in this environment yet as 'FormData' is undefined. ${e}`)}},Blob:typeof Blob<"u"?Blob:class{constructor(){throw new Error(`file uploads aren't supported in this environment yet as 'Blob' is undefined. ${e}`)}},File:typeof File<"u"?File:class{constructor(){throw new Error(`file uploads aren't supported in this environment yet as 'File' is undefined. ${e}`)}},ReadableStream:typeof ReadableStream<"u"?ReadableStream:class{constructor(){throw new Error(`streaming isn't supported in this environment yet as 'ReadableStream' is undefined. ${e}`)}},getMultipartRequestOptions:async(i,a)=>({...a,body:new Se(i)}),getDefaultAgent:i=>{},fileFromPath:()=>{throw new Error("The `fileFromPath` function is only supported in Node. See the README for more details: https://www.github.com/groq/groq-typescript#file-uploads")},isFsReadStream:i=>!1}}S||xe(Ee(),{auto:!0});class h extends Error{}class d extends h{constructor(e,n,s,r){super(`${d.makeMessage(e,n,s)}`),this.status=e,this.headers=r,this.error=n}static makeMessage(e,n,s){const r=n!=null&&n.message?typeof n.message=="string"?n.message:JSON.stringify(n.message):n?JSON.stringify(n):s;return e&&r?`${e} ${r}`:e?`${e} status code (no body)`:r||"(no status code or body)"}static generate(e,n,s,r){if(!e)return new B({cause:j(n)});const o=n;return e===400?new oe(e,o,s,r):e===401?new ie(e,o,s,r):e===403?new ae(e,o,s,r):e===404?new ue(e,o,s,r):e===409?new ce(e,o,s,r):e===422?new le(e,o,s,r):e===429?new fe(e,o,s,r):e>=500?new de(e,o,s,r):new d(e,o,s,r)}}class M extends d{constructor({message:e}={}){super(void 0,void 0,e||"Request was aborted.",void 0),this.status=void 0}}class B extends d{constructor({message:e,cause:n}){super(void 0,void 0,e||"Connection error.",void 0),this.status=void 0,n&&(this.cause=n)}}class se extends B{constructor({message:e}={}){super({message:e??"Request timed out."})}}class oe extends d{constructor(){super(...arguments),this.status=400}}class ie extends d{constructor(){super(...arguments),this.status=401}}class ae extends d{constructor(){super(...arguments),this.status=403}}class ue extends d{constructor(){super(...arguments),this.status=404}}class ce extends d{constructor(){super(...arguments),this.status=409}}class le extends d{constructor(){super(...arguments),this.status=422}}class fe extends d{constructor(){super(...arguments),this.status=429}}class de extends d{}class w{constructor(e,n){this.iterator=e,this.controller=n}static fromSSEResponse(e,n){let s=!1;const r=new Ae;async function*o(){if(!e.body)throw n.abort(),new h("Attempted to iterate over a response with no body");const a=new y,u=H(e.body);for await(const l of u)for(const f of a.decode(l)){const p=r.decode(f);p&&(yield p)}for(const l of a.flush()){const f=r.decode(l);f&&(yield f)}}async function*i(){if(s)throw new Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");s=!0;let a=!1;try{for await(const u of o())if(!a){if(u.data.startsWith("[DONE]")){a=!0;continue}if(u.event===null){let l;try{l=JSON.parse(u.data)}catch(f){throw console.error("Could not parse message into JSON:",u.data),console.error("From chunk:",u.raw),f}if(l&&l.error)throw new d(void 0,l.error,void 0,void 0);yield l}}a=!0}catch(u){if(u instanceof Error&&u.name==="AbortError")return;throw u}finally{a||n.abort()}}return new w(i,n)}static fromReadableStream(e,n){let s=!1;async function*r(){const i=new y,a=H(e);for await(const u of a)for(const l of i.decode(u))yield l;for(const u of i.flush())yield u}async function*o(){if(s)throw new Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");s=!0;let i=!1;try{for await(const a of r())i||a&&(yield JSON.parse(a));i=!0}catch(a){if(a instanceof Error&&a.name==="AbortError")return;throw a}finally{i||n.abort()}}return new w(o,n)}[Symbol.asyncIterator](){return this.iterator()}tee(){const e=[],n=[],s=this.iterator(),r=o=>({next:()=>{if(o.length===0){const i=s.next();e.push(i),n.push(i)}return o.shift()}});return[new w(()=>r(e),this.controller),new w(()=>r(n),this.controller)]}toReadableStream(){const e=this;let n;const s=new TextEncoder;return new Z({async start(){n=e[Symbol.asyncIterator]()},async pull(r){try{const{value:o,done:i}=await n.next();if(i)return r.close();const a=s.encode(JSON.stringify(o)+`
`);r.enqueue(a)}catch(o){r.error(o)}},async cancel(){var r;await((r=n.return)==null?void 0:r.call(n))}})}}class Ae{constructor(){this.event=null,this.data=[],this.chunks=[]}decode(e){if(e.endsWith("\r")&&(e=e.substring(0,e.length-1)),!e){if(!this.event&&!this.data.length)return null;const o={event:this.event,data:this.data.join(`
`),raw:this.chunks};return this.event=null,this.data=[],this.chunks=[],o}if(this.chunks.push(e),e.startsWith(":"))return null;let[n,s,r]=Pe(e,":");return r.startsWith(" ")&&(r=r.substring(1)),n==="event"?this.event=r:n==="data"&&this.data.push(r),null}}class y{constructor(){this.buffer=[],this.trailingCR=!1}decode(e){let n=this.decodeText(e);if(this.trailingCR&&(n="\r"+n,this.trailingCR=!1),n.endsWith("\r")&&(this.trailingCR=!0,n=n.slice(0,-1)),!n)return[];const s=y.NEWLINE_CHARS.has(n[n.length-1]||"");let r=n.split(y.NEWLINE_REGEXP);return r.length===1&&!s?(this.buffer.push(r[0]),[]):(this.buffer.length>0&&(r=[this.buffer.join("")+r[0],...r.slice(1)],this.buffer=[]),s||(this.buffer=[r.pop()||""]),r)}decodeText(e){if(e==null)return"";if(typeof e=="string")return e;if(typeof Buffer<"u"){if(e instanceof Buffer)return e.toString();if(e instanceof Uint8Array)return Buffer.from(e).toString();throw new h(`Unexpected: received non-Uint8Array (${e.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`)}if(typeof TextDecoder<"u"){if(e instanceof Uint8Array||e instanceof ArrayBuffer)return this.textDecoder??(this.textDecoder=new TextDecoder("utf8")),this.textDecoder.decode(e);throw new h(`Unexpected: received non-Uint8Array/ArrayBuffer (${e.constructor.name}) in a web platform. Please report this error.`)}throw new h("Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error.")}flush(){if(!this.buffer.length&&!this.trailingCR)return[];const e=[this.buffer.join("")];return this.buffer=[],this.trailingCR=!1,e}}y.NEWLINE_CHARS=new Set([`
`,"\r","\v","\f","","","","","\u2028","\u2029"]);y.NEWLINE_REGEXP=/\r\n|[\n\r\x0b\x0c\x1c\x1d\x1e\x85\u2028\u2029]/g;function Pe(t,e){const n=t.indexOf(e);return n!==-1?[t.substring(0,n),e,t.substring(n+e.length)]:[t,"",""]}function H(t){if(t[Symbol.asyncIterator])return t;const e=t.getReader();return{async next(){try{const n=await e.read();return n!=null&&n.done&&e.releaseLock(),n}catch(n){throw e.releaseLock(),n}},async return(){const n=e.cancel();return e.releaseLock(),await n,{done:!0,value:void 0}},[Symbol.asyncIterator](){return this}}}const he=t=>t!=null&&typeof t=="object"&&typeof t.url=="string"&&typeof t.blob=="function",pe=t=>t!=null&&typeof t=="object"&&typeof t.name=="string"&&typeof t.lastModified=="number"&&me(t),me=t=>t!=null&&typeof t=="object"&&typeof t.size=="number"&&typeof t.type=="string"&&typeof t.text=="function"&&typeof t.slice=="function"&&typeof t.arrayBuffer=="function",ke=t=>pe(t)||he(t)||re(t);async function ye(t,e,n){var r;if(t=await t,n??(n=pe(t)?{lastModified:t.lastModified,type:t.type}:{}),he(t)){const o=await t.blob();return e||(e=new URL(t.url).pathname.split(/[\\/]/).pop()??"unknown_file"),new N([o],e,n)}const s=await Ie(t);if(e||(e=Ce(t)??"unknown_file"),!n.type){const o=(r=s[0])==null?void 0:r.type;typeof o=="string"&&(n={...n,type:o})}return new N(s,e,n)}async function Ie(t){var n;let e=[];if(typeof t=="string"||ArrayBuffer.isView(t)||t instanceof ArrayBuffer)e.push(t);else if(me(t))e.push(await t.arrayBuffer());else if(Oe(t))for await(const s of t)e.push(s);else throw new Error(`Unexpected data type: ${typeof t}; constructor: ${(n=t==null?void 0:t.constructor)==null?void 0:n.name}; props: ${qe(t)}`);return e}function qe(t){return`[${Object.getOwnPropertyNames(t).map(n=>`"${n}"`).join(", ")}]`}function Ce(t){var e;return T(t.name)||T(t.filename)||((e=T(t.path))==null?void 0:e.split(/[\\/]/).pop())}const T=t=>{if(typeof t=="string")return t;if(typeof Buffer<"u"&&t instanceof Buffer)return String(t)},Oe=t=>t!=null&&typeof t=="object"&&typeof t[Symbol.asyncIterator]=="function",W=t=>t&&typeof t=="object"&&t.body&&t[Symbol.toStringTag]==="MultipartBody",ge=async t=>{const e=await $e(t.body);return ee(e,t)},$e=async t=>{const e=new z;return await Promise.all(Object.entries(t||{}).map(([n,s])=>v(e,n,s))),e},v=async(t,e,n)=>{if(n!==void 0){if(n==null)throw new TypeError(`Received null for "${e}"; to pass null in FormData, you must use the string 'null'`);if(typeof n=="string"||typeof n=="number"||typeof n=="boolean")t.append(e,String(n));else if(ke(n)){const s=await ye(n);t.append(e,s)}else if(Array.isArray(n))await Promise.all(n.map(s=>v(t,e+"[]",s)));else if(typeof n=="object")await Promise.all(Object.entries(n).map(([s,r])=>v(t,`${e}[${s}]`,r)));else throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${n} instead`)}};var b={};async function we(t){const{response:e}=t;if(t.options.stream)return R("response",e.status,e.url,e.headers,e.body),t.options.__streamClass?t.options.__streamClass.fromSSEResponse(e,t.controller):w.fromSSEResponse(e,t.controller);if(e.status===204)return null;if(t.options.__binaryResponse)return e;const n=e.headers.get("content-type");if((n==null?void 0:n.includes("application/json"))||(n==null?void 0:n.includes("application/vnd.api+json"))){const o=await e.json();return R("response",e.status,e.url,e.headers,o),o}const r=await e.text();return R("response",e.status,e.url,e.headers,r),r}class D extends Promise{constructor(e,n=we){super(s=>{s(null)}),this.responsePromise=e,this.parseResponse=n}_thenUnwrap(e){return new D(this.responsePromise,async n=>e(await this.parseResponse(n)))}asResponse(){return this.responsePromise.then(e=>e.response)}async withResponse(){const[e,n]=await Promise.all([this.parse(),this.asResponse()]);return{data:e,response:n}}parse(){return this.parsedPromise||(this.parsedPromise=this.responsePromise.then(this.parseResponse)),this.parsedPromise}then(e,n){return this.parse().then(e,n)}catch(e){return this.parse().catch(e)}finally(e){return this.parse().finally(e)}}class Be{constructor({baseURL:e,maxRetries:n=2,timeout:s=6e4,httpAgent:r,fetch:o}){this.baseURL=e,this.maxRetries=F("maxRetries",n),this.timeout=F("timeout",s),this.httpAgent=r,this.fetch=o??Y}authHeaders(e){return{}}defaultHeaders(e){return{Accept:"application/json","Content-Type":"application/json","User-Agent":this.getUserAgent(),...Fe(),...this.authHeaders(e)}}validateHeaders(e,n){}defaultIdempotencyKey(){return`stainless-node-retry-${He()}`}get(e,n){return this.methodRequest("get",e,n)}post(e,n){return this.methodRequest("post",e,n)}patch(e,n){return this.methodRequest("patch",e,n)}put(e,n){return this.methodRequest("put",e,n)}delete(e,n){return this.methodRequest("delete",e,n)}methodRequest(e,n,s){return this.request(Promise.resolve(s).then(r=>({method:e,path:n,...r})))}getAPIList(e,n,s){return this.requestAPIList(n,{method:"get",path:e,...s})}calculateContentLength(e){if(typeof e=="string"){if(typeof Buffer<"u")return Buffer.byteLength(e,"utf8").toString();if(typeof TextEncoder<"u")return new TextEncoder().encode(e).length.toString()}return null}buildRequest(e){var x;const{method:n,path:s,query:r,headers:o={}}=e,i=W(e.body)?e.body.body:e.body?JSON.stringify(e.body,null,2):null,a=this.calculateContentLength(i),u=this.buildURL(s,r);"timeout"in e&&F("timeout",e.timeout);const l=e.timeout??this.timeout,f=e.httpAgent??this.httpAgent??te(u),p=l+1e3;typeof((x=f==null?void 0:f.options)==null?void 0:x.timeout)=="number"&&p>(f.options.timeout??0)&&(f.options.timeout=p),this.idempotencyHeader&&n!=="get"&&(e.idempotencyKey||(e.idempotencyKey=this.defaultIdempotencyKey()),o[this.idempotencyHeader]=e.idempotencyKey);const E=this.buildHeaders({options:e,headers:o,contentLength:a});return{req:{method:n,...i&&{body:i},headers:E,...f&&{agent:f},signal:e.signal??null},url:u,timeout:l}}buildHeaders({options:e,headers:n,contentLength:s}){const r={};s&&(r["content-length"]=s);const o=this.defaultHeaders(e);return Q(r,o),Q(r,n),W(e.body)&&S!=="node"&&delete r["content-type"],this.validateHeaders(r,n),r}async prepareOptions(e){}async prepareRequest(e,{url:n,options:s}){}parseHeaders(e){return e?Symbol.iterator in e?Object.fromEntries(Array.from(e).map(n=>[...n])):{...e}:{}}makeStatusError(e,n,s,r){return d.generate(e,n,s,r)}request(e,n=null){return new D(this.makeRequest(e,n))}async makeRequest(e,n){var f,p;const s=await e;n==null&&(n=s.maxRetries??this.maxRetries),await this.prepareOptions(s);const{req:r,url:o,timeout:i}=this.buildRequest(s);if(await this.prepareRequest(r,{url:o,options:s}),R("request",o,s,r.headers),(f=s.signal)!=null&&f.aborted)throw new M;const a=new AbortController,u=await this.fetchWithTimeout(o,r,i,a).catch(j);if(u instanceof Error){if((p=s.signal)!=null&&p.aborted)throw new M;if(n)return this.retryRequest(s,n);throw u.name==="AbortError"?new se:new B({cause:u})}const l=Le(u.headers);if(!u.ok){if(n&&this.shouldRetry(u)){const U=`retrying, ${n} attempts remaining`;return R(`response (error; ${U})`,u.status,o,l),this.retryRequest(s,n,l)}const E=await u.text().catch(U=>j(U).message),L=Ne(E),x=L?void 0:E;throw R(`response (error; ${n?"(error; no more retries left)":"(error; not retryable)"})`,u.status,o,l,x),this.makeStatusError(u.status,L,x,l)}return{response:u,options:s,controller:a}}requestAPIList(e,n){const s=this.makeRequest(n,null);return new De(this,s,e)}buildURL(e,n){const s=ve(e)?new URL(e):new URL(this.baseURL+(this.baseURL.endsWith("/")&&e.startsWith("/")?e.slice(1):e)),r=this.defaultQuery();return Xe(r)||(n={...r,...n}),typeof n=="object"&&n&&!Array.isArray(n)&&(s.search=this.stringifyQuery(n)),s.toString()}stringifyQuery(e){return Object.entries(e).filter(([n,s])=>typeof s<"u").map(([n,s])=>{if(typeof s=="string"||typeof s=="number"||typeof s=="boolean")return`${encodeURIComponent(n)}=${encodeURIComponent(s)}`;if(s===null)return`${encodeURIComponent(n)}=`;throw new h(`Cannot stringify type ${typeof s}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`)}).join("&")}async fetchWithTimeout(e,n,s,r){const{signal:o,...i}=n||{};o&&o.addEventListener("abort",()=>r.abort());const a=setTimeout(()=>r.abort(),s);return this.getRequestClient().fetch.call(void 0,e,{signal:r.signal,...i}).finally(()=>{clearTimeout(a)})}getRequestClient(){return{fetch:this.fetch}}shouldRetry(e){const n=e.headers.get("x-should-retry");return n==="true"?!0:n==="false"?!1:e.status===408||e.status===409||e.status===429||e.status>=500}async retryRequest(e,n,s){let r;const o=s==null?void 0:s["retry-after-ms"];if(o){const a=parseFloat(o);Number.isNaN(a)||(r=a)}const i=s==null?void 0:s["retry-after"];if(i&&!r){const a=parseFloat(i);Number.isNaN(a)?r=Date.parse(i)-Date.now():r=a*1e3}if(!(r&&0<=r&&r<60*1e3)){const a=e.maxRetries??this.maxRetries;r=this.calculateDefaultRetryTimeoutMillis(n,a)}return await je(r),this.makeRequest(e,n-1)}calculateDefaultRetryTimeoutMillis(e,n){const o=n-e,i=Math.min(.5*Math.pow(2,o),8),a=1-Math.random()*.25;return i*a*1e3}getUserAgent(){return`${this.constructor.name}/JS ${g}`}}class De extends D{constructor(e,n,s){super(n,async r=>new s(e,r.response,await we(r),r.options))}async*[Symbol.asyncIterator](){const e=await this;for await(const n of e)yield n}}const Le=t=>new Proxy(Object.fromEntries(t.entries()),{get(e,n){const s=n.toString();return e[s.toLowerCase()]||e[s]}}),Ue=()=>{var e;if(typeof Deno<"u"&&Deno.build!=null)return{"X-Stainless-Lang":"js","X-Stainless-Package-Version":g,"X-Stainless-OS":G(Deno.build.os),"X-Stainless-Arch":V(Deno.build.arch),"X-Stainless-Runtime":"deno","X-Stainless-Runtime-Version":typeof Deno.version=="string"?Deno.version:((e=Deno.version)==null?void 0:e.deno)??"unknown"};if(typeof EdgeRuntime<"u")return{"X-Stainless-Lang":"js","X-Stainless-Package-Version":g,"X-Stainless-OS":"Unknown","X-Stainless-Arch":`other:${EdgeRuntime}`,"X-Stainless-Runtime":"edge","X-Stainless-Runtime-Version":process.version};if(Object.prototype.toString.call(typeof process<"u"?process:0)==="[object process]")return{"X-Stainless-Lang":"js","X-Stainless-Package-Version":g,"X-Stainless-OS":G(process.platform),"X-Stainless-Arch":V(process.arch),"X-Stainless-Runtime":"node","X-Stainless-Runtime-Version":process.version};const t=Te();return t?{"X-Stainless-Lang":"js","X-Stainless-Package-Version":g,"X-Stainless-OS":"Unknown","X-Stainless-Arch":"unknown","X-Stainless-Runtime":`browser:${t.browser}`,"X-Stainless-Runtime-Version":t.version}:{"X-Stainless-Lang":"js","X-Stainless-Package-Version":g,"X-Stainless-OS":"Unknown","X-Stainless-Arch":"unknown","X-Stainless-Runtime":"unknown","X-Stainless-Runtime-Version":"unknown"}};function Te(){if(typeof navigator>"u"||!navigator)return null;const t=[{key:"edge",pattern:/Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"ie",pattern:/MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"ie",pattern:/Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"chrome",pattern:/Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"firefox",pattern:/Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"safari",pattern:/(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/}];for(const{key:e,pattern:n}of t){const s=n.exec(navigator.userAgent);if(s){const r=s[1]||0,o=s[2]||0,i=s[3]||0;return{browser:e,version:`${r}.${o}.${i}`}}}return null}const V=t=>t==="x32"?"x32":t==="x86_64"||t==="x64"?"x64":t==="arm"?"arm":t==="aarch64"||t==="arm64"?"arm64":t?`other:${t}`:"unknown",G=t=>(t=t.toLowerCase(),t.includes("ios")?"iOS":t==="android"?"Android":t==="darwin"?"MacOS":t==="win32"?"Windows":t==="freebsd"?"FreeBSD":t==="openbsd"?"OpenBSD":t==="linux"?"Linux":t?`Other:${t}`:"Unknown");let K;const Fe=()=>K??(K=Ue()),Ne=t=>{try{return JSON.parse(t)}catch{return}},Me=new RegExp("^(?:[a-z]+:)?//","i"),ve=t=>Me.test(t),je=t=>new Promise(e=>setTimeout(e,t)),F=(t,e)=>{if(typeof e!="number"||!Number.isInteger(e))throw new h(`${t} must be an integer`);if(e<0)throw new h(`${t} must be a positive integer`);return e},j=t=>t instanceof Error?t:new Error(t),J=t=>{var e,n,s,r;if(typeof process<"u")return((e=b==null?void 0:b[t])==null?void 0:e.trim())??void 0;if(typeof Deno<"u")return(r=(s=(n=Deno.env)==null?void 0:n.get)==null?void 0:s.call(n,t))==null?void 0:r.trim()};function Xe(t){if(!t)return!0;for(const e in t)return!1;return!0}function _e(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Q(t,e){for(const n in e){if(!_e(e,n))continue;const s=n.toLowerCase();if(!s)continue;const r=e[n];r===null?delete t[s]:r!==void 0&&(t[s]=r)}}function R(t,...e){typeof process<"u"&&(b==null?void 0:b.DEBUG)==="true"&&console.log(`Groq:DEBUG:${t}`,...e)}const He=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t=>{const e=Math.random()*16|0;return(t==="x"?e:e&3|8).toString(16)}),We=()=>typeof window<"u"&&typeof window.document<"u"&&typeof navigator<"u";class m{constructor(e){this._client=e}}class A extends m{create(e,n){return this._client.post("/openai/v1/audio/transcriptions",ge({body:e,...n}))}}A||(A={});class P extends m{create(e,n){return this._client.post("/openai/v1/audio/translations",ge({body:e,...n}))}}P||(P={});class k extends m{constructor(){super(...arguments),this.transcriptions=new A(this._client),this.translations=new P(this._client)}}(function(t){t.Transcriptions=A,t.Translations=P})(k||(k={}));let I=class extends m{create(e,n){return this._client.post("/openai/v1/chat/completions",{body:e,...n,stream:e.stream??!1})}};I||(I={});class q extends m{constructor(){super(...arguments),this.completions=new I(this._client)}}(function(t){t.Completions=I})(q||(q={}));class C extends m{}C||(C={});class O extends m{create(e,n){return this._client.post("/openai/v1/embeddings",{body:e,...n})}}O||(O={});class $ extends m{retrieve(e,n){return this._client.get(`/openai/v1/models/${e}`,n)}list(e){return this._client.get("/openai/v1/models",e)}delete(e,n){return this._client.delete(`/openai/v1/models/${e}`,n)}}$||($={});var be;class c extends Be{constructor({baseURL:e=J("GROQ_BASE_URL"),apiKey:n=J("GROQ_API_KEY"),...s}={}){if(n===void 0)throw new h("The GROQ_API_KEY environment variable is missing or empty; either provide it, or instantiate the Groq client with an apiKey option, like new Groq({ apiKey: 'My API Key' }).");const r={apiKey:n,...s,baseURL:e||"https://api.groq.com"};if(!r.dangerouslyAllowBrowser&&We())throw new h(`It looks like you're running in a browser-like environment.

This is disabled by default, as it risks exposing your secret API credentials to attackers.
If you understand the risks and have appropriate mitigations in place,
you can set the \`dangerouslyAllowBrowser\` option to \`true\`, e.g.,

new Groq({ apiKey, dangerouslyAllowBrowser: true })`);super({baseURL:r.baseURL,timeout:r.timeout??6e4,httpAgent:r.httpAgent,maxRetries:r.maxRetries,fetch:r.fetch}),this.completions=new C(this),this.chat=new q(this),this.embeddings=new O(this),this.audio=new k(this),this.models=new $(this),this._options=r,this.apiKey=n}defaultQuery(){return this._options.defaultQuery}defaultHeaders(e){return{...super.defaultHeaders(e),...this._options.defaultHeaders}}authHeaders(e){return{Authorization:`Bearer ${this.apiKey}`}}}be=c;c.Groq=be;c.GroqError=h;c.APIError=d;c.APIConnectionError=B;c.APIConnectionTimeoutError=se;c.APIUserAbortError=M;c.NotFoundError=ue;c.ConflictError=ce;c.RateLimitError=fe;c.BadRequestError=oe;c.AuthenticationError=ie;c.InternalServerError=de;c.PermissionDeniedError=ae;c.UnprocessableEntityError=le;c.toFile=ye;c.fileFromPath=ne;(function(t){t.Completions=C,t.Chat=q,t.Embeddings=O,t.Audio=k,t.Models=$})(c||(c={}));console.log("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");const Ve=new c({apiKey:"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",dangerouslyAllowBrowser:!0});async function Ge(){var n,s;const e=await Re("You are going to play a game with user, where user is lost in forest and you controll enviroment, like weather, tempeture, time, animals. User control what he will do, that mean that you gave him options and conditions, and user must do a choise. To what ever that is off topic, you will respond: 'You can not do this. You are in forest!'. The main objective of game is to get out of the forest, but you can also add some small achievements through game.","system");X(((s=(n=e.choices[0])==null?void 0:n.message)==null?void 0:s.content)||"")}async function Ke(){var n,s;const t=document.getElementById("terminalTextInput").value.trim(),e=await Re(t,"user");Qe(),X("==================================================================================================================================================================================="),X(((s=(n=e.choices[0])==null?void 0:n.message)==null?void 0:s.content)||"")}async function Re(t,e){return Ve.chat.completions.create({messages:[{role:e,content:t}],model:"llama3-8b-8192"})}var X=function(t){document.getElementById("terminalReslutsCont").innerHTML+="<p>"+t+"</p>",Je()},Je=function(){var t=document.getElementById("terminalReslutsCont");t.scrollTop=t.scrollHeight},Qe=function(){document.getElementById("terminalTextInput").value=""};window.onload=function(){const t=document.querySelector(".mainCont"),e=t.querySelector("h2"),n=t.querySelector("h3");e.textContent="Lost in the Forest",n.textContent="",Ge()};document.getElementsByTagName("form")[0].onsubmit=function(t){t.preventDefault(),Ke(),window.scrollTo(0,150)};
