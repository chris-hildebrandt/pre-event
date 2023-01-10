import{t as b}from"./TicketsService.3ed44814.js";import{_ as E,o as C,c as d,e as v,P as r,T as S,a as l,b as t,t as w,F as u,r as p,d as x,A as i,l as m,f as s,g,p as A,h as I,i as _,u as T}from"./index.70f62ba1.js";const B={name:"Account",setup(){T();async function c(){try{await v.getEventsByAccountId(i.account.id)}catch(e){m.error("[getting event by account id]",e),r.error(e)}}async function o(){try{await b.getTickets()}catch(e){m.error("[getting event tickets]",e),r.error(e)}}return C(()=>{c(),o()}),{account:d(()=>i.account),events:d(()=>i.events),tickets:d(()=>i.tickets),async handleSubmit(){try{const e=await v.createEvent(editable.value);r.success("Event Created Successfully!"),router.push("/event/"+e.eventId)}catch(e){r.error(e)}}}},components:{TicketCard:S}},h=c=>(A("data-v-4a6b382f"),c=c(),I(),c),F={class:"container-fluid"},P={class:"about text-center"},M=["src"],D={class:"row"},N={class:"col-6 text-center"},V=h(()=>t("h3",null,"My Events",-1)),L={class:"row"},R={class:"col-6 text-center"},W=h(()=>t("h3",null,"My Tickets",-1)),j={class:"row"};function q(c,o,e,a,z,G){const k=_("EventCard"),y=_("TicketCard"),f=_("EventForm");return s(),l(u,null,[t("div",F,[t("div",P,[t("h1",null,"Welcome "+w(a.account.name),1),t("img",{class:"rounded",src:a.account.picture,alt:""},null,8,M)]),t("div",D,[t("div",N,[V,t("div",L,[t("button",{class:"btn btn-info",onClick:o[0]||(o[0]=()=>{}),"data-bs-toggle":"modal","data-bs-target":"#create-event"},"Create Event"),(s(!0),l(u,null,p(a.events,n=>(s(),g(k,{key:n.id,event:n},null,8,["event"]))),128))])]),t("div",R,[W,t("div",j,[(s(!0),l(u,null,p(a.tickets,n=>(s(),g(y,{key:n.id,ticket:n},null,8,["ticket"]))),128))])])])]),x(f)],64)}const K=E(B,[["render",q],["__scopeId","data-v-4a6b382f"]]);export{K as default};