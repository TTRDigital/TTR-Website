/**
 * Inline, dependency-free scroll reveal. Runs at the end of <body>.
 *
 * - Content stays visible if this never runs: CSS only hides [data-reveal]
 *   once <html data-reveal-ready> is set here.
 * - Elements get a data-in attribute (not a class) so React re-renders
 *   never undo it.
 * - Marks are queued until React has hydrated (the "ttr:hydrated" event
 *   from <HydrationSignal/>), so server and client HTML match. A 4s
 *   failsafe reveals everything queued if hydration never completes.
 * - [data-anim] scopes get data-playing only while on screen, so looping
 *   decorative animations never run off screen.
 */
export const revealScript = `(function(){var d=document.documentElement;if(!("IntersectionObserver" in window))return;d.setAttribute("data-reveal-ready","");var ready=!!window.__ttrHydrated,queue=[];function mark(el){if(ready)el.setAttribute("data-in","");else queue.push(el)}function flush(){if(ready)return;ready=true;for(var i=0;i<queue.length;i++)queue[i].setAttribute("data-in","");queue=[];scan()}window.addEventListener("ttr:hydrated",flush,{once:true});setTimeout(flush,4000);var io=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++){var e=es[i];if(e.isIntersecting){mark(e.target);io.unobserve(e.target)}}},{rootMargin:"0px 0px -8% 0px",threshold:0.12});var play=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++){var e=es[i];if(e.isIntersecting)e.target.setAttribute("data-playing","");else e.target.removeAttribute("data-playing")}});var seen=new WeakSet();function scan(){var els=document.querySelectorAll("[data-reveal],[data-reveal-words]");for(var i=0;i<els.length;i++){var el=els[i];if(!seen.has(el)){seen.add(el);io.observe(el)}}if(!ready)return;var an=document.querySelectorAll("[data-anim]");for(var j=0;j<an.length;j++){var a=an[j];if(!seen.has(a)){seen.add(a);play.observe(a)}}}scan();new MutationObserver(scan).observe(document.body,{childList:true,subtree:true})})();`;
